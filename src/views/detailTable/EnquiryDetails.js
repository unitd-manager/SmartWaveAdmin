import React, { useState, useEffect,useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const OpportunityDetails = () => {
  const [company, setCompany] = useState();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { id } = useParams();
  const { loggedInuser } = useContext(AppContext);
  const navigate = useNavigate();
 
  //Api call for getting company dropdown
  const getCompany = () => {
    api.get('/company/getContact').then((res) => {
      setCompany(res.data.data);
    });
  };




  //Logic for adding tender in db
  const [tenderForms, setTenderForms] = useState({
    title: '',
    company_name: '',
   
  });

  const handleInputsTenderForms = (e) => {

    console.log("handleInputsTenderForms",{ ...tenderForms, [e.target.name]: e.target.value })

    setTenderForms({ ...tenderForms, [e.target.name]: e.target.value });
  };

  // //Api for getting all countries
  // const getAllCountries = () => {
  //   api
  //     .get('/clients/getCountry')
  //     .then((res) => {
  //       setallCountries(res.data.data);
  //     })
  //     .catch(() => {
  //       message('Country Data Not Found', 'info');
  //     });
  // };
  //const[tenderDetails,setTenderDetails]=useState();
 

  // // Get contact 
  // const getContact = (companyId) => {
  //   // setSelectedCompany(companyId);
  //   api.post('/company/getContactByCompanyId', { contact_id: companyId }).then((res) => {
  //     setContact(res.data.data[0]?.contact_id);
  //   });
  // };

  const insertTender = (code) => {
    if (tenderForms.contact_id !== '' && tenderForms.title !== '') {
      tenderForms.enquiry_code = code;
      tenderForms.creation_date = creationdatetime
      tenderForms.created_by = loggedInuser.first_name;
      api
        .post('/enquiry/insertEnquiry', tenderForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;

          message('Enquiry inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/EnquiryEdit/${insertedDataId}?tab=1`);
          }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      setFormSubmitted(true);
      message('Please fill all required fields', 'warning');
    }
  };

  //QUTO GENERATED CODE
  const generateCode = () => {
    api
      .post('/commonApi/getCodeValues', { type: 'enquiry' })
      .then((res) => {
        insertTender(res.data.data);
      })
      .catch(() => {
        insertTender('');
      });
  };

  useEffect(() => {
    getCompany();
    // getAllCountries();
  }, [id]);

  return (
    <div>
      <BreadCrumbs />
      <Row>
        <ToastContainer></ToastContainer>
        <Col md="6" xs="12">
          <ComponentCard title="New Opportunity">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="9">
                    <Label>
                      {' '}
                      Title <span className="required"> *</span>{' '}
                    </Label>
                    <Input
                      type="text"
                      name="title"
                      className={`form-control ${formSubmitted && tenderForms && tenderForms.title.trim() === '' ? 'highlight' : ''
                        }`}
                      value={tenderForms && tenderForms.title}
                      onChange={handleInputsTenderForms}
                    />
                    {formSubmitted && tenderForms && tenderForms.title.trim() === '' && (
                      <div className="error-message">Please enter the title</div>
                    )}
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="9">
                    <Label>
                      Company Name <span className="required"> *</span>{' '}
                    </Label>
                    <Input
                      type="select"
                      name="contact_id"
                      className={`form-control ${formSubmitted && tenderForms && (tenderForms.contact_id === undefined || tenderForms.contact_id.trim() === '')
                          ? 'highlight'
                          : ''
                        }`}
                      //value={tenderForms && tenderForms.contact_id}
                      // onChange={handleInputsTenderForms}
                      onChange={(e) => {
                        handleInputsTenderForms(e)
                      }}

                    >
                      <option value=''>Please Select</option>
                      {company &&
                        company.map((ele) => {
                          return (
                            <option key={ele.contact_id} value={ele.contact_id}>
                              {ele.first_name}
                            </option>
                          );
                        })}
                    </Input>
                    {formSubmitted && tenderForms && (tenderForms.contact_id === undefined || tenderForms.contact_id.trim() === '') && (
                      <div className="error-message">Please select the company name</div>
                    )}
                  </Col>
                 
                </Row>
              </FormGroup>
             
              
              <Row>
                <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                  <Button
                    type="button"
                    color="primary"
                    className="btn mr-2 shadow-none"
                    onClick={() => {
                      generateCode();
                    }}
                  >
                    Save & Continue
                  </Button>
                  <Button
                    className="shadow-none"
                    color="dark"
                    onClick={() => {
                      if (
                        window.confirm(
                          'Are you sure you want to cancel  \n  \n You will lose any changes made',
                        )
                      ) {
                        navigate(-1);
                      }
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </Row>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};

export default OpportunityDetails;
