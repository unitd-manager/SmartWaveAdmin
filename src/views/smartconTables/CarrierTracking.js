import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

const Staff = () => {
  // State variables
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filteredStaff, setFilteredStaff] = useState([]);

  // API call to fetch staff data
  const getStaff = () => {
    api
      .get('/tracking/getTrack')
      .then((res) => {
        setStaff(res.data.data);
        setFilteredStaff(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getStaff();
  }, []);

  // Search filter
  useEffect(() => {
  
    const result = staff.filter((item) =>
      Object.values(item).some((value) =>
        value && value.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
    setFilteredStaff(result);
  }, [search, staff]);

  // Table columns
  const columns = [
    {
      name: '#',
      selector: (_, index) => index + 1,
      width: '4%',
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row.carrier_name,
      sortable: true,
    },
    {
      name: 'Container No',
      selector: (row) => row.container_no,
      sortable: true,
    },
    {
      name: 'Bill of Loading',
      selector: (row) => row.bill_of_loading,
      sortable: true,
    },
    {
      name: 'Order Number',
      selector: (row) => row.order_no,
      sortable: true,
    },
    {
      name: 'Estimated Time of Arrival',
      selector: (row) => row.actual_delivery_date,
      sortable: true,
    },
    {
      name: 'Estimated Time of Departure',
      selector: (row) => row.expected_delivery_date,
      sortable: true,
    },
      ];

  return (
    <div className="MainDiv">
      <div className="pt-xs-25">
        <BreadCrumbs />
        <input
          type="text"
          placeholder="Search..."
          className="form-control mb-3"
          style={{ maxWidth: '250px' }}

          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <DataTable
          title="Carrier Tracking List"
          columns={columns}
          data={filteredStaff}
          progressPending={loading}
          pagination
          defaultSortFieldId={2}
          defaultSortAsc={false}
          highlightOnHover
          responsive
        />
      </div>
    </div>
  );
};

export default Staff;
