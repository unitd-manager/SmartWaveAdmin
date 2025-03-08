import React from 'react'
import PropTypes from 'prop-types'
import {  Form, Table } from 'reactstrap';
import ComponentCard from '../ComponentCard';

export default function ProductLinkedTable({purchaseOrder}) {
    ProductLinkedTable.propTypes = {
        purchaseOrder: PropTypes.array,
      }
// structure of makesupplier payment tables
      const supplierTableColumn = [
        {
          name: "CATEGORY",
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
                <td >{element.category_title}</td>
              <td>{element.product_code}</td>
              <td>{element.title}</td>
              <td>{element.qty_in_stock }</td>
             
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