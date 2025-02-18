import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link } from 'react-router-dom'
import {  Form, Table } from 'reactstrap';
import ComponentCard from '../ComponentCard';

export default function ProductLinkedTable({purchaseOrder}) {
    ProductLinkedTable.propTypes = {
        purchaseOrder: PropTypes.array,
      }
// structure of makesupplier payment tables
      const supplierTableColumn = [
        {
          name: "PO Date",
        },
        {
          name: "PRODUCT CODE",
          
        },
        {
          name: "PRODUCT NAME",
          
        },
        {
          name: "QTY",
         
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
              return (<tr key={element.supplier_id}>
                <td >{moment(element.po_date).format('YYYY-MM-DD')}</td>
              <td><Link to={`/PurchaseOrderEdit/${element.purchase_order_id}`} >{element.product_code}</Link></td>
              <td>{element.product_name}</td>
              <td>{parseFloat(element.qty) }</td>
             
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