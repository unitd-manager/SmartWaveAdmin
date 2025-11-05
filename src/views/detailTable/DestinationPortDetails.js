import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';
import creationdatetime from '../../constants/creationdatetime';

const DestinationPortDetails = () => {
  // All state variables
  const [valuelistname, setValueListName] = useState();
  const [valuelistdetails, setValueListDetails] = useState({ key_text: '', value: '' });

  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

  //All Functions/Methods

  //Setting Data in ValueList Details
  const handleInputs = (e) => {
    setValueListDetails({ ...valuelistdetails, [e.target.name]: e.target.value });
  };

  //Api call for getting Valuelist dropdown
  const getValueListName = () => {
    api
      .get('/destinationPort/getAllCountries')
      .then((res) => {
        setValueListName(res.data.data);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  //Api call for Insert Valuelist Details
  const insertValueListData = () => {
    if (valuelistdetails.country !== '' && valuelistdetails.destination_port !== '') {
      valuelistdetails.creation_date = creationdatetime;
      api
        .post('/destinationPort/insertDestinationPort', valuelistdetails)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('DestinationPort inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/DestinationPortEdit/${insertedDataId}`);
          }, 300);
        })
        .catch(() => {
          message('Unable to insert record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  useEffect(() => {
    getValueListName();
  }, [id]);

  return (
    <div>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Row>
        <Col md="6" xs="12">
          {/* Key Details */}
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>
                     Country <span className="required"> *</span>
                    </Label>
                   <Select
                                     name="country"
                                     options={valuelistname?.map((ele) => ({
                                       value: ele.name,
                                       label: ele.name,
                                     }))}
                                     value={valuelistdetails && valuelistdetails.country ? { value: valuelistdetails.country, label: valuelistdetails.country } : null}
                                     onChange={(selectedOption) => {
                                       handleInputs({
                                         target: {
                                           name: 'country',
                                           value: selectedOption ? selectedOption.value : '',
                                         },
                                       });
                                     }}
                                   />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>
                      Destination Port<span className="required"> *</span>
                    </Label>
                    <Input
                      type="text"
                      onChange={handleInputs}
                      value={valuelistdetails && valuelistdetails.destination_port}
                      name="destination_port"
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      color="primary"
                      type="button"
                      className="btn mr-2 shadow-none"
                      onClick={() => {
                        insertValueListData();
                      }}
                    >
                      Save & Continue
                    </Button>
                    <Button
                      type="submit"
                      className="btn btn-dark shadow-none"
                      onClick={(e) => {
                        if (window.confirm('Are you sure you want to cancel? ')) {
                          navigate('/DestinationPort');
                        } else {
                          e.preventDefault();
                        }
                      }}
                    >
                      Cancel
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

export default DestinationPortDetails;
