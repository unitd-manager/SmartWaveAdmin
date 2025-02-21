import React, { useState, useEffect, useContext } from 'react';
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
import { useParams } from 'react-router-dom';
import api from '../../constants/api';
import message from '../Message';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const EditLineItemModal = ({ editTrackModal, setEditTrackModal,FetchTrackItemDat,gettrack }) => {
  EditLineItemModal.propTypes = {
    editTrackModal: PropTypes.bool.isRequired,
    setEditTrackModal: PropTypes.func.isRequired,
    FetchTrackItemDat: PropTypes.object,
        gettrack: PropTypes.any,
    
  };

  const { id } = useParams();
  const { loggedInuser } = useContext(AppContext);

  const [lineItemData, setLineItemData] = useState(FetchTrackItemDat || {});



  const getQuote = () => {
    api.post('/address/getQuoteById', { contact_id: id }).then((res) => {
      if (res.data.data.length > 0) {
        setLineItemData(res.data.data[0]);
      }
    });
  };

  useEffect(() => {
      setLineItemData(FetchTrackItemDat);
    getQuote();
  }, [FetchTrackItemDat]);


  const handleData = (e) => {
    setLineItemData({ ...lineItemData, [e.target.name]: e.target.value });
    //setSelectedFormat(e.target.value);
  };


  const UpdateData = () => {
    if (!lineItemData?.address_flat) {
      message('Please fill all required fields.', 'error');
      return;
    }

    const updatedData = {
      ...lineItemData,
      modification_date: creationdatetime,
      modified_by: loggedInuser?.first_name || 'Unknown',
    };

    api
      .post('/address/editEquipmentRequestItem', updatedData)
      .then((res) => {
        console.log('Edit Line Item Response:', res.data);
        message('Edit Updated Successfully.', 'success');
        gettrack();
          setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.error('Update Error:', error);
        message('Unable to edit item. Please try again.', 'error');
      });
  };
     
  return (
    <Modal size="lg" isOpen={editTrackModal} toggle={() => setEditTrackModal(false)}>
      <ModalHeader toggle={() => setEditTrackModal(false)}>Edit Line Item</ModalHeader>
      <ModalBody>
      <Row>
  <Col md="4">
    <FormGroup>
      <Label>Shipper Name</Label>
      <Input
        type="text"
        name="shipper_name"
        value={lineItemData?.shipper_name || ''}
        onChange={handleData}
      />
    </FormGroup>
  </Col>
  <Col md="4">
    <FormGroup>
      <Label>Address 1</Label>
      <Input
        type="text"
        name="address_flat"
        value={lineItemData?.address_flat || ''}
        onChange={handleData}
      />
    </FormGroup>
  </Col>
  <Col md="4">
    <FormGroup>
      <Label>Address 2</Label>
      <Input
        type="text"
        name="address_street"
        value={lineItemData?.address_street || ''}
        onChange={handleData}
      />
    </FormGroup>
  </Col>
  <Col md="4">
    <FormGroup>
      <Label>Address 3</Label>
      <Input
        type="text"
        name="address_town"
        value={lineItemData?.address_town || ''}
        onChange={handleData}
      />
    </FormGroup>
  </Col>
  <Col md="4">
    <FormGroup>
      <Label>State</Label>
      <Input
        type="text"
        name="address_state"
        value={lineItemData?.address_state || ''}
        onChange={handleData}
      />
    </FormGroup>
  </Col>
  <Col md="4">
    <FormGroup>
      <Label>Country</Label>
      <Input
        type="text"
        name="address_country"
        value={lineItemData?.address_country || ''}
        onChange={handleData}
      />
    </FormGroup>
  </Col>
  <Col md="4">
    <FormGroup>
      <Label>Po Code</Label>
      <Input
        type="text"
        name="address_po_code"
        value={lineItemData?.address_po_code || ''}
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
