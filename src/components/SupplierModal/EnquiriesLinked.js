import React from 'react'
import PropTypes from 'prop-types'
import {  Form, Table } from 'reactstrap';
// link navigation uses anchor tags to open in a new tab

import moment from 'moment';
import ComponentCard from '../ComponentCard';

export default function ProductLinkedTable({purchaseOrder}) {
    ProductLinkedTable.propTypes = {
        purchaseOrder: PropTypes.array,
      }
// structure of makesupplier payment tables
      const supplierTableColumn = [
        {
          name: "Date",
        },
        {
          name: "Enquiry Code",
        },
        {
          name: "Order Code",
          
        },
        {
          name: "Title",
          
        },
        {
          name: "Type",
         
        }
        
      ]

  return (
    <ComponentCard title=''>
    <Form>
      <div className="MainDiv">
        <div className="container">

        <Table id="example" className="display border border-secondary rounded">
        <thead title='Purchase Order Linked '>
            <tr >
                {supplierTableColumn.map(cell=>{
                  return (<td key={cell.name}>{cell.name}</td>)
                })}
            </tr>
        </thead>
        <tbody>
          {purchaseOrder && purchaseOrder.map(element=>{
              return (<tr key={element.enquiry_id}>
             <td>
                {moment(element.enquiry_date, true).isValid() 
                    ? moment(element.enquiry_date).format('DD-MM-YYYY') 
                    : ""}
            </td>

                 <td>
                  <a
                    href={`/EnquiryEdit/${element.enquiry_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary"
                  >
                    {element.enquiry_code}
                  </a>
              </td>
              <td>{element.order_code}</td>
              <td>{element.title}</td>
              <td>{element.enquiry_type }</td>
             
              </tr>)
          })}
        </tbody>
    </Table> 
        </div>
      </div>
    </Form>
  </ComponentCard>
)
}