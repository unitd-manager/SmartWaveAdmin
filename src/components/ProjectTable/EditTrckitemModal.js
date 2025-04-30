import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
  Button,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
// import moment from 'moment';
import api from '../../constants/api';
import message from '../Message';
// import AppContext from '../../context/AppContext';

const EditLineItemModal = ({ editTrackModal, setEditTrackModal,FetchTrackItemData}) => {
  EditLineItemModal.propTypes = {
    editTrackModal: PropTypes.bool.isRequired,
    setEditTrackModal: PropTypes.func.isRequired,
    FetchTrackItemData: PropTypes.object,         
  };

  // const { loggedInuser } = useContext(AppContext);

  const [lineItemData, setLineItemData] = useState(null);

  const handleData = (e) => {
    setLineItemData({ ...lineItemData, [e.target.name]: e.target.value });
  };

 

  useEffect(() => {
      setLineItemData(FetchTrackItemData);
  }, [FetchTrackItemData]);

  const UpdateData = () => {

    api
      .post('/tracking/editEquipmentRequestItem', lineItemData)
      .then((res) => {
        console.log('edit Line Item', res.data.data);
        message('Edit Line Item Udated Successfully.', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 300);
      })
      .catch(() => {
        message('Unable to edit quote. please fill all fields', 'error');
      });
  };


        
  return (
    <Modal size="lg" isOpen={editTrackModal} >
      <ModalHeader >Edit Carrier Tracking</ModalHeader>
      <ModalBody>
      <Row>
  <Col md="4">
    <FormGroup>
      <Label>Carrier Name</Label>
      <Input
        type="text"
        name="carrier_name"
        value={lineItemData?.carrier_name || ''}
        onChange={handleData}
      />
    </FormGroup>
  </Col>
  <Col md="4">
    <FormGroup>
      <Label>Container Number</Label>
      <Input
        type="text"
        name="container_no"
        value={lineItemData?.container_no || ''}
        onChange={handleData}
      />
    </FormGroup>
  </Col>
 

<Col md="4">
<FormGroup>
    <Label> Bill of Lading</Label>
    <Input
      type="text"
      name="bill_of_loading"
      value={lineItemData?.bill_of_loading || ''}
      onChange={handleData}
    />
  </FormGroup>
</Col>
<Col md="4">
<FormGroup>
    <Label>Order No</Label>
    <Input
      type="text"
      name="order_no"
      value={lineItemData?.order_no || ''}
      onChange={handleData}
      disabled
    />
  </FormGroup>
</Col>
<Col md="4">
<FormGroup>
    <Label>ETD</Label>
    <Input
      type="date"
      name="actual_delivery_date"
      value={lineItemData?.actual_delivery_date || ''}
      onChange={handleData}
      // min={moment().format('YYYY-MM-DD')}
    />
  </FormGroup>
</Col>
<Col md="4">
<FormGroup>
    <Label>ETA</Label>
    <Input
      type="date"
      name="expected_delivery_date"
      value={lineItemData?.expected_delivery_date || ''}
      // min={moment().format('YYYY-MM-DD')}
      onChange={handleData}
    />
  </FormGroup>
</Col>
<Col md="4">

<FormGroup>
    <Label>Website Link</Label>
    <Input
      type="text"
      name="tracking_link"
      value={lineItemData?.tracking_link || ''}
      onChange={handleData}
    />
  </FormGroup>
</Col>
</Row> 

      </ModalBody>
      <ModalFooter>
        <Button color="primary" className="shadow-none"  onClick={() => {
                      UpdateData();
                      // setQuoteData();
                      //setSelectedQuoteFormat(selectedFormat);
                      setEditTrackModal(false);

                      //insertquoteLogLine();
                    }}>
          Save & Continue
        </Button>
        <Button color="secondary" className="shadow-none" onClick={() => setEditTrackModal(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditLineItemModal;
