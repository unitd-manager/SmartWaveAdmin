import React, { useEffect, useState } from 'react';
import { Button, Input, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import * as Icon from 'react-feather';

import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import api from '../../constants/api';

const Enquiry = () => {
  const [enquiry, setEnquiry] = useState([]);
  const [filteredEnquiry, setFilteredEnquiry] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch Enquiries
  const getEnquiry = () => {
    setLoading(true);
    api
      .get('/enquiry/getEnquiry')
      .then((res) => {
        setEnquiry(res.data.data);
        setFilteredEnquiry(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getEnquiry();
  }, []);

  // Filter Function
  useEffect(() => {
    let filteredData = enquiry;
    if (filterType) {
      filteredData = filteredData.filter((item) => item.enquiry_type === filterType);
    }
    if (searchTerm) {
      filteredData = filteredData.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    setFilteredEnquiry(filteredData);
  }, [filterType, searchTerm, enquiry]);

  // Get Unique Enquiry Types
  const enquiryTypes = [...new Set(enquiry.map((item) => item.enquiry_type))];

  // Table Columns
  const columns = [
    { 
      name: 'S.No', 
      selector: (row, index) => index + 1, 
      width: '5%', 
      sortable: false 
    },
    {
      name: 'Edit',
      cell: (row) => (
        <Link to={`/EnquiryEdit/${row.enquiry_id}?tab=1`}>
          <Icon.Edit2 />
        </Link>
      ),
      width: '5%', 
    },
    {
      name: 'Date',
      selector: (row) => (row.enquiry_date ? moment(row.enquiry_date).format('DD-MM-YYYY') : ''),
      width: '10%', 
      sortable: true,
    },
    { name: 'Code', selector: (row) => row.enquiry_code,width: '10%',  sortable: true },
    { name: 'Title', selector: (row) => row.title, sortable: true },
    {
      name: 'Name',
      selector: (row) =>
        `${row.first_name || ''} ${row.last_name || ''}`.trim() || '',
      width: '15%', 
      sortable: true,
    },
    { name: 'Email', selector: (row) => row.email,width: '18%',  sortable: true },
    { name: 'Type', selector: (row) => row.enquiry_type,width: '23%', sortable: true },
    { name: 'Mobile No', selector: (row) => row.phone,width: '18%',  sortable: true },
  ];

  return (
    <div className="MainDiv">
      <div className="pt-xs-25">
        <BreadCrumbs />

        {/* Filter and Search Bar in One Row */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          {/* Search Input (Left) */}
          <div className="d-flex align-items-center">
            <Label className="me-2">Search:</Label>
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control w-auto"
            />
          </div>

          {/* Filter Dropdown (Right) */}
          <div className="d-flex align-items-center">
            <Label className="me-2">Filter by Enquiry Type:</Label>
            <Input
              type="select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="form-select form-select-sm w-auto"
            >
              <option value="">Select All</option>
              {enquiryTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Input>
          </div>
        </div>

        {/* DataTable */}
        <DataTable
          title="Enquiry List"
          columns={columns}
          data={filteredEnquiry}
          progressPending={loading}
          pagination
          highlightOnHover
          responsive
          persistTableHead
          subHeader
          subHeaderComponent={
            <Link to="/EnquiryDetails">
              <Button color="primary" className="shadow-none">
                Add New
              </Button>
            </Link>
          }
        />
      </div>
    </div>
  );
};

export default Enquiry;
