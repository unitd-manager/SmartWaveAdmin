import React, { useState, useContext,useEffect } from 'react';
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
    shipment_id: '',
    shipper_address: '',
    recipient_name: '',
    recipient_address: '',
    package_weight: '',
    package_height: '',
    package_length: '',
    package_width: '',
    shipment_status: '',
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

    if (obj.carrier_name && obj.tracking_number && obj.shipment_date) {
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

  const [company, setCompany] = useState();
      const getCompany = () => {
        api.get('/company/getContact').then((res) => {
          setCompany(res.data.data);
        });
      };


        useEffect(() => {
        
          getCompany();
        
        }, []);

  
  const handleCompanyChange = (e) => {
    const selectedCompanyId = e.target.value;
  
    // Update lineItemData with the selected company ID
    handleInputChange(e); // Update company_id in settingdetails

    // Find selected company details
    const selectedCompany = company.find((comp) => String(comp.contact_id) === selectedCompanyId);
  
    if (selectedCompany) {
      // Update shipper address
      setFormData((prevDetails) => ({
        ...prevDetails,
        shipper_address: selectedCompany.address1 || '',
      }));
    }
  };

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
                    placeholder="Enter Carrier Name"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Tracking Number</Label>
                  <Input
                    type="text"
                    name="tracking_number"
                    value={formData.tracking_number}
                    onChange={handleInputChange}
                    placeholder="Enter Tracking Number"
                  />
                </FormGroup>
              </Col>
               <Col md="4">
                  <FormGroup>
                    <Label>Shipment</Label>
                
              
                    <Input
                type="select"
                name="shipment_id"
                onChange={handleCompanyChange}
                value={formData?.shipment_id ? String(formData.shipment_id) : ''} // Ensure it's updating correctly

              >
                <option value="">Please Select</option>
                {company?.map((ele) => (
                    <option key={ele.contact_id} value={String(ele.contact_id)}>
                      {ele.first_name} {/* Make sure this is the correct property */}
                    </option>
                  ))}
              </Input>
              
                  </FormGroup>
                </Col>
            </Row>
            <Row>
<Col md="4">

<FormGroup>
    <Label>Shipper Address</Label>
    <Input
      type="text"
      name="shipper_address"
      value={formData.shipper_address}
      onChange={handleInputChange}
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
        type="text"
        name="recipient_address"
        value={formData.recipient_address}
        onChange={handleInputChange}
      />
    </FormGroup>
  </Col>

            </Row>

            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>Shipment Date</Label>
                  <Input
                    type="date"
                    name="shipment_date"
                    value={formData.shipment_date}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Actual Delivery Date</Label>
                  <Input
                    type="date"
                    name="actual_delivery_date"
                    value={formData.actual_delivery_date}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Expected Delivery Date</Label>
                  <Input
                    type="date"
                    name="expected_delivery_date"
                    value={formData.expected_delivery_date}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
            <Col md="4">
            
              <FormGroup>
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
              <Col md="4">
            
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
            
            </Row>
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
