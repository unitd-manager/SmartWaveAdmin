import React from 'react'
import PropTypes from 'prop-types'
import {  Form, Table } from 'reactstrap';
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
                 <td>{moment(element.creation_date).format('DD-MM-YYYY')}</td>

                <td >{element.enquiry_code}</td>
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