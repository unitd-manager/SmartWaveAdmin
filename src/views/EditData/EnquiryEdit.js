import React, { useEffect, useState,useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button ,TabPane, TabContent,Table} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import * as Icon from 'react-feather';
import Swal from 'sweetalert2';
import moment from 'moment';
import { useNavigate, useParams ,Link} from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import ComponentCardV2 from '../../components/ComponentCardV2';
import message from '../../components/Message';
import Tab from '../../components/ProjectTable/Tab';
import TenderQuotation from '../../components/ProjectTable/TenderQuotation';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import api from '../../constants/api';
import AppContext from '../../context/AppContext';
import creationdatetime from '../../constants/creationdatetime';
// import DeleteButton from '../../components/DeleteButton';
import QuoteLineItem from '../../components/ProjectTable/QuoteLineItem';
import EditLineItemModal from '../../components/ProjectTable/EditLineItemModal';
import QuoteTrackItem from '../../components/ProjectTable/QuoteTrackItem';
import EditTrackItemModal from '../../components/ProjectTable/EditTrckitemModal';

const EnquiryEdit = () => {
  //All state variable
  const [enquiryDetails, setEnquiryDetails] = useState();
    const [company, setCompany] = useState();

    const [addLineItemModal, setAddLineItemModal] = useState(false);
    const [lineItem, setLineItem] = useState();
    const [viewLineModal, setViewLineModal] = useState(false);
    const [addTrackItemModal, setAddTrackItemModal] = useState(false);
    const [TrackItem, setTrackItem] = useState();
    const [viewTrackModal, setViewTrackModal] = useState(false);
    const [editQuoteModal, setEditQuoteModal] = useState(false);

    const [editLineModelItem, setEditLineModelItem] = useState(null);
    const [editLineModal, setEditLineModal] = useState(false);

    const [editTrackModelItem, setEditTrackModelItem] = useState(null);
    const [editTrackModal, setEditTrackModal] = useState(false);
      const [attachmentModal, setAttachmentModal] = useState(false);
    
      const [attachmentData, setDataForAttachment] = useState({
        modelType: '',
      });
      const { loggedInuser } = useContext(AppContext);


      const dataForAttachment = () => {
        setDataForAttachment({
          modelType: 'attachment',
        });
        console.log('inside DataForAttachment');
      };
  
  //navigation and parameters
  const { id } = useParams();
  const navigate = useNavigate();
  const applyChanges = () => {};
  const backToList = () => {
    navigate('/Enquiry');
  };
  const [activeTab, setActiveTab] = useState('1');

  const addQuoteItemsToggle = () => {
    setAddLineItemModal(!addLineItemModal);
  };

  const addTrackItemsToggle = () => {
    setAddTrackItemModal(!addTrackItemModal);
  };

  const viewTrackToggle = () => {
    setViewTrackModal(!viewTrackModal);
  };
 
  const viewLineToggle = () => {
    setViewLineModal(!viewLineModal);
  };
  console.log(viewLineToggle,viewTrackToggle);
  const tabs = [
    { id: '1', name: 'Product' },
    { id: '2', name: 'Quotation' },
    { id: '3', name: 'Carrier Tracking' },
    { id: '4', name: 'Attachment' },
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };
  //setting data in enquiryDetails
  const handleInputs = (e) => {
    setEnquiryDetails({ ...enquiryDetails, [e.target.name]: e.target.value });
  };

  const getCompany = () => {
    api.get('/company/getContact').then((res) => {
      setCompany(res.data.data);
    });
  };

  //getting data from setting by Id
  const getEnquiryById = () => {
    api
      .post('/enquiry/getEnquiryById', { enquiry_id: id })
      .then((res) => {
        setEnquiryDetails(res.data.data[0]);
      })
      .catch(() => {
        message('setting Data Not Found', 'info');
      });
  };
  //Update Setting
  const editEnquiryData = () => {
    enquiryDetails.modification_date = creationdatetime;
    enquiryDetails.modified_by = loggedInuser.first_name;
    enquiryDetails.modification_date = creationdatetime;
      api
        .post('/enquiry/editEnquiry', enquiryDetails)
        .then(() => {
          message('Record editted successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
   
  };

  const getLineItem = () => {
    api.post('/enquiry/getQuoteLineItemsById', { enquiry_id: id }).then((res) => {
      setLineItem(res.data.data);
      //setAddLineItemModal(true);
    });
  };

  const getTrackItem = () => {
    api.post('/tracking/getQuoteTrackItemsById', { enquiry_id: id }).then((res) => {
      setTrackItem(res.data.data);
      //setAddLineItemModal(true);
    });
  };


  const columns1 = [
    {
      name: '#',
    },
    {
      name: 'Product Code',
    },
    {
      name: 'Name',
    },
    {
      name: 'Category',
    },
    {
      name: 'Qty',
    },
    // {
    //   name: 'Unit Price',
    // },
    // {
    //   name: 'Amount',
    // },
    {
      name: 'Updated By ',
    },
    {
      name: 'Action ',
    },
  ];

  const columns2 = [
    {
      name: '#',
    },
    {
      name: 'Carrier Name',
    },
    {
      name: 'Container Number',
    },
    {
      name: 'Bill of Lading',
    },
    {
      name: 'Order Number',
    },
    {
      name: 'Estimated Time of Arrival',
    },
    {
      name: 'Estimated Time of Departure',
    },
    {
      name: 'Updated By ',
    },
    {
      name: 'Action ',
    },
  ];

  const deleteRecord = (deleteID) => {
    Swal.fire({
      title: `Are you sure? ${deleteID}`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api.post('/enquiry/deleteEditItem', { enq_prod_id: deleteID }).then(() => {
          Swal.fire('Deleted!', 'Your Line Items has been deleted.', 'success');
          window.location.reload();
        });
      }
    });
  };


  const deleteTrackRecord = (trackID) => {
    Swal.fire({
      title: `Are you sure? ${trackID}`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api.post('/tracking/deleteTrackEditItem', { carrier_tracking_id: trackID }).then(() => {
          Swal.fire('Deleted!', 'Your Line Items has been deleted.', 'success');
          window.location.reload();
        });
      }
    });
  };


  const [quote, setQuote] = useState([]);

    // Get Quote By Id
    const getQuote = () => {
      api.post('/enquiry/getQuoteById', { enquiry_id: id }).then((res) => {
        if (res.data.data && res.data.data.length > 0) {
          setQuote(res.data.data);
        }
      });
    };

    // const [track, settrack] = useState({});

    // // Get track By Id
    // const gettrack = () => {
    //   api.post('/tracking/getQuoteById', { enquiry_id: id }).then((res) => {
    //     if (res.data.data && res.data.data.length > 0) {
    //       settrack(res.data.data[0]);
    //     }
    //   });
    // };

    const [quoteForm, setQuoteForm] = useState({
      quote_date: '',
      quote_code: '',
    });
    const handleQuoteForms = (ele) => {
      setQuoteForm({ ...quoteForm, [ele.target.name]: ele.target.value });
    };

    const insertQuote = (code) => {
      const newQuoteId = quoteForm;
      newQuoteId.enquiry_id = id;
      newQuoteId.quote_code = code;
      newQuoteId.status = 'In Progress';
      newQuoteId.quote_date = new Date(); // Saves date in YYYY-MM-DD format


      api.post('/enquiry/insertquote', newQuoteId).then(() => {
        message('Quote inserted successfully.', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 300);
      });
    };
    //QUOTE GENERATED CODE
    const generateCode = () => {
      api
        .post('/commonApi/getCodeValues', { type: 'quote' })
        .then((res) => {
          insertQuote(res.data.data);
        })
        .catch(() => {
          insertQuote('');
        });
    };


    const updateOrder = (code) => {
      enquiryDetails.modification_date = creationdatetime;
      enquiryDetails.order_code = code;
        api
          .post('/enquiry/updateOrderCode', enquiryDetails)
          .then(() => {
            message('Updated successfully', 'success');
            setTimeout(() => {
              window.location.reload();
            }, 300);
          })
          .catch(() => {
            message('Unable to edit record.', 'error');
          });
     
    };
  
    const generateOrder = async () => {
      api
      .post('/commonApi/getCodeValue', { type: 'orders' })
      .then((res) => {
        updateOrder(res.data.data);
      })
      .catch(() => {
        updateOrder('');
      });
  };

    // const [productOwnerLinked, setproductOwnerLinked] = useState([]);
  
    // const getProductOwner = () => {
    //   api
    //     .get('/supplier/getProductOwner')
    //     .then((res) => {
    //       setproductOwnerLinked(res.data.data);
    //     })
    //     .catch(() => {
    //       message('Unable to get categories', 'error');
    //     });
    // };
  

  useEffect(() => {
    getEnquiryById();
    getLineItem();
    getTrackItem();
    getCompany();
    getQuote();
    // getProductOwner();

    // gettrack();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
     
      <Form>
        <FormGroup>
          <ToastContainer></ToastContainer>
          {/* Enquiry Button */}
          <ComponentCardV2>
            <Row>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editEnquiryData();
                    setTimeout(() => {
                      navigate('/Enquiry');
                    }, 1100);
                  }}
                >
                  Save
                </Button>
              </Col>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editEnquiryData();
                    applyChanges();
                  }}
                >
                  Apply
                </Button>
              </Col>
             
              <Col>
                <Button
                  className="shadow-none"
                  color="dark"
                  onClick={() => {
                    backToList();
                  }}
                >
                  Back to List
                </Button>
              </Col>
            </Row>
          </ComponentCardV2>
        </FormGroup>
      </Form>



      <Form>
        <FormGroup>
          <ToastContainer></ToastContainer>
          {/* Enquiry Button */}
          <ComponentCardV2>
            <Row>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                   generateOrder();
                    
                  }}
                  disabled={!!enquiryDetails && enquiryDetails.order_code}
                >
                 {enquiryDetails && enquiryDetails.order_code ? "Order Generated" : "Generate Order"}
               
                </Button>
              </Col>

            </Row>
          </ComponentCardV2>
        </FormGroup>
      </Form>
      {/* Enquiry Details */}
      <Form>
        <FormGroup>
          <ComponentCard title={<h4 className="mb-0">Enquiry Details</h4>} creationModificationDate={enquiryDetails}>
            {' '}
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>Enquiry Code</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={enquiryDetails && enquiryDetails.enquiry_code}
                    name="enquiry_code"
                    disabled

                  ></Input>
                </FormGroup>
              </Col>
              <Col md="4">
  <FormGroup>
    <Label>Enquiry Date</Label>
    <Input
      type="date"
      onChange={handleInputs}
      value={enquiryDetails && enquiryDetails.enquiry_date ? moment(enquiryDetails && enquiryDetails.enquiry_date).format("YYYY-MM-DD") : ""}
      name="enquiry_date"
    />
  </FormGroup>
