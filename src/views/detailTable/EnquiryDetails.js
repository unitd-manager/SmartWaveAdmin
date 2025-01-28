import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';

const EnquiryDetails = () => {
  //All state variables
  const [enquiryForms, setEnquiryForms] = useState({
    first_name: '',
  });
  //Navigation and Parameters
  const navigate = useNavigate();
  //Setting data in enquiryForms
  const handleInputsenquiryForms = (e) => {
    setEnquiryForms({ ...enquiryForms, [e.target.name]: e.target.value });
  };
  //Insert Setting
  const insertEnquiry = () => {
    api
      .post('/enquiry/insertEnquiry', enquiryForms)
      .then((res) => {
        const insertedDataId = res.data.data.insertId;
        console.log(insertedDataId);
        message('enquiry inserted successfully.', 'success');
        setTimeout(() => {
          navigate(`/EnquiryEdit/${insertedDataId}`);
        }, 300);
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
  };
  useEffect(() => {}, []);
  return (
    <div>
      <BreadCrumbs />
      <ToastContainer />
      <Row>
        <Col md="6" xs="12">
          {/* Key Details */}
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>
                      {' '}
                      Name <span className="required"> *</span>{' '}
                    </Label>
                    <Input type="text" name="first_name" onChange={handleInputsenquiryForms} />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      color="primary"
                      onClick={() => {
                        insertEnquiry();
                        setTimeout(() => {
                          navigate('/EnquiryEdit');
                        }, 800);
                      }}
                      type="button"
                      className="btn mr-2 shadow-none"
                    >
                      Save & Continue
                    </Button>
                    <Button
                      onClick={() => {
                        navigate('/Blog');
                      }}
                      type="button"
                      className="btn btn-dark shadow-none"
                    >
                      Go to List
                    </Button>
                  </div>
                </Row>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};

export default EnquiryDetails;
