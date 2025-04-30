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


  // const UpdateData = () => {
  //   if (!lineItemData?.carrier_name || !lineItemData?.tracking_number) {
  //     message('Please fill all required fields.', 'error');
  //     return;
  //   }

  //   const updatedData = {
  //     ...lineItemData,
  //     modification_date: creationdatetime,
  //     modified_by: loggedInuser?.first_name || 'Unknown',
  //   };

  //   api
  //     .post('/tracking/editEquipmentRequestItem', updatedData)
  //     .then((res) => {
  //       console.log('Edit Line Item Response:', res.data);
  //       message('Edit Updated Successfully.', 'success');
  //       // gettrack();
  //         setTimeout(() => {
  //         window.location.reload();
  //       }, 1000);
  //     })
  //     .catch((error) => {
  //       console.error('Update Error:', error);
  //       message('Unable to edit item. Please try again.', 'error');
  //     });
  // };
      // const [company, setCompany] = useState();
      // const getCompany = () => {
      //   api.get('/company/getContact').then((res) => {
      //     setCompany(res.data.data);
      //   });
      // };


      //   useEffect(() => {
        
      //     getCompany();
        
      //   }, []);


      //   const handleCompanyChange = (e) => {
      //     const selectedCompanyId = e.target.value;
        
      //     // Update lineItemData with the selected company ID
      //     handleData(e); // Update company_id in settingdetails

      //     // Find selected company details
      //     const selectedCompany = company.find((comp) => String(comp.contact_id) === selectedCompanyId);
        
      //     if (selectedCompany) {
      //       // Update shipper address
      //       setLineItemData((prevDetails) => ({
      //         ...prevDetails,
      //         shipper_address: selectedCompany.address1 || '',
      //       }));
      //     }
      //   };
        
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
  {/* <Col md="4">
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
 
</Row>

<Row>
<Col md="4">

<FormGroup>
    <Label>Shipper Address</Label>
    <Input
      type="textarea"
      name="shipper_address"
      value={lineItemData?.shipper_address || ''}
      onChange={handleData}
     rows="4"
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
        type="textarea"
        name="recipient_address"
        value={lineItemData?.recipient_address || ''}
        onChange={handleData}
       rows="4"
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

</Row> */}

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
    <Label>Tracking Link</Label>
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
