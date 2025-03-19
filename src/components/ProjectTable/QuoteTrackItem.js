import React, { useState, useContext} from 'react';
import {
  Card,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment'
import api from '../../constants/api';
import message from '../Message';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const QuoteLineItem = ({ addTrackItemModal, setAddTrackItemModal, quoteTrack }) => {
  QuoteLineItem.propTypes = {
    addTrackItemModal: PropTypes.bool,
    setAddTrackItemModal: PropTypes.func,
    quoteTrack: PropTypes.any,
  };

  const { loggedInuser } = useContext(AppContext);

  const [formData, setFormData] = useState({
    carrier_name: '',
    tracking_number: '',
    shipment_date: '',
    actual_delivery_date: '',
    expected_delivery_date: '',
    enquiry_id: '',
    shipper_name: '',
    shipper_address: '',
    recipient_name: '',
    recipient_address: '',
    package_weight: '',
    package_height: '',
    package_length: '',
    package_width: '',
    shipment_status: '',
    tracking_link: '',
    bill_of_loading:'',
    container_no:'',
    order_no:''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const obj = {
      ...formData,
      creation_date: creationdatetime,
      created_by: loggedInuser.first_name,
      enquiry_id: quoteTrack,
    };

    if (obj.carrier_name) {
      api
        .post('/tracking/insertQuoteItems', obj)
        .then(() => {
          message('Line Item Added Successfully', 'success');
          setTimeout(() => {
            window.location.reload();
          }, 300);
        })
        .catch(() => {
          message('Cannot Add Line Items', 'error');
        });
    } else {
      message('All fields are required.', 'info');
    }
  };

  // const [company, setCompany] = useState();
  //     const getCompany = () => {
  //       api.get('/company/getContact').then((res) => {
  //         setCompany(res.data.data);
  //       });
  //     };


  //       useEffect(() => {
        
  //         getCompany();
        
  //       }, []);

  
  // const handleCompanyChange = (e) => {
  //   const selectedCompanyId = e.target.value;
  
  //   // Update lineItemData with the selected company ID
  //   handleInputChange(e); // Update company_id in settingdetails

  //   // Find selected company details
  //   const selectedCompany = company.find((comp) => String(comp.contact_id) === selectedCompanyId);
  
  //   if (selectedCompany) {
  //     // Update shipper address
  //     setFormData((prevDetails) => ({
  //       ...prevDetails,
  //       shipper_address: selectedCompany.address1 || '',
  //     }));
  //   }
  // };

  return (
    <Modal size="lg" isOpen={addTrackItemModal}>
      <ModalHeader>
        Add Carrier Tracking
        <Button className="shadow-none" color="secondary" onClick={() => setAddTrackItemModal(false)}>
          X
        </Button>
      </ModalHeader>
      <ModalBody>
        <Form>
          <Card body>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>Carrier Name</Label>
                  <Input
                    type="text"
                    name="carrier_name"
                    value={formData.carrier_name}
                    onChange={handleInputChange}
                    // placeholder="Enter Carrier Name"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Container Number</Label>
                  <Input
                    type="text"
                    name="container_no"
                    value={formData.container_no}
                    onChange={handleInputChange}
                    // placeholder="Enter Tracking Number"
                  />
                </FormGroup>
              </Col>
              {/* <Col md="4">

  <FormGroup>
      <Label>Shipper Name</Label>
      <Input
        type="text"
        name="shipper_name"
        value={formData.shipper_name}
        onChange={handleInputChange}
      />
    </FormGroup>
  </Col>
 
            </Row>
            <Row>
<Col md="4">

<FormGroup>
    <Label>Shipper Address</Label>
    <Input
      type="textarea"
      name="shipper_address"
      value={formData.shipper_address}
      onChange={handleInputChange}
      rows="4"
    />
  </FormGroup>
</Col>
 <Col md="4">

  <FormGroup>
      <Label>Recipient Name</Label>
      <Input
        type="text"
        name="recipient_name"
        value={formData.recipient_name}
        onChange={handleInputChange}
      />
    </FormGroup>
  </Col>
  <Col md="4">

  <FormGroup>
      <Label>Recipient Address</Label>
      <Input
        type="textarea"
        name="recipient_address"
        value={formData.recipient_address}
        onChange={handleInputChange}
        rows="4"
      />
    </FormGroup>
  </Col> */}

            

            
              <Col md="4">
                <FormGroup>
                  <Label>Bill of Loading</Label>
                  <Input
                    type="text"
                    name="bill_of_loading"
                    value={formData.bill_of_loading}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col md="4">
                <FormGroup>
                  <Label>Order Number</Label>
                  <Input
                    type="text"
                    name="order_no"
                    value={formData.order_no}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Estimated Time of Arrival</Label>
                  <Input
                    type="date"
                    name="actual_delivery_date"
                    value={
                      formData &&
                      moment(formData.actual_delivery_date).format('YYYY-MM-DD')
                    }
                    min={moment().format('YYYY-MM-DD')}
                  
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Estimated Time of Departure</Label>
                  <Input
                    type="date"
                    name="expected_delivery_date"
                    value={
                      formData &&
                      moment(formData.expected_delivery_date).format('YYYY-MM-DD')
                    }
                    min={moment().format('YYYY-MM-DD')}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            {/* <Row>
            <Col md="4"> */}
            
              {/* <FormGroup>
                  <Label>Package Weight</Label>
                  <Input
                    type="text"
                    name="package_weight"
                    value={formData.package_weight}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
            
              <FormGroup>
                  <Label>Package Height</Label>
                  <Input
                    type="text"
                    name="package_height"
                    value={formData.package_height}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
            
              <FormGroup>
                  <Label>Package Length</Label>
                  <Input
                    type="text"
                    name="package_length"
                    value={formData.package_length}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
            
              <FormGroup>
                  <Label>Package Width</Label>
                  <Input
                    type="text"
                    name="package_width"
                    value={formData.package_width}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col md="4"> */}
              
              {/* <Col md="4">
            
            <FormGroup>
                <Label>Status</Label>
                <Input
                  type="text"
                  name="shipment_status"
                  value={formData.shipment_status}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            
            <Col md="4">
            
            <FormGroup>
                <Label>Tracking Link</Label>
                <Input
                  type="text"
                  name="tracking_link"
                  value={formData.tracking_link}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            </Row> */}
          </Card>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button className="shadow-none" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Button className="shadow-none" color="secondary" onClick={() => setAddTrackItemModal(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default QuoteLineItem;
