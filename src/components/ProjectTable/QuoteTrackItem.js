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
import api from '../../constants/api';
import message from '../Message';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const QuoteLineItem = ({ addTrackItemModal, setAddTrackItemModal, quoteTrack, orderCode }) => {
    QuoteLineItem.propTypes = {
        addTrackItemModal: PropTypes.bool,
        setAddTrackItemModal: PropTypes.func,
        quoteTrack: PropTypes.any,
        orderCode: PropTypes.any,
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
        order_no: orderCode || '', // Use the prop to pre-fill the field
        carrier_code: '', // Add carrier_code to the form data
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
   


    const insertTrackingItem = (code) => {
        const obj = {
            ...formData,
            creation_date: creationdatetime,
            created_by: loggedInuser.first_name,
            enquiry_id: quoteTrack,
            carrier_code: code,
          };

        if (obj.carrier_name) {
            api
                .post('/tracking/insertQuoteItems', obj)
                .then(() => {
                    message('Carrier Tracking Added Successfully', 'success');
                    setTimeout(() => {
                        window.location.reload();
                    }, 300);
                })
                .catch(() => {
                    message('Cannot Add Carrier Tracking', 'error');
                });
        } else {
            message('Carrier Name is required.', 'info');
        }
    };

      //QUOTE GENERATED CODE for Carrier Code
      const generateCarrierCode = () => {
        api
            .post('/commonApi/getCodeValues', { type: 'carrier' })
            .then((res) => {
                insertTrackingItem(res.data.data);
            })
            .catch(() => {
                insertTrackingItem(''); // If generation fails, you might want to handle this differently
            });
    };
   
    return (
        <Modal size="lg" isOpen={addTrackItemModal}>
            <ModalHeader>
                Add Carrier Tracking
                <Button className="shadow-none" color="secondary"   
                   onClick={(ele) => {
                    if (window.confirm('Do you Like to Add Quote?')) {
                      generateCarrierCode(ele);
                      setAddTrackItemModal(false)
                     
                    }
                  }}>
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
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <FormGroup>
                                    <Label>Bill of Lading</Label>
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
                                    <Label>ETD</Label>
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
                                    <Label>ETA</Label>
                                    <Input
                                        type="date"
                                        name="expected_delivery_date"
                                        value={formData.expected_delivery_date}
                                        onChange={handleInputChange}
                                    />
                                </FormGroup>
                            </Col>
                                <Col md="4">
                                <FormGroup>
                                    <Label>Website Link</Label>
                                    <Input
                                        type="text"
                                        name="tracking_link"
                                        value={formData.tracking_link}
                                        onChange={handleInputChange}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Card>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button className="shadow-none" color="primary" onClick={generateCarrierCode}>
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