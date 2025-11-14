import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import moment from 'moment';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import message from '../../components/Message';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

const Customer = () => {
  const [customer, setCustomer] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const getCustomer = () => {
    api
      .get('/contact/getContact')
      .then((res) => {
        setCustomer(res.data.data);
        setFilteredData(res.data.data); // Initialize filteredData with full data
      })
      .catch(() => {
        message('Cannot get Content Data', 'error');
      });
  };

  useEffect(() => {
    getCustomer();
  }, []);

  // Handle search filter
  useEffect(() => {
    const filtered = customer.filter((row) =>
      Object.values(row).some((value) =>
        value?.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [searchText, customer]);

  const columns = [
    { 
      name: 'S.No', 
      selector: (row, index) => index + 1, 
      sortable: false 
    },
    { name: 'Edit', cell: row => <Link to={`/CustomerEdit/${row.contact_id}`}><Icon.Edit2 /></Link> },
    { name: 'Name', selector: row => row.first_name, sortable: true },
    { name: 'Email', selector: row => row.email, sortable: true },
    { name: 'Mobile', selector: row => row.mobile, sortable: true },
    { 
      name: 'Date Of Creation', 
      selector: row => row?.creation_date ? moment(row?.creation_date).format('DD-MM-YYYY') : '', 
      sortable: true 
    }
  ];

  return (
    <div className="MainDiv pt-xs-25">
      <BreadCrumbs />
      <div className="d-flex justify-content-between mb-3">
       
        <Input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: '250px' }}
        />
         <Link to="/CustomerDetails">
          <Button color="primary" className="shadow-none">Add New</Button>
        </Link>
      </div>
      <DataTable 
        title="Customer List"
        columns={columns}
        data={filteredData}
          pagination
          highlightOnHover
          defaultSortFieldId={1}
      />
    </div>
  );
};

export default Customer;
