import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Button,Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useNavigate, useParams } from 'react-router-dom';
import classnames from "classnames";
import '../form-editor/editor.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import ComponentCardV2 from '../../components/ComponentCardV2';
import message from '../../components/Message';
import api from '../../constants/api';
import PurchaseOrderLinked from '../../components/SupplierModal/Purchaseorderlinked';
//import SupplierTable from '../../components/SupplierModal/SupplierTable';
//import SupplierDetails from '../../components/SupplierModal/SupplierDetails';
import ProductOwnerDetails from '../../components/SupplierModal/ProductOwnerDetails';
//import EnquiriesLinked from "./EnquiriesLinked"; // Replace with actual path
//import QuotationsLinked from "./QuotationsLinked"; // Replace with actual path
import ProductLinkedTable from '../../components/SupplierModal/ProductLinked';
import QuotaionsLinkedTable from '../../components/SupplierModal/QuotationsLinked';
import EnquiriesLinkedTable from '../../components/SupplierModal/EnquiriesLinked';

const SupplierEdit = () => {
  //all state variables
  const [supplier, setSupplier] = useState();
  const [products, setProducts] = useState([]);
  const [allCountries, setAllCountries] = useState();
  const [editPurchaseOrderLinked, setEditPurchaseOrderLinked] = useState(false);
  const [supplierStatus, setSupplierStatus] = useState();
  const [status, setStatus] = useState();
  const [activeTab, setActiveTab] = useState("1");
  // Edit States for Tabs
  const [enquiries, setEnquiries] = useState([]);
  const [quotes, setQuotes] = useState([]);
  

  // Toggle Tab Function
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  //navigation and params
  const { id } = useParams();
  const navigate = useNavigate();
  const applyChanges = () => {};

  // Get Supplier By Id
  const editSupplierById = () => {
    api
      .post('/supplier/get-ProductOwnerById', { product_owner_id: id })
      .then((res) => {
        setSupplier(res.data.data[0]);
      })
      .catch(() => {
        message('Supplier Data Not Found', 'info');
      });
  };

  const handleInputs = (e) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };
  //Logic for edit data in db
  const editSupplierData = () => {
    if (supplier.company_name !== '')
      api
        .post('/supplier/edit-ProductOwner', supplier)
        .then(() => {
          message('Record editted successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    else {
      message('Please fill all required fields.', 'error');
    }
  };
  //Logic for edit data in db
  const Status = () => {
    api
      .post('/supplier/getStatus', { product_owner_id: id })
      .then((res) => {
        setStatus(res.data.data[0]);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  useEffect(() => {
    editSupplierById();
  }, [id]);
  // Get purchaseOrder By Id
  const getpurchaseOrder = () => {
    api
      .post('/supplier/getProductsLinked', { product_owner_id: id })
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch(() => {
        message('Supplier not found', 'info');
      });
  };
  const suppliereditdetails = () => {
    api
      .get('/geocountry/getCountry')
      .then((res) => {
        setAllCountries(res.data.data);
      })
      .catch(() => {
        message('Supplier Data Not Found', 'info');
      });
  };
  //Api call for getting Staff Type From Valuelist
  const getSupplierStatus = () => {
    api
      .get('/supplier/getValueList')
      .then((res) => {
        setSupplierStatus(res.data.data);
      })
      .catch(() => {
        message('Status Data Not Found', 'info');
      });
  };
  
  const getEnquiries = () => {
    api
      .post('/supplier/getEnquiriesLinked',{product_owner_id:id})
      .then((res) => {
        setEnquiries(res.data.data);
      })
      .catch(() => {
        message('Status Data Not Found', 'info');
      });
  };
  
  const getQuotes = () => {
    api
      .post('/supplier/getQuotesLinked',{product_owner_id:id})
      .then((res) => {
        setQuotes(res.data.data);
      })
      .catch(() => {
        message('Status Data Not Found', 'info');
      });
  };
  useEffect(() => {
    getpurchaseOrder();
    suppliereditdetails();
    getSupplierStatus();
    Status();
    getEnquiries();
    getQuotes();
  }, []);

  return (
    <>
      <BreadCrumbs heading={supplier && supplier.company_name} />
      <Form>
        <FormGroup>
          <ComponentCardV2>
            <Row>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editSupplierData();
                    setTimeout(() => {
                      navigate('/ProductOwner');
                    }, 1100);
                  }}
                >
                  Save
                </Button>
              </Col>
              <Col>
                <Button
                  color="primary"
                  className="shadow-none"
                  onClick={() => {
                    editSupplierData();
                   
                  }}
                >
                  Apply
                </Button>
              </Col>
              <Col>
                <Button
                  color="dark"
                  className="shadow-none"
                  onClick={() => {
                    applyChanges();
                  }}
                >
                  Back to List
                </Button>
              </Col>
            </Row>
          </ComponentCardV2>
        </FormGroup>
      </Form>
      <ProductOwnerDetails
        handleInputs={handleInputs}
        supplier={supplier}
        allCountries={allCountries}
        supplierStatus={supplierStatus}
        status={status}
        setEditPurchaseOrderLinked={setEditPurchaseOrderLinked}
      ></ProductOwnerDetails>

      <PurchaseOrderLinked
        editPurchaseOrderLinked={editPurchaseOrderLinked}
        setEditPurchaseOrderLinked={setEditPurchaseOrderLinked}
      ></PurchaseOrderLinked>
      <ComponentCard>
      <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "1" })}
                onClick={() => toggleTab("1")}
              >
                Product Linked
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "2" })}
                onClick={() => toggleTab("2")}
              >
                Enquiries Linked
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "3" })}
                onClick={() => toggleTab("3")}
              >
                Quotations Linked
              </NavLink>
            </NavItem>
          </Nav>

          {/* Tab Content */}
          <TabContent activeTab={activeTab}>
            {/* Product Linked Tab */}
            <TabPane tabId="1">
              <ProductLinkedTable
                purchaseOrder={products}
              />
            </TabPane>

            {/* Enquiries Linked Tab */}
            <TabPane tabId="2">
              <EnquiriesLinkedTable
              purchaseOrder={enquiries}
              />
            </TabPane>

            {/* Quotations Linked Tab */}
            <TabPane tabId="3">
              <QuotaionsLinkedTable
               purchaseOrder={quotes}
              />
            </TabPane>
          </TabContent>
        <ToastContainer></ToastContainer>
     
      </ComponentCard>
    </>
  );
};

export default SupplierEdit;
