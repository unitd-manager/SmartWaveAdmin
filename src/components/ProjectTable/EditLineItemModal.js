import React, { useState,useEffect } from 'react';
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

const EditLineItemModal = ({ editLineModal, setEditLineModal, FetchLineItemData }) => {
  EditLineItemModal.propTypes = {
    editLineModal: PropTypes.bool,
    setEditLineModal: PropTypes.func,
    FetchLineItemData: PropTypes.object,
  };
const {id}=useParams();
  const [lineItemData, setLineItemData] = useState(null);
  // const [totalAmount, setTotalAmount] = useState();
  const { loggedInuser } = React.useContext(AppContext);

  const handleData = (e) => {
    setLineItemData({ ...lineItemData, [e.target.name]: e.target.value });
  };
  // const handleCalc = (Qty, UnitPrice, TotalPrice) => {
  //   if (!Qty) Qty = 0;
  //   if (!UnitPrice) UnitPrice = 0;
  //   if (!TotalPrice) TotalPrice = 0;

  //   setTotalAmount(parseFloat(Qty) * parseFloat(UnitPrice));
  // };

  const UpdateData = () => {
    lineItemData.equipment_request_id=id;
    //lineItemData.amount=totalAmount;
    lineItemData.modification_date = creationdatetime;
    lineItemData.modified_by = loggedInuser.first_name;
    api
      .post('/enquiry/editEquipmentRequestItem', lineItemData)
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
  const [unitdetails, setUnitDetails] = useState();
  const [unitdetails1, setUnitDetails1] = useState();

   
  // getting data from Category
  const getCategory = (categoryId1) => {
    api
      .post('/product/getCategoryById1', { product_id: categoryId1 })
      .then((res) => {
        setUnitDetails(res.data.data);
      })
  };

  // getting data from SubCategory
    const getSubCategory = (categoryId) => {
      api.post('/product/getCategoryById', { category_id: categoryId }).then((res) => {
        setUnitDetails1(res.data.data);
      });
    };

useEffect(() => {
    if (lineItemData?.product_id) {
      getCategory(lineItemData.product_id);
    }
  }, [lineItemData?.product_id]);

  useEffect(() => {
    if (lineItemData?.category_id) {
      getSubCategory(lineItemData.category_id);
    }
  }, [lineItemData?.category_id]);

  React.useEffect(() => {
    setLineItemData(FetchLineItemData);
  }, [FetchLineItemData]);

  return (
    <>
      <Modal isOpen={editLineModal}>
        <ModalHeader>Edit Items</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Row>
              <Label sm="2">Title</Label>
              <Col sm="10">
                <Input
                  type="text"
                  name="product_title"
                  defaultValue={lineItemData && lineItemData.product_title}
                  onChange={handleData}
                  disabled
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label sm="2">Category</Label>
              <Col sm="10">
    <Input
        type="select"
        name="category_id"
        value={lineItemData && lineItemData.category_id} // Use 'value' instead of 'defaultValue'
        onChange={handleData}
    >
        <option value="">Please Select</option> {/* Ensure the default option has an empty value */}
        {unitdetails &&
            unitdetails.map((ele) => (
                <option key={ele.category_id} value={ele.category_id}>
                    {ele.category_title}
                </option>
            ))}
    </Input>
</Col>
              </Row>
              </FormGroup>
              <FormGroup>
              <Row>
              <Label sm="2">SubCat</Label>
              <Col sm="10">
                <Input
                  type="select"
                  name="sub_category_id"
                  value={lineItemData && lineItemData.sub_category_id}
                  onChange={handleData}
                >
        <option value="">Please Select</option> {/* Ensure the default option has an empty value */}
        {unitdetails1 &&
                    unitdetails1.map((ele) => {
                      return (
                        <option key={ele.sub_category_id} value={ele.sub_category_id}>
                          {ele.sub_category_title}
                        </option>
                      );
                    })}
                </Input>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label sm="2">Qty</Label>
              <Col sm="10">
                <Input
                  type="text"
                  name="quantity"
                  defaultValue={lineItemData && lineItemData.quantity}
                  onChange={handleData}
                 
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label sm="2">Grade</Label>
              <Col sm="10">
                <Input
                  type="text"
                  name="grades"
                  defaultValue={lineItemData && lineItemData.grades}
                  onChange={handleData}
                  disabled // ← This disables the input
                 
                />
              </Col>
            </Row>
          </FormGroup>
         
          {/* <FormGroup>
            <Row>
              <Label sm="2">Unit Price</Label>
              <Col sm="10">
                <Input
                  type="text"
                  name="unit_price"
                  defaultValue={lineItemData && lineItemData.unit_price}
                  onChange={(e)=>{handleData(e);
                    handleCalc(lineItemData.quantity,e.target.value,lineItemData.amount)
                  }}
                />
                 
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label sm="2">Total Price</Label>
              <Col sm="10">
                <Input
                  type="text"
                  name="amount"
                  value={totalAmount || lineItemData && lineItemData.amount}
                  onChange={(e)=>{handleData(e);
                    handleCalc(lineItemData.quantity,lineItemData.unit_price,e.target.value)
                  }}
                  disabled
                />
              </Col>
            </Row>
          </FormGroup> */}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="shadow-none"
            type="button"
            onClick={() => {
              UpdateData();
              setEditLineModal(false);
            }}
          >
            Save & Continue
          </Button>
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
              setEditLineModal(false);
            }}
          >
            {' '}
            Cancel{' '}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditLineItemModal;
