import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';
import {  Form, Table } from 'reactstrap';
import ComponentCard from '../ComponentCard';

export default function EnquiriesLinkedTable({purchaseOrder}) {
    EnquiriesLinkedTable.propTypes = {
        purchaseOrder: PropTypes.array,
      }
// structure of makesupplier payment tables
      const supplierTableColumn = [
        {
          name: "Enquiry Type",
        },
        {
          name: "Enquiry Code",
          
        },
        {
          name: "Enquiry Date",
          
        },
        {
          name: " Amount",
         
        }
        
      ]

  return (
    <ComponentCard title=' '>
    <Form>
      <div className="MainDiv">
        <div className="container">

        <Table id="example" className="display border border-secondary rounded">
        <thead title='Quotations Linked '>
            <tr >
                {supplierTableColumn.map(cell=>{
                  return (<td key={cell.name}>{cell.name}</td>)
                })}
            </tr>
        </thead>
        <tbody>
          {purchaseOrder && purchaseOrder.map(element=>{
              return (<tr key={element.product_enquiry_id}>
                <td >{moment(element.enquiry_type).format('YYYY-MM-DD')}</td>
                <td>{element.enquiry_code}</td>
              <td>{element.enquiry_date}</td>
              <td>{parseFloat(element.enquiry_amount)}</td>
           
              
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