import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {  Form, Table } from 'reactstrap';
import ComponentCard from '../ComponentCard';

export default function QuotesLinkedTable({purchaseOrder}) {
    QuotesLinkedTable.propTypes = {
        purchaseOrder: PropTypes.array,
      }
// structure of makesupplier payment tables
      const supplierTableColumn = [
        {
          name: "Quote Date",
        },
        {
          name: "Quote Code",
          
        },
        {
          name: "Price",
          
        },
        {
          name: "Status",
         
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
              return (<tr key={element.product_quote_id}>
                <td >{moment(element.quote_date).format('YYYY-MM-DD')}</td>
        
              <td>{element.quote_code}</td>
              <td>{parseFloat(element.price)}</td>
              <td>{element.status}</td>
              
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