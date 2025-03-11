import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from 'reactstrap';
import * as Icon from 'react-feather';
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

const Test = () => {
  // State variables
  const [supplier, setSupplier] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  // Fetch supplier data
  const getSupplier = () => {
    setLoading(true);
    api
      .get('/supplier/getProductOwner')
      .then((res) => {
        setSupplier(res.data.data);
        setFilteredData(res.data.data); // Initialize filtered data
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    getSupplier();
  }, []);

  // Search Filter
  useEffect(() => {
    const result = supplier.filter((item) =>
      Object.values(item).some((value) =>
        value && value.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
    setFilteredData(result);
  }, [search, supplier]);
  

  // Table columns
  const columns = [
    {
      name: '#',
      selector: (_, index) => index + 1,
      sortable: true,
      width: '5%',
    },
    {
      name: 'Edit',
      cell: (row) => (
        <Link to={`/ProductOwnerEdit/${row.product_owner_id}?tab=1`}>
          <Icon.Edit2 />
        </Link>
      ),
      width: '10%',
      button: true,
    },
    {
      name: 'Name',
      selector: (row) => row.company_name,
      sortable: true,
    },
    {
      name: 'Website',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Telephone',
      selector: (row) => row.mobile,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: 'Contact Person',
      selector: (row) => row.contact_person,
      sortable: true,
    },
  ];

  return (
    <div className="MainDiv">
      <div className="pt-xs-25">
        <BreadCrumbs />
        <div className="d-flex justify-content-between mb-3">
          <Input
            type="text"
            placeholder="Search by Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: '250px' }}
          />
          <Link to="/ProductOwnerDetails">
            <Button color="primary" className="shadow-none">
              Add New
            </Button>
          </Link>
        </div>

        <DataTable
          title="Product Owner List"
          columns={columns}
          data={filteredData}
          progressPending={loading}
          pagination
          highlightOnHover
          defaultSortFieldId={1}
        />
      </div>
    </div>
  );
};

export default Test;
