import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,

  Button,
} from 'reactstrap';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types';
import moment from 'moment';
import EditQuoteModal from './EditQuoteModal';


export default function TenderQuotation({
  tenderId,
  quote,
  lineItem,

  setEditQuoteModal,
  // viewLineToggle,
  editQuoteModal,
  //id,
  // setViewLineModal,
  handleQuoteForms,
  generateCode,
  getLine,
  getQuote,
}) {
  TenderQuotation.propTypes = {
    tenderId: PropTypes.object,
    lineItem: PropTypes.object,
    getLine: PropTypes.object,
    // viewLineToggle: PropTypes.object,
    setEditQuoteModal: PropTypes.object,
    editQuoteModal: PropTypes.object,

    quote: PropTypes.object,
    // id: PropTypes.any,
    // setViewLineModal: PropTypes.any,
    handleQuoteForms: PropTypes.object,
    generateCode: PropTypes.object,
    getQuote: PropTypes.any,
  
  };

  const [quoteDatas, setQuoteData] = useState([]);

  //const [selectedQuoteFormat, setSelectedQuoteFormat] = useState('format1')
  const [selectedFormat, setSelectedFormat] = useState('format1');

  console.log('quoteDatas', quoteDatas);
  console.log('quote', quote);




 
  useEffect(() => {}, [tenderId]);

 
  // const handleEditRate = () => {
  //   // Handle the refresh of the View Line Item Modal
  //   getRateItem(quote.quote_id);

  // };

  // const handlePDFFormatChange = (event) => {
  //   setSelectedQuoteFormat(event.target.value); // Update the selected format
  // };

  //const [selectedFormat, setSelectedFormat] = useState('format1');


  return (
    <div>
      <Row>
        {/* {Object.keys(quote).length === 0 && ( */}
          <Col md="2" className="mb-4 d-flex justify-content-between">
            <Button
              color="primary"
              className="shadow-none"
              onClick={(ele) => {
                if (window.confirm('Do you Like to Add Quote ?')) {
                  handleQuoteForms(ele);
                  generateCode(ele);
                                  // Set the default format to 'format1' when the button is clicked
                setSelectedFormat('format1');
                }
              }}
            >
              Add Quote
            </Button>
          </Col>
        {/* )} */}
    
      
      </Row>

         {Object.keys(quote).length !== 0 && (

        <Form>
          <Row>
            
            <Col>
              <FormGroup>
                <Label>Quote Code</Label>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Quote Date</Label>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Quote Status</Label>
              </FormGroup>
            </Col>
         
            <Col>
              <FormGroup>
                <Label>Amount</Label>{' '}
              </FormGroup>
            </Col>
           
            <Col>
              <FormGroup>
                <Label>Action</Label>{' '}
              </FormGroup>
            </Col>
          </Row>
          <Row>
           
            <Col>
              <FormGroup>
                <Label>
                  <u>{quote && quote.quote_code}</u>
                </Label>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>
                {quote?.quote_date ? moment(quote.quote_date, 'YYYY-MM-DD').format('DD/MM/YY') : 'N/A'}
                </Label>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>{quote && quote.status}</Label>
              </FormGroup>
            </Col>
          
            <Col>
              <FormGroup>
                <Label>{quote && quote.price}</Label>
              </FormGroup>
            </Col>


            <Col>
              <FormGroup>
                <Row>
                    <Col md="4">
                      <Label>
                        <span
                          className="addline pointer"
                          onClick={() => {
                            setEditQuoteModal(true);
                            setQuoteData(lineItem.enq_quote_id);
                          }}
                        >
                          <Icon.Edit />
                        </span>
                      </Label>
                    </Col>
              
             
            
                </Row>
              </FormGroup>
            </Col>

        
          </Row>
        </Form>
        )} 

      {editQuoteModal && (
        <EditQuoteModal
          lineItem={lineItem}
          getLine={getLine}
          editQuoteModal={editQuoteModal}
          setEditQuoteModal={setEditQuoteModal}
          quoteDatas={quote}
          getQuoteFun={getQuote}
          //setSelectedQuoteFormat={setSelectedQuoteFormat}
          //handlePDFFormatChange={handlePDFFormatChange}
          selectedFormat={selectedFormat}
          setSelectedFormat={setSelectedFormat}
          quote={quote}
        ></EditQuoteModal>
      )}
     
    </div>
  );
}
