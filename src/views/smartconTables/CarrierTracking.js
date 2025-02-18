import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';


const Staff = () => {
  // All state variables
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(false);

  //Api call for getting Staff Data
  const getStaff = () => {
    api
      .get('/tracking/getTrack')
      .then((res) => {
        setStaff(res.data.data);
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
    getStaff();
  }, []);

  const columns = [
    {
      name: '#',
      selector: '',
      grow: 0,
      wrap: true,
      width: '4%',
    },
 
    {
      name: 'Name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Tracking Number',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Shipment Date',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Actual Delivery Date',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Expected Delivery Date',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
    {
      name: 'Shipment',
      sortable: true,
      grow: 2,
      wrap: true,
    },
  
 
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
      <BreadCrumbs />
      <CommonTable
          loading={loading}
          title="Track List"
         
        >
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {staff &&
              staff.map((element, index) => {
                return (
                  <tr key={element.carrier_tracking_id}>
                    <td>{index + 1}</td>
                    <td>{element.carrier_name}</td>
                    <td>{element.tracking_number}</td>
                    <td>{element.shipment_date}</td>
                    <td>{element.actual_delivery_date}</td>
                    <td>{element.expected_delivery_date}</td>
                    <td>{element.shipment}</td>
               
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};
export default Staff;
