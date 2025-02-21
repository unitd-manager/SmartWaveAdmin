import React, { useState, useContext } from 'react';
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
   address_flat: '',
   address_street: '',
    address_town: '',
    address_state: '',
    address_country: '',
    address_po_code: '',
    shipper_name: '',
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
      contact_id: quoteTrack,
    };

    if (obj.address_flat) {
      api
        .post('/address/insertQuoteItems', obj)
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



  return (
    <Modal size="lg" isOpen={addTrackItemModal}>
      <ModalHeader>
        Add Address
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
                  <Label>Name</Label>
                  <Input
                    type="text"
                    name="shipper_name"
                    value={formData.shipper_name}
                    onChange={handleInputChange}
                  
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Address 1</Label>
                  <Input
                    type="text"
                    name="address_flat"
                    value={formData.address_flat}
                    onChange={handleInputChange}
                  
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Address 2</Label>
                  <Input
                    type="text"
                    name="address_street"
                    value={formData.address_street}
                    onChange={handleInputChange}
                  
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Town</Label>
                  <Input
                    type="text"
                    name="address_town"
                    value={formData.address_town}
                    onChange={handleInputChange}
                  
                  />
                </FormGroup>
              </Col>
              <Col md="4">
              <FormGroup>
                  <Label>State</Label>
                  <Input
                    type="text"
                    name="address_state"
                    value={formData.address_state}
                    onChange={handleInputChange}
                  
                  />
                </FormGroup>
              
              </Col>
              <Col md="4">
              <FormGroup>
                  <Label>Country</Label>
                  <Input
                    type="text"
                    name="address_country"
                    value={formData.address_country}
                    onChange={handleInputChange}
                  
                  />
                </FormGroup>
              
              </Col>
              <Col md="4">
              <FormGroup>
                  <Label>Po Code</Label>
                  <Input
                    type="text"
                    name="address_po_code"
                    value={formData.address_po_code}
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
