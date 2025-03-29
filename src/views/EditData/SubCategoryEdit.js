import React, { useEffect, useState, useContext } from 'react';
import { Input, Row, Col, Button, TabPane, TabContent, FormGroup, Label, Modal, ModalFooter, ModalHeader, ModalBody, Table} from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import * as Icon from 'react-feather';
import Swal from 'sweetalert2';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import SubCategoryButton from '../../components/SubCategoryTable/SubCategoryButton';
import SubCategoryEditDetails from '../../components/SubCategoryTable/SubCategoryEditDetails';
import SubCategoryPageMetaData from '../../components/SubCategoryTable/SubCategoryPageMetaData';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import Tab from '../../components/ProjectTable/Tab';
import SubCategoryTypeDetails from '../../components/SubCategoryTable/SubCategoryTypeDetails';
import AppContext from '../../context/AppContext';

const SubCategoryEdit = () => {// All state variables
  const [category, setCategory] = useState();
  const [subcategoryeditdetails, setSubCategoryEditDetails] = useState();
  const [subcategorytypedetails, setSubCategoryTypetDetails] = useState();
  const [activeTab, setActiveTab] = useState('1');
  const [subcategorytype, setSubCategoryType] = useState();
  const [modal, setModal] = useState(false);
  const [addtype, setaddType] = useState(false);
  const [lineItem, setLineItem] = useState();
  const { loggedInuser } = useContext(AppContext);
  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();
  const [tenderForms, setTenderForms] = useState({
    type_title: '',
    sub_category_type_id: '',
    sub_category_id: id,
  });
  const [companyInsertData, setCompanyInsertData] = useState({
    type_title: '',
    sub_category_type_id: '',
    sub_category_id: id,
  });
  const [addFormSubmitted, setAddFormSubmitted] = useState(false);

  const handleInputsCompanyInsertData = (e) => {
    setCompanyInsertData({ ...companyInsertData, [e.target.name]: e.target.value });
  };


  const toggletype = () => {
    setModal(!modal);
  };

  const togglemodal = () => {
    setaddType(!addtype);
  };

  const handleInputsTenderForms = (e) => {
    setTenderForms({ ...tenderForms, [e.target.name]: e.target.value });
  };
  const tabs = [
    { id: '1', name: 'SubCategory Type' },
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };

  //All Functions/Methods

  //Setting Data in SubCategory Edit Details
  const handleInputs = (e) => {
    setSubCategoryEditDetails({ ...subcategoryeditdetails, [e.target.name]: e.target.value });
  };

  // Route Change
  const applyChanges = () => {};
  const saveChanges = () => {
    if (subcategoryeditdetails.sub_category_title !== '') {
      navigate('/SubCategory');
    }
    window.location.reload();
  };
  const backToList = () => {
    navigate('/SubCategory');
  };

  //Api call for Category Dropdown data
  const getCategory = () => {
    api
      .get('/subcategory/getCategory')
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch(() => {
        message('SubCategory Data Not Found', 'info');
      });
  };

  //Api call for Editting SubCategory By Id
  const editSubCategoryById = () => {
    api
      .post('/subcategory/getSubCategoryById', { sub_category_id: id })
      .then((res) => {
        const resObj = res.data.data[0];
        if (!resObj.sub_category_type) {
          resObj.sub_category_type = 'Content';
        }
        setSubCategoryEditDetails(resObj);
      })
      .catch(() => {
        message('SubCategory Data Not Found', 'info');
      });
  };

  //Api call for getting Staff Type From Valuelist
  const getSubCategoryType = () => {
    api
      .get('/subcategory/getSubCategoryTypeFromValueList')
      .then((res) => {
        setSubCategoryTypetDetails(res.data.data);
      })
      .catch(() => {
        message('SubCategory Type Data Not Found', 'info');
      });
  };

  //Api call for Editing SubCategory Details
  const editSubCategoryData = () => {
    subcategoryeditdetails.modification_date = moment().format('DD-MM-YYYY');
    if (subcategoryeditdetails.sub_category_title !== '') {
      subcategoryeditdetails.modification_date = creationdatetime;
      api
        .post('/subcategory/editSubCategory', subcategoryeditdetails)
        .then(() => {
          message('Record editted successfully', 'success');
          editSubCategoryById();
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  const getLineItem = () => {
      api.post('/subcategory/getSubCategoryTypeById', { sub_category_id: id }).then((res) => {
        setLineItem(res.data.data);
        //setAddLineItemModal(true);
      });
    };

  //Api call for Deleting SubCategory Details
  const deleteSubCategoryData = () => {
    api
      .post('/subcategory/deleteSubCategory', { sub_category_id: id })
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  const getSubCategoryTypeDropdown = () => {
    api.get('/subcategory/getSubCategoryTypeDropdown').then((res) => {
      setSubCategoryType(res.data.data);
      // if (res.data.data && res.data.data.length > 0) {
      //   // Assuming the newly added company is at the end of the list
      //   const newlyAddedCompanyId = res.data.data[res.data.data.length - 1].company_id;
      //   setTenderForms({ ...tenderForms, company_id: newlyAddedCompanyId }); // Set the last company as selected
      // }
    });
  };
  const insertSubCategoryType = () => {
    if (companyInsertData.type_title.trim() !== '')
    {
      companyInsertData.creation_date = creationdatetime
    companyInsertData.created_by = loggedInuser.first_name;
 
      // // Check if the entered company name already exists in the company list
      // const isCompanyExists =
      //   company && company.some((comp) => comp.company_name === companyInsertData.company_name ||
      //                                    comp.company_name_arb === companyInsertData.company_name_arb);


      // if (isCompanyExists) {
      //   message('Company already exists.', 'error');
      // } else {
        api
          .post('/subcategory/insertSubCategoryType', companyInsertData)
          .then((res) => {
            message('Company inserted successfully.', 'success');
            
            console.log('rescomp', res.data.data);
            const newlyAddedCompanyId = res.data.data.insertId;
            setTenderForms({ ...tenderForms, sub_category_type_id : newlyAddedCompanyId });
            setTenderForms({ ...tenderForms, sub_category_type_id : res.data.data.insertId }); // Set selected company ID after insertion
            toggle();
            togglemodal();

            //window.location.reload();
          })
          .catch(() => {
            message('Network connection error.', 'error');
          });
      }
      setAddFormSubmitted(true);
    // } else {
    //   setAddFormSubmitted(true);
    //   message('Please fill all required fields.', 'warning');
    // }
  };

  const columns = [
    {
      name: 'S.No',
    },
    {
      name: 'SubCategory Type',
    },
    {
      name: 'Updated By ',
    },
    {
      name: 'Action ',
    },
  ];

  const deleteSubCategoryTypeRecord = (deleteID) => {
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
          api.post('/subcategory/deleteSubCategoryType', { sub_category_type_id: deleteID }).then(() => {
            Swal.fire('Deleted!', 'Your Subcategory type has been deleted.', 'success');
            window.location.reload();
          });
        }
      });
    };

  useEffect(() => {
    editSubCategoryById();
    getCategory();
    getSubCategoryType();
    getSubCategoryTypeDropdown();
    getLineItem();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      <ToastContainer />
      {/* SubCategory Button Details */}
      <SubCategoryButton
        saveChanges={saveChanges}
        applyChanges={applyChanges}
        backToList={backToList}
        editSubCategoryData={editSubCategoryData}
        deleteSubCategoryData={deleteSubCategoryData}
        navigate={navigate}
        id={id}
      ></SubCategoryButton>

      {/* Sub Category  Details */}
      <BreadCrumbs />
      <SubCategoryEditDetails
        subcategoryeditdetails={subcategoryeditdetails}
        handleInputs={handleInputs}
        category={category}
        subcategorytypedetails={subcategorytypedetails}
        addFormSubmitted={addFormSubmitted}
      ></SubCategoryEditDetails>

      {/* Page Meta Data Details */}
      <SubCategoryPageMetaData
        subcategoryeditdetails={subcategoryeditdetails}
        handleInputs={handleInputs}
      ></SubCategoryPageMetaData>

            <ComponentCard title="More Details">
              <ToastContainer></ToastContainer>
      
              <Tab toggle={toggle} tabs={tabs} />
              <TabContent className="p-4" activeTab={activeTab}>
                <TabPane tabId="1">
                <Col md="3" className="addNew">
                    <Button color="primary" className="shadow-none" onClick={togglemodal.bind(null)}>
                        Add New
                    </Button>
                  </Col>
                  <Modal size="lg" isOpen={addtype} toggle={togglemodal.bind(null)}>
                  <ModalHeader toggle={togglemodal.bind(null)}>SubCategory type</ModalHeader>
                  <ModalBody>
                <Row>
                <Col md="9">
                <FormGroup>
                  <Label>SubCategory Type</Label>
                  <span className="required">  *</span>
                  <Input
                    type="select"
                    onChange={(e) => {
                      setTenderForms({ ...tenderForms, type_title: e.target.value });
                      handleInputsTenderForms(e);
                    }}
                    //className={inputClass}
                    value={tenderForms && tenderForms.type_title}
                    name="type_title"
                  >
                    <option value="selected">Please Select</option>
                    {subcategorytype &&
                      subcategorytype.map((e) => {
                        return (
                          <option key={e.type_title} value={e.type_title}>
                            
                            {e.type_title}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
              
                  
                  <Col md="3" className="addNew">
                    <Button color="primary" className="shadow-none" onClick={toggletype.bind(null)}>
                        Add New
                    </Button>
                  </Col>

                  <ModalFooter>
          <Button
            color="primary"
            className="btn mr-2 shadow-none"
            onClick={() => {
              insertSubCategoryType();
            }}
          >
            Save & Continue
          </Button>
          <Button color="secondary" className="shadow-none" onClick={togglemodal.bind(null)}>
            Cancel
          </Button>
        </ModalFooter>
                  <SubCategoryTypeDetails
                insertCompany={insertSubCategoryType}
                handleInputs={handleInputsCompanyInsertData}
                toggle={toggletype}
                modal={modal}
                setModal={setModal}
                companyInsertData={companyInsertData}
                tenderForms={tenderForms}
              ></SubCategoryTypeDetails>
              
                </Row>
                </ModalBody>
                </Modal>
                <br />
            <Row>
              <div className="container">
                <Table id="example" className="display border border-secondary rounded">
                  <thead>
                    <tr>
                      {columns.map((cell) => {
                        return <td key={cell.name}>{cell.name}</td>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {lineItem &&
                      lineItem.map((e, index) => {
                        return (
                          <tr key={e.sub_category_id}>
                            <td>{index + 1}</td>
                            <td data-label="SubCategory Type">{e.type_title}</td>
                            <td data-label="Updated By">
                                {e.modification_date
                                  ? `${e.modified_by} (Modified on ${e.modification_date})`
                                  : `${e.created_by} (Created on ${e.creation_date})`}
                              </td>

                            <td data-label="Actions">
                              <span
                                className="addline"
                                onClick={() => {
                                  deleteSubCategoryTypeRecord(e.sub_category_type_id );
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
                </TabPane>
            </TabContent>
            </ComponentCard>


      </>
      
  );
};

export default SubCategoryEdit;
