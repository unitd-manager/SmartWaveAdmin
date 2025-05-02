import React, { useState, useEffect, useContext } from 'react';
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
import Select from 'react-select';
import * as $ from 'jquery';
import random from 'random';
import AsyncSelect from 'react-select/async';
import api from '../../constants/api';
import message from '../Message';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const QuoteLineItem = ({
    addLineItemModal,
    setAddLineItemModal,
    quoteLine,
}) => {
    QuoteLineItem.propTypes = {
        addLineItemModal: PropTypes.bool,
        setAddLineItemModal: PropTypes.func,
        quoteLine: PropTypes.string, // Assuming quoteLine is the enquiry_id which is a string
    };

    const [totalAmount, setTotalAmount] = useState(0);
    const { loggedInuser } = useContext(AppContext);
    const [addLineItem, setAddLineItem] = useState([
        {
            id: random.int(1, 99),
            unit: '',
            quantity: '',
            unit_price: '',
            amount: '',
            remarks: '',
            product_id: '',
            supplier_id: '',
            title: '',
            description: '',
            category_id: '',
            sub_category_id: '',
        },
    ]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [subCategoryOptions, setSubCategoryOptions] = useState([]);
    const [supplier, setSupplier] = useState([]);

    const getSupplier = () => {
        api.get('/purchaseorder/getSupplier',supplier)
            .then((res) => {
                const items = res.data.data;
                const finalData = [];
                items.forEach(item => {
                    finalData.push({ value: item.supplier_id, label: item.company_name });
                });
                setSupplier(finalData);
            })
            .catch(() => {
                message('Unable to fetch suppliers', 'error');
            });
    };

    //Add new line item
    const AddNewLineItem = () => {
        setAddLineItem([
            ...addLineItem,
            {
                id: new Date().getTime().toString(),
                unit: '',
                quantity: '',
                unit_price: '',
                remarks: '',
                amount: '',
                product_id: '',
                supplier_id: '',
                title: '',
                description: '',
                category_id: '',
                sub_category_id: '',
            },
        ]);
    };
    //Insert Invoice Item
    const addLineItemApi = (obj) => {
        obj.creation_date = creationdatetime;
        obj.created_by = loggedInuser.first_name;
        obj.enquiry_id = quoteLine;
        if (
            obj.quantity !== '' &&
            obj.product_id !== ''
        ) {
            api
                .post('/enquiry/insertQuoteItems', obj)
                .then(() => {
                    message('Line Item Added Successfully', 'success');
                    setTimeout(() => {
                        window.location.reload();
                    }, 300);
                })
                .catch(() => {
                    message('Unable to add line item', 'error');
                });
        } else {
            message('Product and Quantity are required.', 'info');
        }
    };
    //Invoice item values
    const getAllValues = () => {
        const result = [];
        $('.lineitem tbody tr').each(function () {
            const allValues = {};
            $(this)
                .find('input, select')
                .each(function () {
                    const fieldName = $(this).attr('name');
                    allValues[fieldName] = $(this).val();
                });
            result.push(allValues);
        });
        setTotalAmount(0);
        result.forEach((element) => {
            addLineItemApi(element);
        });
    };

    // Fetch categories based on product ID
    const getCategories = (productId) => {
        if (productId) {
            api.post('/product/getCategoryById1', { product_id: productId })
                .then((res) => {
                    const items = res.data.data;
                    const finalData = items.map(item => ({ value: item.category_id, label: item.category_title }));
                    setCategoryOptions(finalData);
                })
                .catch(() => {
                    message('Unable to fetch categories for this product', 'error');
                    setCategoryOptions([]);
                });
        } else {
            setCategoryOptions([]);
        }
    };

    // Fetch subcategories based on category ID
    const getSubCategories = (categoryId) => {
        if (categoryId) {
            api.post('/product/getCategoryById', { category_id: categoryId })
                .then((res) => {
                    const items = res.data.data;
                    const finalData = items.map(item => ({ value: item.sub_category_id, label: item.sub_category_title }));
                    setSubCategoryOptions(finalData);
                })
                .catch(() => {
                    message('Unable to fetch subcategories', 'error');
                    setSubCategoryOptions([]);
                });
        } else {
            setSubCategoryOptions([]);
        }
    };

    // Handle category change
    const handleCategoryChange = (selectedOption, itemId) => {
        const updatedItems = addLineItem.map((item) => {
            if (item.id === itemId) {
                return { ...item, category_id: selectedOption ? selectedOption.value : '', sub_category_id: '' };
            }
            return item;
        });
        setAddLineItem(updatedItems);
        getSubCategories(selectedOption ? selectedOption.value : '');
    };

    // Handle subcategory change
    const handleSubCategoryChange = (selectedOption, itemId) => {
        const updatedItems = addLineItem.map((item) => {
            if (item.id === itemId) {
                return { ...item, sub_category_id: selectedOption ? selectedOption.value : '' };
            }
            return item;
        });
        setAddLineItem(updatedItems);
    };

    // Clear row value
    const ClearValue = (ind) => {
        setAddLineItem((current) =>
            current.filter((obj) => obj.id !== ind.id)
        );
        if (ind.amount) {
            const finalTotal = totalAmount - parseFloat(ind.amount);
            setTotalAmount(finalTotal);
        }
    };

    useEffect(() => {
        getSupplier();
    }, []);

    const onchangeItems = (selectedProduct, itemId) => {
        const updatedItems = addLineItem.map((item) => {
            if (item.id === itemId) {
                return {
                    ...item,
                    product_id: selectedProduct ? selectedProduct.value.toString() : '',
                    title: selectedProduct ? selectedProduct.label : '',
                };
            }
            return item;
        });
        setAddLineItem(updatedItems);
        if (selectedProduct?.value) {
            getCategories(selectedProduct.value);
        } else {
            setCategoryOptions([]);
            setSubCategoryOptions([]);
        }
    };

    // useEffect(() => {
    //     // This useEffect might not be necessary anymore as getCategories is called in onchangeItems
    //     // if (productDetails?.product_id) {
    //     //     getCategories(productDetails.product_id);
    //     // }
    // }, [productDetails?.product_id]);

    const loadOptions = (inputValue, callback) => {
        api.get(`/product/getProductsbySearchFilter`, { params: { keyword: inputValue } })
            .then((res) => {
                const items = res.data.data;
                const options = items.map((item) => ({
                    value: item.product_id,
                    label: item.title,
                }));
                callback(options);
            })
            .catch(() => {
                callback([]); // Ensure callback is always called
            });
    };

    return (
        <>
            <Modal size="xl" isOpen={addLineItemModal}>
                <ModalHeader>
                    Add Items
                    <Button
                        className="shadow-none"
                        color="secondary"
                        onClick={() => {
                            setAddLineItemModal(false);
                        }}
                    >
                        X
                    </Button>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md="12">
                            <Form>
                                <Row>
                                    <Row>
                                        <Col md="3">
                                            <Button
                                                className="shadow-none"
                                                color="primary"
                                                type="button"
                                                onClick={() => {
                                                    AddNewLineItem();
                                                }}
                                            >
                                                Add Line Item
                                            </Button>
                                        </Col>
                                    </Row>
                                    {/* Invoice Item */}
                                    <Card>
                                        <table className="lineitem">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Product Name </th>
                                                    <th scope="col">Category </th>
                                                    <th scope="col">Subcategory</th>
                                                    <th scope="col">Qty</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {addLineItem &&
                                                    addLineItem.map((item) => (
                                                        <tr key={item.id}>
                                                            <td>
                                                                <AsyncSelect
                                                                    defaultValue={item.product_id ? { value: item.product_id, label: item.title } : null}
                                                                    onChange={(selectedOption) => {
                                                                        onchangeItems(selectedOption, item.id);
                                                                    }}
                                                                    loadOptions={loadOptions}
                                                                    placeholder="Search Product"
                                                                />
                                                                <Input value={item.product_id || ''} type="hidden" name="product_id" />
                                                                <Input value={item.title || ''} type="hidden" name="title" />
                                                            </td>
                                                            <td data-label="Category">
                                                                <Select
                                                                    name="category_id"
                                                                    value={item.category_id ? categoryOptions.find(option => option.value === item.category_id) : null}
                                                                    onChange={(selectedOption) => {
                                                                        handleCategoryChange(selectedOption, item.id);
                                                                    }}
                                                                    options={categoryOptions}
                                                                    placeholder="Select Category"
                                                                />
                                                            </td>
                                                            <td data-label="SubCategory">
                                                                <Select
                                                                    name="sub_category_id"
                                                                    value={item.sub_category_id ? subCategoryOptions.find(option => option.value === item.sub_category_id) : null}
                                                                    onChange={(selectedOption) => {
                                                                        handleSubCategoryChange(selectedOption, item.id);
                                                                    }}
                                                                    options={subCategoryOptions}
                                                                    placeholder="Select Subcategory"
                                                                    isDisabled={!item.category_id}
                                                                />
                                                            </td>
                                                            <td data-label="Qty">
                                                                <Input Value={item.quantity || ''} type="number" name="quantity" />
                                                            </td>
                                                            <td data-label="Action">
                                                                <Input type="hidden" name="id" Value={item.id} />
                                                                <span
                                                                    className="addline"
                                                                    onClick={() => {
                                                                        ClearValue(item);
                                                                    }}
                                                                >
                                                                    Clear
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </Card>
                                    <ModalFooter>
                                        <Button
                                            className="shadow-none"
                                            color="primary"
                                            onClick={() => {
                                                getAllValues();
                                            }}
                                        >
                                            Submit
                                        </Button>
                                        <Button
                                            className="shadow-none"
                                            color="secondary"
                                            onClick={() => {
                                                setAddLineItemModal(false);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </ModalFooter>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </>
    );
};

export default QuoteLineItem;