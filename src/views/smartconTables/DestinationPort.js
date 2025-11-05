import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
//import message from '../../components/Message';
import Publish from '../../components/Publish';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const DestinationPort = () => {
  // All state variables
  const [valuelist, setDestinationPort] = useState();
  // const [selectedItem, setSelectedSortingItem] = useState();
  const [loading, setLoading] = useState(false);

  //Api call for getting Valuelist Data
  const getValuelist = () => {
    api
      .get('/destinationPort/getDestinationPort')
      .then((res) => {
        setDestinationPort(res.data.data);
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

  // API call for Update Sort Order
  // const changeSortingOrder = (e) => {
  //   /* eslint-disable-next-line */
  //   selectedItem.sort_order = parseInt(e.target.value);
  //   /* eslint-disable-line */
  //   api
  //     .post('/valuelist/updateSortOrder', selectedItem)
  //     .then(() => {
  //       getValuelist();
  //     })
  //     .catch(() => {
  //       message('Cannot get Update Data', 'error');
  //     });
  // };

  useEffect(() => {
    // setTimeout(() => {
    //   $('#example').DataTable({
    //     pagingType: 'full_numbers',
    //     pageLength: 20,
    //     processing: true,
    //     dom: 'Bfrtip',
    //     buttons: [
    //       {
    //         extend: 'print',
    //         text: 'Print',
    //         className: 'shadow-none btn btn-primary',
    //       },
    //     ],
    //   });
    // }, 1000);
    getValuelist();
  }, []);

  //Structure of ValueList List view
  const columns = [
    {
      name: '#',
      selector: '',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
  
    {
      name: 'Destination Port Name',
      selector: 'key_text',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Country',
      selector: 'Country',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'ID',
      selector: 'destination_port_id',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
   
    {
      name: 'Published',
      selector: 'published',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
  ];

  return (
    <div className="MainDiv">
      <div className="pt-xs-25">
        <BreadCrumbs />

        <CommonTable
          loading={loading}
          title="Destination Port"
          Button={
            <Link to="/DestinationPortDetails">
              <Button color="primary" className=" shadow-none">
                Add New
              </Button>
            </Link>
          }
        >
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {valuelist &&
              valuelist.map((element, index) => {
                return (
                  <tr key={element.destination_port_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/DestinationPortEdit/${element.destination_port_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.destination_port}</td>
                    <td>{element.country}</td>
                    <td>{element.destination_port_id}</td>
                    
                    <td>
                      <Publish
                        idColumn="destination_port_id "
                        tablename="destination_port"
                        idValue={element?.destination_port_id?.toString()}
                        value={element.published}
                      ></Publish>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};
export default DestinationPort;
