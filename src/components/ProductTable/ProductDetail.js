import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import ComponentCard from '../ComponentCard';


export default function ProductDetail({ productDetails, handleInputs,categoryLinked,productOwnerLinked, subcategoryLinked, subcategorytypeLinked }) {
    ProductDetail.propTypes = {
    productDetails: PropTypes.object,
    handleInputs: PropTypes.func,
    categoryLinked: PropTypes.array,
    productOwnerLinked: PropTypes.array,
    subcategoryLinked: PropTypes.array,
    subcategorytypeLinked: PropTypes.array,
    
  };
  return (
    <>
      <Form>
        <FormGroup>
        <ComponentCard title={<h4 className="mb-0">Product Details</h4>} creationModificationDate={productDetails}>
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Product code </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={productDetails && productDetails.product_code}
                    name="product_code"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Product Name </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={productDetails && productDetails.title}
                    name="title"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  {/* Category title from Category table */}
                  <Label>Category</Label>
                  <Input
                    type="select"
                    name="category_id"
                    value={productDetails && productDetails.category_id}
                    onChange={handleInputs}
                  >
                    <option defaultValue="selected">Please Select</option>
                    {categoryLinked &&
                      categoryLinked.map((ele) => {
                        return (
                          <option key={ele.category_id} value={ele.category_id}>
                            {ele.category_title}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                              <FormGroup>
                                {/* subcategory title from sub Category table */}
                                <Label>Sub Category</Label>
                                <Input
                                  type="select"
                                  name="sub_category_id"
                                  value={productDetails && productDetails.sub_category_id}
                                  onChange={handleInputs}
                                >
                                 <option value="">Select Subcategory</option>
    {subcategoryLinked &&
      subcategoryLinked.map((subcat) => (
        <option key={subcat.sub_category_id} value={subcat.sub_category_id}>
          {subcat.sub_category_title}
        </option>
      ))}
  </Input>
                              </FormGroup>
                            </Col>
                            </Row>
                            <Row>
                            <Col md="3">
                              <FormGroup>
                                {/* subcategory title from sub Category table */}
                                <Label>SubCategory Type</Label>
{/* <Input
  type="select"
  name="sub_category_type_id"
  value={productDetails?.sub_category_type_id || ""}
  onChange={handleInputs}
  disabled={!productDetails?.sub_category_id || subcategorytypeLinked?.length === 0}
>
  <option value="">Please Select</option>
  {subcategorytypeLinked?.length > 0 ? (
    subcategorytypeLinked?.map((ele) => (
      <option key={ele.sub_category_type_id} value={ele.sub_category_type_id}>
        {ele.type_title}
      </option>
    ))
  ) : (
    <option >No Types Available</option>
  )}
</Input> */}
<Input
                                  type="select"
                                  name="sub_category_type_id"
                                  value={productDetails && productDetails.sub_category_type_id}
                                  onChange={handleInputs}
                                >
                                 <option value="">Select SubCategory Type</option>
  {subcategorytypeLinked && subcategorytypeLinked.length > 0 ? (
    subcategorytypeLinked.map((ele) => (
      <option key={ele.sub_category_type_id} value={ele.sub_category_type_id}>
        {ele.type_title}
      </option>
    ))
  ) : (
    <option disabled>No Types Available</option>
  )}
  </Input>
                              </FormGroup>
                            </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Grades</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={productDetails && productDetails.grades}
                    name="grades"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Product Owner</Label>
                  <Input
                    type="select"
                    name="product_owner_id"
                    value={productDetails && productDetails.product_owner_id}
                    onChange={handleInputs}
                  >
                    <option defaultValue="selected">Please Select</option>
                    {productOwnerLinked &&
                      productOwnerLinked.map((ele) => {
                        return (
                          <option key={ele.product_owner_id} value={ele.product_owner_id}>
                            {ele.company_name}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
              
              <Col md="3">
                <FormGroup>
                  <Label>Quantity</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={productDetails && productDetails.qty_in_stock}
                    name="qty_in_stock"
                  />
                </FormGroup>
              </Col>
              </Row>
            
              <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Count</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={productDetails && productDetails.tag}
                    name="tag"
                  />
                </FormGroup>
              </Col>
                  <Col md="3">
                <FormGroup>
                  <Label>Origin</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={productDetails && productDetails.origin}
                    name="origin"
                  />
                </FormGroup>
              </Col>
                  <Col md="3">
                <FormGroup>
                  <Label>Destination Port</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={productDetails && productDetails.destination_ports}
                    name="destination_ports"
                  />
                </FormGroup>
              </Col>
                  <Col md="3">
                <FormGroup>
                  <Label>HSN</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={productDetails && productDetails.hsn}
                    name="hsn"
                  />
                </FormGroup>
              </Col>
                </Row>
              <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Unit </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={productDetails && productDetails.unit}
                    name="unit"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Short Description </Label>
                  <Input
                    type="textarea"
                    onChange={handleInputs}
                    value={productDetails && productDetails.description_short}
                    name="description_short"
                  />
                </FormGroup>
              </Col>
            
              
              <Col md="3">
                <FormGroup>
                  <Label>Description </Label>
                  <Input
                    type="textarea"
                    onChange={handleInputs}
                    value={productDetails && productDetails.description}
                    name="description"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <Label>Most Popular</Label>
                <FormGroup>
                  <Label>Yes</Label>
                  &nbsp;
                  <Input
                    name="most_popular"
                    value="1"
                    type="radio"
                    defaultChecked={productDetails && productDetails.most_popular === 1 && true}
                    onChange={handleInputs}
                  />
                  &nbsp; &nbsp;
                  <Label>No</Label>
                  &nbsp;
                  <Input
                    name="most_popular"
                    value="0"
                    type="radio"
                    defaultChecked={productDetails && productDetails.most_popular === 0 && true}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
 </Row>
              <Row>
              <Col md="3">
                <Label>Most sellers</Label>
                <FormGroup>
                  <Label>Yes</Label>
                  &nbsp;
                  <Input
                    name="top_seller"
                    value="1"
                    type="radio"
                    defaultChecked={productDetails && productDetails.top_seller === 1 && true}
                    onChange={handleInputs}
                  />
                  &nbsp; &nbsp;
                  <Label>No</Label>
                  &nbsp;
                  <Input
                    name="top_seller"
                    value="0"
                    type="radio"
                    defaultChecked={productDetails && productDetails.top_seller === 0 && true}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
              

              <Col md="3">
                <Label>Published</Label>
                <FormGroup>
                  <Label>Yes</Label>
                  &nbsp;
                  <Input
                    name="published"
                    value="1"
                    type="radio"
                    defaultChecked={productDetails && productDetails.published === 1 && true}
                    onChange={handleInputs}
                  />
                  &nbsp; &nbsp;
                  <Label>No</Label>
                  &nbsp;
                  <Input
                    name="published"
                    value="0"
                    type="radio"
                    defaultChecked={productDetails && productDetails.published === 0 && true}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
             

              <Col md="3">
                <Label>New Arrivals</Label>
                <FormGroup>
                  <Label>Yes</Label>
                  &nbsp;
                  <Input
                    name="latest"
                    value="1"
                    type="radio"
                    defaultChecked={productDetails && productDetails.latest === 1 && true}
                    onChange={handleInputs}
                  />
                  &nbsp; &nbsp;
                  <Label>No</Label>
                  &nbsp;
                  <Input
                    name="latest"
                    value="0"
                    type="radio"
                    defaultChecked={productDetails && productDetails.latest === 0 && true}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
       
        </FormGroup>
      </Form>
     
     
    </>
  );
}
