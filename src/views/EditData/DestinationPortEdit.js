import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import DestinationPortButton from '../../components/DestinationPortTable/DestinationPortButton';
import DestinationPortEditDetails from '../../components/DestinationPortTable/DestinationPortEditDetails';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';

const DestinationPortEdit = () => {
  // All state variables
  const [destinationporteditdetails, setDestinationPortEditDetails] = useState();
  const [destinationportname, setDestinationPortName] = useState();

  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

  //All Functions/Methods
  //Setting Data in ValueList Details
  const handleInputs = (e) => {
    setDestinationPortEditDetails({ ...destinationporteditdetails, [e.target.name]: e.target.value });
  };

  // Route Change
  const applyChanges = () => {};
  const saveChanges = () => {
    if (destinationporteditdetails.key_text !== '' && destinationporteditdetails.value !== '') {
      navigate('/DestinationPort');
    }
    window.location.reload();
  };
  const backToList = () => {
    navigate('/DestinationPort');
  };

  //Api call for getting ValueList By Id
  const getValueListById = () => {
    api
      .post('/destinationPort/getDestinationPortById', { destination_port_id: id })
      .then((res) => {
        setDestinationPortEditDetails(res.data.data[0]);
      })
      .catch(() => {
        message('DestinationPort Data Not Found', 'info');
      });
  };

  //Api call for  getting ValueList
  const getValueListName = () => {
    api
      .get('/destinationPort/getAllCountries')
      .then((res) => {
        setDestinationPortName(res.data.data);
      })
      .catch(() => {
        message('ValueList Data Not Found', 'info');
      });
  };

  //Api call for  Editting ValueList
  const editValueListData = () => {
    if (destinationporteditdetails.key_text !== '' && destinationporteditdetails.value !== '') {
      destinationporteditdetails.modification_date = creationdatetime;
      api
        .post('/destinationPort/editDestinationPort', destinationporteditdetails)
        .then(() => {
          message('Record editted successfully', 'success');
          getValueListById();
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  //Api call for  Deletting ValueList
  const deleteValueListData = () => {
    api
      .post('/destinationPort/deleteDestinationPort', { destination_port_id: id })
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  useEffect(() => {
    getValueListName();
    getValueListById();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>

      {/* ValueList Button Details */}
      <DestinationPortButton
        saveChanges={saveChanges}
        applyChanges={applyChanges}
        backToList={backToList}
        editDestinationPortData={editValueListData}
        deleteValueListData={deleteValueListData}
        navigate={navigate}
        id={id}
      ></DestinationPortButton>

      {/* ValueList Edit Details */}
      <DestinationPortEditDetails
        destinationporteditdetails={destinationporteditdetails}
        handleInputs={handleInputs}
        destinationportname={destinationportname}
        id={id}
      ></DestinationPortEditDetails>
    </>
  );
};
export default DestinationPortEdit;
