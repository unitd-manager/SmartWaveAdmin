/*eslint-disable*/
import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import Select from 'react-select';
import ComponentCard from '../ComponentCard';

 const DestinationPortEditDetails = ({
  destinationporteditdetails,
  handleInputs,
  destinationportname,
  id,
}) => {
  DestinationPortEditDetails.propTypes = {
    destinationporteditdetails: PropTypes.object,
    handleInputs: PropTypes.func,
    destinationportname: PropTypes.array,
    id: PropTypes.any,
  };

  return (
    <Form>
      <FormGroup>
        <ComponentCard title="DestinationPort Details"
                    creationModificationDate={destinationporteditdetails}
        >
          <Row>
            <Col md="4">
              <FormGroup>
                <Label>
                 Country<span className="required"> *</span>
                </Label>
                <Select
                  name="country"
                  options={destinationportname?.map((ele) => ({
                    value: ele.name,
                    label: ele.name,
                  }))}
                  value={destinationporteditdetails && destinationporteditdetails.country ? { value: destinationporteditdetails.country, label: destinationporteditdetails.country } : null}
                  onChange={(selectedOption) => {
                    handleInputs({
                      target: {
                        name: 'country',
                        value: selectedOption ? selectedOption.value : '',
                      },
                    });
                  }}
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label>
                  Destination Port <span className="required"> *</span>
                </Label>
                <Input
                  type="textarea"
                  onChange={handleInputs}
                  value={destinationporteditdetails && destinationporteditdetails.destination_port}
                  name="destination_port"
                />
              </FormGroup>
            </Col>
           
            <Col md="4">
                <FormGroup>
                  <Label>Published</Label>
                  <br></br>
                  <Label>Yes</Label>
                  <Input
                    name="published"
                    value="1"
                    type="radio"
                    defaultChecked={destinationporteditdetails && destinationporteditdetails.published === 1 && true}
                    onChange={handleInputs}
                  />
                  <Label>No</Label>
                  <Input
                    name="published"
                    value="0"
                    type="radio"
                    defaultChecked={destinationporteditdetails && destinationporteditdetails.published === 0 && true}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
          </Row>
        </ComponentCard>
      </FormGroup>
    </Form>
  );
}
export default DestinationPortEditDetails