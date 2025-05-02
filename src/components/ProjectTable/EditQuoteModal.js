import React, { useState, useEffect } from 'react';
import {
    Row,
    Col,
    FormGroup,
    Input,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Label,
    Form,
} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import api from '../../constants/api';
import message from '../Message';

const EditQuoteModal = ({
    editQuoteModal,
    setEditQuoteModal,
    quoteDatas,
    lineItem,
    getQuoteFun,
    enquiryIdToEdit, // New prop to receive the specific enquiry ID
}) => {
    EditQuoteModal.propTypes = {
        editQuoteModal: PropTypes.bool,
        setEditQuoteModal: PropTypes.func,
        quoteDatas: PropTypes.object,
        lineItem: PropTypes.object,
        getQuoteFun: PropTypes.any,
        enquiryIdToEdit: PropTypes.string, // Prop type for the new prop
    };

    const [quoteData, setQuoteData] = useState(quoteDatas);
    console.log('win', lineItem);

    const handleData = (e) => {
        setQuoteData({ ...quoteData, [e.target.name]: e.target.value });
    };

    const getQuote = (enquiryId) => {
        if (enquiryId) {
            api.post('/enquiry/getQuoteById', { enquiry_id: enquiryId }).then((res) => {
                setQuoteData(res.data.data[0]);
            });
        }
    };

    const GetEditQuote = () => {
        api
            .post('/enquiry/edit-TabQuote', quoteData)
            .then(() => {
                message('Quote Edited Successfully.', 'success');
                getQuoteFun();
            })
            .catch(() => {
                message('Unable to edit quote. Please fill all fields', 'error');
            });
    };

    useEffect(() => {
        setQuoteData(quoteDatas);
        if (enquiryIdToEdit) {
            getQuote(enquiryIdToEdit);
        }
    }, [quoteDatas, enquiryIdToEdit]); // Re-run effect when quoteDatas or enquiryIdToEdit changes

    return (
        <>
            {/* Edit Quote Modal */}
            <Modal size="lg" isOpen={editQuoteModal}>
                <ModalHeader>
                    Edit Quote
                    <Button
                        color="secondary"
                        onClick={() => {
                            setEditQuoteModal(false);
                        }}
                    >
                        X
                    </Button>
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Row>
                                <Col md="4">
                                    <FormGroup>
                                        <Label>Quote Code</Label>
                                        <Input
                                            type="text"
                                            name="quote_code"
                                            value={quoteData && quoteData.quote_code}
                                            onChange={handleData}
                                            disabled
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label>Quote Date</Label>
                                        <Input
                                            type="date"
                                            name="quote_date"
                                            value={quoteData ? moment(quoteData.quote_date).format('YYYY-MM-DD') : ''}
                                            onChange={handleData}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label> Quote Status</Label>
                                        <Input
                                            value={quoteData && quoteData.status}
                                            type="select"
                                            onChange={handleData}
                                            name="status"
                                        >
                                            <option value="">Please Select</option>
                                            <option value="New">New</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Hold">Hold</option>
                                            <option value="Win">Win</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label>Amount</Label>
                                        <Input
                                            type="text"
                                            name="price"
                                            defaultValue={(quoteData && quoteData.price) || 0}
                                            onChange={handleData}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                                    <Button
                                        type="button"
                                        color="primary"
                                        className="btn shadow-none mr-2"
                                        onClick={() => {
                                            GetEditQuote();
                                            setEditQuoteModal(false);
                                        }}
                                    >
                                        Save & Continue
                                    </Button>
                                    <Button
                                        color="secondary"
                                        className="shadow-none"
                                        onClick={() => {
                                            setEditQuoteModal(false);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </Row>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
            {/* END Edit Quote Modal */}
        </>
    );
};

export default EditQuoteModal;