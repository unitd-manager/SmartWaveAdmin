import React, { useEffect, useState } from 'react';

import * as Icon from 'react-feather';
import { Button, Input,Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import api from '../../constants/api';

const Enquiry = () => {
  const [enquiry, setEnquiry] = useState([]);
  const [filteredEnquiry, setFilteredEnquiry] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState('');

  // Fetch Enquiries
  const getEnquiry = () => {
    setLoading(true);
    api
      .get('/enquiry/getEnquiry')
      .then((res) => {
        setEnquiry(res.data.data);
        setFilteredEnquiry(res.data.data);
        $('#example').DataTable({
          pagingType: 'full_numbers',
          pageLength: 20,
          processing: true,
          dom: 'Bfrtip',
          buttons: [
            {
              extend: 'print',
              text: 'Print',
              className: 'shadow-none btn btn-primary',
            },
          ],
        });
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
    if (filterType) {
      setFilteredEnquiry(enquiry.filter((item) => item.enquiry_type === filterType));
    } else {
      setFilteredEnquiry(enquiry);
    }
  }, [filterType, enquiry]);

  // Get Unique Enquiry Types
  const enquiryTypes = [...new Set(enquiry.map((item) => item.enquiry_type))];

  return (
    <div className="MainDiv">
      <div className="pt-xs-25">
        <BreadCrumbs />

        {/* Filter Dropdown */}
       {/* Filter Dropdown */}
<div className="mb-2 d-flex align-items-center">
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


        <CommonTable
          loading={loading}
          title="Enquiry List"
          Button={
            <Link to="/EnquiryDetails">
              <Button color="primary" className="shadow-none">
                Add New
              </Button>
            </Link>
          }
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Edit</th>
              <th>Enquiry Code</th>
              <th>Title</th>
              <th>Enquiry Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredEnquiry.map((element) => (
              <tr key={element.enquiry_id}>
                <td>{element.enquiry_id}</td>
                <td>
                  <Link to={`/EnquiryEdit/${element.enquiry_id}`}>
                    <Icon.Edit2 />
                  </Link>
                </td>
                <td>{element.enquiry_code}</td>
                <td>{element.title}</td>
                <td>{element.enquiry_type}</td>
              </tr>
            ))}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default Enquiry;
