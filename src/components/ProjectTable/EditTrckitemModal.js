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
    api.post('/tracking/getQuoteById', { enquiry_id: id }).then((res) => {
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
    if (!lineItemData?.carrier_name || !lineItemData?.tracking_number) {
      message('Please fill all required fields.', 'error');
      return;
    }

    const updatedData = {
      ...lineItemData,
      modification_date: creationdatetime,
      modified_by: loggedInuser?.first_name || 'Unknown',
    };

    api
      .post('/tracking/editEquipmentRequestItem', updatedData)
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
          handleData(e); // Update company_id in settingdetails

          // Find selected company details
          const selectedCompany = company.find((comp) => String(comp.contact_id) === selectedCompanyId);
        
          if (selectedCompany) {
            // Update shipper address
            setLineItemData((prevDetails) => ({
              ...prevDetails,
              shipper_address: selectedCompany.address1 || '',
            }));
          }
        };
        
  return (
    <Modal size="lg" isOpen={editTrackModal} toggle={() => setEditTrackModal(false)}>
      <ModalHeader toggle={() => setEditTrackModal(false)}>Edit Line Item</ModalHeader>
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
      <Label>Tracking Number</Label>
      <Input
        type="text"
        name="tracking_number"
        value={lineItemData?.tracking_number || ''}
        onChange={handleData}
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
  value={lineItemData?.shipment_id ? String(lineItemData.shipment_id) : ''} // Ensure it's updating correctly
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
      value={lineItemData?.shipper_address || ''}
      onChange={handleData}
    />
  </FormGroup>
</Col>
<Col md="4">
  <FormGroup>
    <Label>Shipment Date</Label>
    <Input
      type="date"
      name="shipment_date"
      value={lineItemData?.shipment_date || ''}
      onChange={handleData}
    />
  </FormGroup>
</Col>
<Col md="4">
    <FormGroup>
      <Label>Actual Delivery Date</Label>
      <Input
        type="date"
        name="actual_delivery_date"
        value={lineItemData?.actual_delivery_date || ''}
        onChange={handleData}
      />
    </FormGroup>
  </Col>
  </Row><Row>
  <Col md="4">
    <FormGroup>
      <Label>Expected Delivery Date</Label>
      <Input
        type="date"
        name="expected_delivery_date"
        value={lineItemData?.expected_delivery_date || ''}
        onChange={handleData}
      />
    </FormGroup>
  </Col>
  <Col md="4">

  <FormGroup>
      <Label>Recipient Name</Label>
      <Input
        type="text"
        name="recipient_name"
        value={lineItemData?.recipient_name || ''}
        onChange={handleData}
      />
    </FormGroup>
  </Col>
  <Col md="4">

  <FormGroup>
      <Label>Recipient Address</Label>
      <Input
        type="text"
        name="recipient_address"
        value={lineItemData?.recipient_address || ''}
        onChange={handleData}
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
        value={lineItemData?.package_weight || ''}
        onChange={handleData}
      />
    </FormGroup>
  </Col>
  <Col md="4">

  <FormGroup>
      <Label>Package Height</Label>
      <Input
        type="text"
        name="package_height"
        value={lineItemData?.package_height || ''}
        onChange={handleData}
      />
    </FormGroup>
  </Col>
  <Col md="4">

  <FormGroup>
      <Label>Package Length</Label>
      <Input
        type="text"
        name="package_length"
        value={lineItemData?.package_length || ''}
        onChange={handleData}
      />
    </FormGroup>
  </Col>
  <Col md="4">

  <FormGroup>
      <Label>Package Width</Label>
      <Input
        type="text"
        name="package_width"
        value={lineItemData?.package_width || ''}
        onChange={handleData}
      />
    </FormGroup>
  </Col>
  <Col md="4">

<FormGroup>
    <Label>Status</Label>
    <Input
      type="text"
      name="shipment_status"
      value={lineItemData?.shipment_status || ''}
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
