import {
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  ModalFooter,
  Label,
  Input,
  Button,
} from 'reactstrap';
import PropTypes from 'prop-types';


export default function SubCategoryTypeDetails({
  handleInputs,
  insertCompany,
  modal,
  toggle,
  companyInsertData,
  addFormSubmitted,
}) {
    SubCategoryTypeDetails.propTypes = {
    handleInputs: PropTypes.any,
    insertCompany: PropTypes.any,
    modal: PropTypes.any,
    toggle: PropTypes.any,
    companyInsertData: PropTypes.any,
    addFormSubmitted: PropTypes.any,
  };

  
  
  return (
    <div>
      <Modal size="lg" isOpen={modal} toggle={toggle.bind(null)}>
        <ModalHeader toggle={toggle.bind(null)}>New Company</ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <Card>
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <Label>
                            SubCategory Type
                          </Label>
                          <span className="required">*</span>
                          <Input
                            type="text"
                            onChange={handleInputs}
                            value={companyInsertData.type_title}
                            name='type_title'
                            className={`form-control ${
                              addFormSubmitted &&
                              ( companyInsertData.type_title.trim() === '')
                                ? 'highlight'
                                : ''
                            }`}
                          />

                          {addFormSubmitted &&
                            (
                              companyInsertData.type_title.trim() === '') && (
                              <div className="error-message">Please Enter</div>
                            )}
                        </FormGroup>
                      </Col>
                      

                      
          </Row>
        <ModalFooter>
          <Button
            color="primary"
            className="btn mr-2 shadow-none"
            onClick={() => {
              insertCompany();
            }}
          >
            Save & Continue
          </Button>
          <Button color="secondary" className="shadow-none" onClick={toggle.bind(null)}>
            Cancel
          </Button>
        </ModalFooter>
        </Form>
        </CardBody>
        </Card>
        </Col>
        </Row>
        </ModalBody>
        </Modal>
      
    </div>
  );
}
