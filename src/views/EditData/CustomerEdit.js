import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Button, Label, Input,TabContent, TabPane,Table } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import * as Icon from 'react-feather';
import Swal from 'sweetalert2';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCardV2 from '../../components/ComponentCardV2';
import message from '../../components/Message';
import api from '../../constants/api';
import Tab from '../../components/ProjectTabs/Tab';
import ComponentCard from '../../components/ComponentCard';
import creationdatetime from '../../constants/creationdatetime';
import EnquiriesLinkedTable from '../../components/SupplierModal/EnquiriesLinked';
import QuoteTrackItem from '../../components/ClientTable/QuoteTrackItem';
import EditTrackItemModal from '../../components/ClientTable/EditTrckitemModal';

import AttachmentPortalsTab from '../../components/EmployeeTable/AttachmentPortalsTab';

const ContentUpdate = () => {
  // All state variables
  const [contentDetails, setContentDetails] = useState();
  const [activeTab, setActiveTab] = useState('1');
  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [pictureData, setDataForPicture] = useState({
    modelType: '',
  });
  const tabs = [
    { id: '1', name: 'Shipping' },
    { id: '2', name: 'Enquiries Linked' },
    { id: '4', name: 'Attachments' }
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };
  //Setting data in contentDetails
  const handleInputs = (e) => {
    setContentDetails({ ...contentDetails, [e.target.name]: e.target.value });
  };
  //setting data in Description Modal contentDetails

  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };

  //Pictures
  const dataForPicture = () => {
    setDataForPicture({
      modelType: 'picture',
    });
  };
  // Get content data By content id
  const getContentById = () => {
    api
      .post('/contact/getContactsById', { contact_id: id })
      .then((res) => {
        setContentDetails(res.data.data[0]);
      })
      .catch(() => {
        message('Content Data Not Found', 'info');
      });
  };
  //Edit Content
  const editContentData = () => {
    contentDetails.modification_date = creationdatetime;
    console.log(contentDetails);
    if (
      contentDetails.content_title !== '' &&
      contentDetails.sub_category_id !== '' &&
      contentDetails.published !== ''
    ) {
      api
        .post('/contact/editContact', contentDetails)
        .then(() => {
          message('Record edited successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  // getting data from Category
 

  useEffect(() => {
    getContentById();
  }, [id]);
  
      const [editTrackModelItem, setEditTrackModelItem] = useState(null);
      const [editTrackModal, setEditTrackModal] = useState(false);
      const [addTrackItemModal, setAddTrackItemModal] = useState(false);
        const [TrackItem, setTrackItem] = useState();
        const [viewTrackModal, setViewTrackModal] = useState(false);
            const [track, settrack] = useState({});
        

  const addTrackItemsToggle = () => {
    setAddTrackItemModal(!addTrackItemModal);
  };

  const viewTrackToggle = () => {
    setViewTrackModal(!viewTrackModal);
  };
  console.log(viewTrackToggle);

  const getTrackItem = () => {
    api.post('/address/getQuoteTrackItemsById', { contact_id: id }).then((res) => {
      setTrackItem(res.data.data);
      //setAddLineItemModal(true);
    });
  };

  useEffect(() => {
    getContentById();
    getTrackItem();
  }, [id]);
  


  const columns2 = [
    {
      name: '#',
    },
    {
      name: 'Shipper Name',
    },
    {
      name: 'Address 1',
    },
    {
      name: 'Address 2',
    },
    {
      name: 'State',
    },
    {
      name: 'Town',
    },
    {
      name: 'Country',
    },
    {
      name: 'Pin Code',
    },
    {
      name: 'Action ',
    },
  ];
   // Get track By Id
   const gettrack = () => {
    api.post('/address/getQuoteById', { contact_id: id }).then((res) => {
      if (res.data.data && res.data.data.length > 0) {
        settrack(res.data.data[0]);
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
        api.post('/address/deleteTrackEditItem', { customer_address_id: trackID }).then(() => {
          Swal.fire('Deleted!', 'Your Line Items has been deleted.', 'success');
          window.location.reload();
        });
      }
    });
  };


  return (
    <>
      <BreadCrumbs heading={contentDetails && contentDetails.title} />
      <Form>
        <FormGroup>
          <ComponentCardV2>
            <Row>
              <Col>
                <Button
                  color="primary"
                  onClick={() => {
                    editContentData();
                    setTimeout(() => {
                      navigate('/Customer');
                    }, 1100);
                  }}
                >
                  Save
                </Button>
              </Col>
              <Col>
                <Button
                  color="primary"
                  onClick={() => {
                    editContentData();
                  }}
                >
                  Apply
                </Button>
              </Col>
              <Col>
                <Button
                  color="dark"
                  onClick={() => {
                    navigate('/Customer');
                    console.log('back to list');
                  }}
                >
                  Back to List
                </Button>
              </Col>
            </Row>
          </ComponentCardV2>
          {/* Content Details Form */}
          <ComponentCard title="Customer details" creationModificationDate={contentDetails}>
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Contact Id </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={contentDetails && contentDetails.contact_id}
                    name="contact_id"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label>Name</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={contentDetails && contentDetails.first_name}
                    name="first_name"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  {/* Category title from Category table */}
                  <Label>Mobile</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={contentDetails && contentDetails.mobile}
                    name="mobile"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  {/* Category title from Category table */}
                  <Label>Email</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={contentDetails && contentDetails.email}
                    name="email"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  {/* Category title from Category table */}
                  <Label>Password</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={contentDetails && contentDetails.pass_word}
                    name="pass_word"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label>Address</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={contentDetails && contentDetails.address1}
                    name="address1"
                  />
                </FormGroup>
              </Col>
             
            </Row>
          </ComponentCard>
          </FormGroup>
      </Form>
      <ComponentCard title="More Details">
        <Tab toggle={toggle} tabs={tabs} />
        <TabContent className="p-4" activeTab={activeTab}>
        <TabPane tabId="1">
            <Row>
              <Col md="6">
                <Button
                  className="shadow-none"
                  color="primary"
                  to=""
                  onClick={addTrackItemsToggle.bind(null)}
                >
                  Add Shipper Address
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
                          <tr key={e.customer_address_id}>
                            <td>{index + 1}</td>
                            <td>{e.shipper_name}</td>
                            <td>{e.address_flat}</td>
                            <td>{e.address_street}</td>
                            <td>{e.address_state}</td>
                            <td>{e.address_town}</td>
<td >{e.address_country}</td>
<td>{e.address_po_code}</td>

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
                                  deleteTrackRecord(e.customer_address_id);
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
              getTrackItem={getTrackItem}
              setViewTrackModal={setViewTrackModal}
              quoteTrack={id}
              gettrack={gettrack}
              track={track}
            ></EditTrackItemModal>
            {addTrackItemModal && (
              <QuoteTrackItem
                //projectInfo={tenderId}
                addTrackItemModal={addTrackItemModal}
                setAddTrackItemModal={setAddTrackItemModal}
                quoteTrack={id}
              ></QuoteTrackItem>
            )}
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <EnquiriesLinkedTable
                  id={id}

              />
            </Row>
          </TabPane>

          <TabPane tabId="4">
            {/* Picture and Attachments Form */}
            <Row>
              <AttachmentPortalsTab
                dataForPicture={dataForPicture}
                dataForAttachment={dataForAttachment}
                id={id}
                attachmentModal={attachmentModal}
                setAttachmentModal={setAttachmentModal}
                pictureData={pictureData}
                attachmentData={attachmentData}
              />
            </Row>
          </TabPane>
         
        </TabContent>
      </ComponentCard>
    </>
  );
};
export default ContentUpdate;
