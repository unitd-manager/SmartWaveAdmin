import React, { useState, useContext } from 'react';
import {
  Card,
  Row,
  Col,
  Form,
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

  // State to manage form data
  const [formData, setFormData] = useState({
    carrier_name: '',
    tracking_number: '',
    shipment_date: '',
    actual_delivery_date: '',
    expected_delivery_date: '',
    enquiry_id: '',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form data to API
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

  return (
    <>
      <Modal size="xl" isOpen={addTrackItemModal}>
        <ModalHeader>
          Add Carrier Tracking
          <Button
            className="shadow-none"
            color="secondary"
            onClick={() => setAddTrackItemModal(false)}
          >
            X
          </Button>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <Form>
                <Card>
                  <table className="lineitem">
                    <thead>
                      <tr>
                        <th scope="col">Carrier Name</th>
                        <th scope="col">Tracking Number</th>
                        <th scope="col">Shipment Date</th>
                        <th scope="col">Actual Delivery Date</th>
                        <th scope="col">Expected Delivery Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td data-label="Carrier Name">
                          <Input
                            type="text"
                            name="carrier_name"
                            value={formData.carrier_name}
                            onChange={handleInputChange}
                          />
                        </td>
                        <td data-label="Tracking Number">
                          <Input
                            type="text"
                            name="tracking_number"
                            value={formData.tracking_number}
                            onChange={handleInputChange}
                          />
                        </td>
                        <td data-label="Shipment Date">
                          <Input
                            type="date"
                            name="shipment_date"
                            value={formData.shipment_date}
                            onChange={handleInputChange}
                          />
                        </td>
                        <td data-label="Actual Delivery Date">
                          <Input
                            type="date"
                            name="actual_delivery_date"
                            value={formData.actual_delivery_date}
                            onChange={handleInputChange}
                          />
                        </td>
                        <td data-label="Expected Delivery Date">
                          <Input
                            type="date"
                            name="expected_delivery_date"
                            value={formData.expected_delivery_date}
                            onChange={handleInputChange}
                          />
                        </td>
                        <td data-label="Enquiry id">
                          <Input
                            type="hidden"
                            name="enquiry_id"
                            value={formData.quoteTrack}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
                <ModalFooter>
                  <Button className="shadow-none" color="primary" onClick={handleSubmit}>
                    Submit
                  </Button>
                  <Button
                    className="shadow-none"
                    color="secondary"
                    onClick={() => setAddTrackItemModal(false)}
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </Form>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

export default QuoteLineItem;
