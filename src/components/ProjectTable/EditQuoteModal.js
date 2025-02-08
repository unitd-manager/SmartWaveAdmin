import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Form,
} from 'reactstrap';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import moment from 'moment';
import api from '../../constants/api';
import message from '../Message';

const EditQuoteModal = ({
  editQuoteModal,
  setEditQuoteModal,
  quoteDatas,
  lineItem,
  getQuoteFun,
  //setSelectedQuoteFormat,
  //handlePDFFormatChange,
  //QuoteProject,
}) => {
  EditQuoteModal.propTypes = {
    editQuoteModal: PropTypes.bool,
    setEditQuoteModal: PropTypes.func,
    quoteDatas: PropTypes.object,
    lineItem: PropTypes.object,
    getQuoteFun: PropTypes.any,
    //setSelectedQuoteFormat: PropTypes.any,
    //handlePDFFormatChange:PropTypes.func,
    //QuoteProject:PropTypes.func,
  };

  const { id } = useParams();
  console.log('win', lineItem);
  //   Get Quote Edited Value

  const [quoteData, setQuoteData] = useState(quoteDatas);
 
  const handleData = (e) => {
    setQuoteData({ ...quoteData, [e.target.name]: e.target.value });
    //setSelectedFormat(e.target.value);
  };

  const getQuote = () => {
    api.post('/enquiry/getQuoteById', { enquiry_id: id }).then((res) => {
      setQuoteData(res.data.data[0]);
    });
  };

 
 
  const GetEditQuote = () => {
    api
      .post('/enquiry/edit-TabQuote', quoteData)
      .then(() => {
        message('Quote Edited Successfully.', 'success');
        getQuoteFun();
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
      })
      .catch(() => {
        message('Unable to edit quote. please fill all fields', 'error');
      });
  };

 
  
  useEffect(() => {
    setQuoteData(quoteDatas);
    getQuote();
  }, [quoteDatas]);

  return (
    <>
      {/*  Edit Quote Modal */}
      <Modal size="lg" isOpen={editQuoteModal}>
        <ModalHeader>
          Edit Quote
          <Button
            color="secondary"
            onClick={() => {
              setEditQuoteModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>
        <ModalBody>
          <Form>
         
            <FormGroup>
            {/* {selectedFormat !== 'format2' && (
                   <> */}
              <Row>                
                <Col md="4">
                  <FormGroup>
                    <Label>Quote Date</Label>
                    <Input
                      type="date"
                      name="quote_date"
                      value={quoteData ? moment(quoteData.quote_date).format('YYYY-MM-DD') : ''}
                      onChange={handleData}
                    />
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Label> Quote Status</Label>
                    <Input
                      value={quoteData && quoteData.status}
                      type="select"
                      onChange={handleData}
                      name="status"
                    >
                      <option selected="selected" value="New">
                       In Progress
                      </option>
                      <option value="In Progress">In Progress</option>
                      <option value="Hold">Hold</option>
                      <option value="Win">Win</option>
                      <option value="Cancelled">Cancelled</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Label>Amount</Label>
                    <Input
                      type="text"
                      name="price"
                      defaultValue={(quoteData && quoteData.price) || 0}
                      onChange={handleData}
                    />
                  </FormGroup>
                </Col>
              </Row>
             
            
           
             
            
           
              <Row>
                <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                  <Button
                    type="button"
                    color="primary"
                    className="btn shadow-none mr-2"
                    onClick={() => {
                      GetEditQuote();
                      // setQuoteData();
                      //setSelectedQuoteFormat(selectedFormat);
                      setEditQuoteModal(false);

                      //insertquoteLogLine();
                    }}
                  >
                    Save & Continue
                  </Button>
                  <Button
                    color="secondary"
                    className="shadow-none"
                    onClick={() => {
                      setEditQuoteModal(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </Row>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
      {/* END Edit Quote Modal */}
    </>
  );
};

export default EditQuoteModal;