</Col>

              <Col md="4">
                <FormGroup>
                  <Label>Title</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={enquiryDetails && enquiryDetails.title}
                    name="title"
                  />
                </FormGroup>
              </Col>
            <Col md="4">
                               <Label>
                                 Customer <span className="required"> *</span>{' '}
                               </Label>
                               <Input
                                 type="select"
                                 name="contact_id"
                               
                                 value={enquiryDetails && enquiryDetails.contact_id}
                                 onChange={handleInputs}
                                 
           
                               >
                                 <option value=''>Please Select</option>
                                 {company &&
                                   company.map((ele) => {
                                     return (
                                       <option key={ele.contact_id} value={ele.contact_id}>
                                         {ele.first_name}
                                       </option>
                                     );
                                   })}
                               </Input>
                          
                             </Col>
                               
                            
            
              <Col md="4">
                        <FormGroup>
                        <Label>Enquiry Type</Label>
                        <Input type="select" value={enquiryDetails && enquiryDetails.enquiry_type} name="enquiry_type" onChange={handleInputs}>
                          <option value="">Select Type</option>
                          <option value="Enquiry product for container">Enquiry product for container</option>
                          <option value="Enquiry and order for Retail products.">Enquiry and order for Retail products.</option>
                          <option value="General">General</option>

                        </Input>
                        </FormGroup>
                      </Col>

              <Col md="4">
                        <FormGroup>
                        <Label>Status</Label>
                        <Input type="select" value={enquiryDetails && enquiryDetails.status} name="status" onChange={handleInputs}>
                          <option value="">Select Status</option>
                          <option value="New">New</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Hold">Hold</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Win">Win</option>
                        </Input>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                <FormGroup>
                  <Label>Order Code</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={enquiryDetails && enquiryDetails.order_code}
                    name="order_code"
                    disabled

                  ></Input>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Shipping Address</Label>
                  <Input
                    type="textarea"
                    onChange={handleInputs}
                    value={enquiryDetails && enquiryDetails.shipping_address}
                    name="shipping_address"
                    disabled
                    rows="4"
                  ></Input>
                </FormGroup>
              </Col>

            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>

        <Tab toggle={toggle} tabs={tabs} />
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col md="6">
                <Button
                  className="shadow-none"
                  color="primary"
                  to=""
                  onClick={addQuoteItemsToggle.bind(null)}
                >
                  Add Items
                </Button>
              </Col>
            </Row>
            <br />
            <Row>
              <div className="container">
                <Table id="example" className="display border border-secondary rounded">
                  <thead>
                    <tr>
                      {columns1.map((cell) => {
                        return <td key={cell.name}>{cell.name}</td>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {lineItem &&
                      lineItem.map((e, index) => {
                        return (
                          <tr key={e.enquiry_id}>
                            <td>{index + 1}</td>
                             <td><Link to={`/ProductEdit/${e.product_id}`} className="text-primary">
                                                  {e.product_code}
                                              </Link></td>
                            <td data-label="Title">{e.product_title}</td>
                            <td data-label="Description">{e.category_title}</td>
                            <td data-label="Quantity">{e.quantity}</td>
                            {/* <td data-label="Unit Price">{e.unit_price}</td>
                            <td data-label="Amount">{e.amount}</td> */}
                            <td data-label="Updated By">
                                {e.modification_date
                                  ? `${e.modified_by} (Modified on ${e.modification_date})`
                                  : `${e.created_by} (Created on ${e.creation_date})`}
                              </td>

                            <td data-label="Actions">
                              <span
                                className="addline"
                                onClick={() => {
                                  setEditLineModelItem(e);
                                  setEditLineModal(true);
                                }}
                              >
                                <Icon.Edit2 />
                              </span>
                              <span
                                className="addline"
                                onClick={() => {
                                  deleteRecord(e.enq_prod_id);
                                }}
                              >
                                <Icon.Trash2 />
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            </Row>
            {/* End View Line Item Modal */}
            <EditLineItemModal
              editLineModal={editLineModal}
              setEditLineModal={setEditLineModal}
              FetchLineItemData={editLineModelItem}
              getLineItem={getLineItem}
              setViewLineModal={setViewLineModal}
            ></EditLineItemModal>
            {addLineItemModal && (
              <QuoteLineItem
                //projectInfo={tenderId}
                addLineItemModal={addLineItemModal}
                setAddLineItemModal={setAddLineItemModal}
                quoteLine={id}
              ></QuoteLineItem>
            )}
          </TabPane>
          <TabPane tabId="2">
            <TenderQuotation
              tenderId={id}
              quote={quote}
              generateCode={generateCode}
              setEditQuoteModal={setEditQuoteModal}
              editQuoteModal={editQuoteModal}

              viewLineToggle={viewLineToggle}
              getLineItem={getLineItem}
              setAddLineItemModal={setAddLineItemModal}
              addLineItemModal={addLineItemModal}
              lineItem={lineItem}
              setLineItem={setLineItem}
            
              viewLineModal={viewLineModal}
              setViewLineModal={setViewLineModal}
              id={id}
              handleQuoteForms={handleQuoteForms}
              getQuote={getQuote}
            ></TenderQuotation>
          
          </TabPane>

          <TabPane tabId="3">
            <Row>
              <Col md="6">
                <Button
                  className="shadow-none"
                  color="primary"
                  to=""
                  onClick={addTrackItemsToggle.bind(null)}
                >
                  Add Carrier Tracking
                </Button>
              </Col>
            </Row>
            <br />
            <Row>
              <div className="container">
                <Table id="example" className="display border border-secondary rounded">
                  <thead>
                    <tr>
                      {columns2.map((cell) => {
                        return <td key={cell.name}>{cell.name}</td>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {TrackItem &&
                      TrackItem.map((e, index) => {
                        return (
                          <tr key={e.carrier_tracking_id}>
                            <td>{index + 1}</td>
                            <td data-label="Carrier Name">{e.carrier_name}</td>
                            <td data-label="Container No">{e.container_no}</td>
                            <td data-label="Bill of Lading">{e.bill_of_loading}</td>
                            <td data-label="Order No">{e.order_no}</td>
                            <td data-label="ETA">{new Date(e.actual_delivery_date).toLocaleDateString()}</td>

<td data-label="ETD">{new Date(e.expected_delivery_date).toLocaleDateString()}</td>
<td data-label="Updated By">
  {e.modification_date
    ? `${e.modified_by} (Modified on ${e.modification_date.split('T')[0]})`
    : `${e.created_by} (Created on ${e.creation_date.split('T')[0]})`}
</td>

                            <td data-label="Actions">
                              <span
                                className="addline"
                                onClick={() => {
                                  setEditTrackModelItem(e);
                                  setEditTrackModal(true);
                                }}
                              >
                                <Icon.Edit2 />
                              </span>
                              <span
                                className="addline"
                                onClick={() => {
                                  deleteTrackRecord(e.carrier_tracking_id);
                                }}
                              >
                                <Icon.Trash2 />
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            </Row>
            {/* End View Line Item Modal */}
            <EditTrackItemModal
              editTrackModal={editTrackModal}
              setEditTrackModal={setEditTrackModal}
              FetchTrackItemData={editTrackModelItem}
              setViewTrackModal={setViewTrackModal}
            > {' '}</EditTrackItemModal>
            {addTrackItemModal && (
              <QuoteTrackItem
                //projectInfo={tenderId}
                addTrackItemModal={addTrackItemModal}
                setAddTrackItemModal={setAddTrackItemModal}
                quoteTrack={id}
              ></QuoteTrackItem>
            )}
          </TabPane>

          <TabPane tabId="4">
          <Form>
        <FormGroup>
          <ComponentCard title="Attachments">
            <Row>
              <Col xs="12" md="3" className="mb-3">
                <Button
                  color="primary"
                  onClick={() => {
                    dataForAttachment();
                    setAttachmentModal(true);
                  }}
                >
                  Add
                </Button>
              </Col>
            </Row>
            <AttachmentModalV2
              moduleId={id}
              roomName="Enquiry"
              altTagData="Enquiry Data"
              desc="Enquiry Data"
              modelType={attachmentData.modelType}
              attachmentModal={attachmentModal}
              setAttachmentModal={setAttachmentModal}
            />
            <ViewFileComponentV2 moduleId={id} roomName="Enquiry" />
          </ComponentCard>
        </FormGroup>
      </Form>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default EnquiryEdit;
