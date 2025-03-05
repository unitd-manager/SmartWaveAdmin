import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import {  Form, Table } from 'reactstrap';
import api from '../../constants/api';
import message from '../Message';
import ComponentCard from '../ComponentCard';

export default function EnquiriesLinkedTable({id}) {
    EnquiriesLinkedTable.propTypes = {
        id: PropTypes.func,
      }
  const [contentDetails, setContentDetails] = useState([]);


  const getContentById = () => {
    api
      .post('/contact/getEnquiryById', { contact_id: id })
      .then((res) => {
        const { data } = res; // Destructure `data` from `res`
        const { data: enquiryData } = data; // Destructure `data` from `res.data`
  
        if (Array.isArray(enquiryData)) {
          setContentDetails(enquiryData); // If it's already an array, use it
        } else {
          setContentDetails([]); // Fallback to an empty array
        }
      })
      .catch(() => {
        message('Content Data Not Found', 'info');
        setContentDetails([]); // Ensure it remains an array
      });
  };
  

       useEffect(() => {
          getContentById();
        }, [id]);
// structure of makesupplier payment tables
      const supplierTableColumn = [
        {
          name: "Title",
        },
        {
          name: "Enquiry Type",
        },
        {
          name: "Enquiry Code",
          
        },
        {
          name: "Order Code",
          
        },
      
        
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
  {Array.isArray(contentDetails) && contentDetails.map(element => (
    <tr key={element.product_enquiry_id}>
      <td>{element.title}</td>
      <td>{element.enquiry_type}</td>
      <td>{element.enquiry_code}</td>
      <td>{element.order_code}</td>
    </tr>
  ))}
</tbody>

    </Table> 
        </div>
      </div>
    </Form>
  </ComponentCard>
)
}