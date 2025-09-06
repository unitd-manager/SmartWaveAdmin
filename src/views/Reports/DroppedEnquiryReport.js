import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import moment from 'moment';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { ToastContainer } from 'react-toastify';
import { Button, Card, CardBody, Col, FormGroup, Input, Label, Row, Table } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import api from '../../constants/api';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ExportReport from '../../components/Report/ExportReport';

const OverAllReport = () => {
  //All state variable
  const [salesReport, setSalesReport] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // const [companyName, setCompanyName] = useState('');
  // const [company, setCompany] = useState();
  const [userSearchData, setUserSearchData] = useState([]);

  //Get data from Training table
  const getProject = () => {
    api
      .get('/enquiry/getDroppedEnquiryReport')
      .then((res) => {
        setSalesReport(res.data.data);
        setUserSearchData(res.data.data);
      })
      .catch(() => {
        message('Over all sales Data Not Found', 'info');
      });
  };

  // const getCompany = () => {
  //   api.get('/company/getCompany').then((res) => {
  //     setCompany(res.data.data);
  //   });
  // };

  const handleSearch = () => {
    let newData = [...salesReport];
    // Filter by status
   
    // Filter by start and end date
    if (startDate && endDate) {
      newData = newData.filter((x) => {
        const enquiryDate = moment(x.enquiry_date).format('YYYY-MM-DD');
        return enquiryDate >= startDate && enquiryDate <= endDate;
      });
    } else if (startDate) {
      newData = newData.filter((x) => moment(x.enquiry_date).format('YYYY-MM-DD') === startDate);
    } else if (endDate) {
      newData = newData.filter((x) => moment(x.enquiry_date).format('YYYY-MM-DD') === endDate);
    }
    setUserSearchData(newData);
  };

  useEffect(() => {
    getProject();
   // getCompany();
  }, []);
  const [page, setPage] = useState(0);

  const employeesPerPage = 20;
  const numberOfEmployeesVistited = page * employeesPerPage;
  const displayEmployees = Array.isArray(userSearchData) ? userSearchData.slice(
    numberOfEmployeesVistited,
    numberOfEmployeesVistited + employeesPerPage,
  ) : [];
  const totalPages = Array.isArray(userSearchData) ? Math.ceil(userSearchData.length / employeesPerPage) : 0;
  const changePage = ({ selected }) => {
    setPage(selected);
  };

  //structure of Training list view
  const columns = [
    {
      name: 'SN',
      selector: 's_no',
    },

    {
      name: 'Code',
      selector: 'enquiry_code',
    },
    {
      name: 'Date',
      selector: 'enquiry_date',
    },
    {
      name: 'Title',
      selector: 'title',
    },
    {
      name: 'Name',
      selector: 'first_name',
    },
    {
      name: 'Reason',
      selector: 'comments',
    },
  ];
  return (
    <>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Card>
        <CardBody>
          <Row>
            <Col>
              <FormGroup>
                <Label>Start Date</Label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>End Date</Label>
                <Input type="date" name="endDate" onChange={(e) => setEndDate(e.target.value)} />
              </FormGroup>
            </Col>
            {/* <Col>
              <FormGroup>
                <Label>Select Company Name</Label>
                <Input
                  type="select"
                  name="company_id"
                  onChange={(e) => setCompanyName(e.target.value)}
                >
                  <option value="">Please Select</option>
                  {company &&
                    company.map((ele) => {
                      return (
                        <option key={ele.company_id} value={ele.company_name}>
                          {ele.company_name}
                        </option>
                      );
                    })}
                </Input>
              </FormGroup>
            </Col> */}
            <Col md="1">
              <Button color="primary" className="shadow-none" onClick={() => handleSearch()}>Go</Button>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Row>
            {/* <Col md="3">
              <Label>
                <b>Company:</b> {companyName}
              </Label>
            </Col> */}
            <Col md="3">
              <Label>
                <b>Start Date:</b> {startDate}
              </Label>
            </Col>
            <Col md="3">
              <Label>
                <b> End Date:</b> {endDate}
              </Label>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Row>
            <Col>
              <ExportReport columns={columns} data={userSearchData} />
            </Col>
          </Row>
        </CardBody>

        <CardBody>
          <Table>
            <thead>
              <tr>
                {columns.map((cell) => {
                  return <td key={cell.name}>{cell.name}</td>;
                })}
              </tr>
            </thead>
            <tbody>
              {displayEmployees &&
                displayEmployees.map((element, index) => {
                  return (
                    <tr key={element.enquiry_id}>
                      <td>{index + 1}</td>
                      <td>{element.enquiry_code}</td>
                      <td>{moment(element.enquiry_date).format('DD-MM-YYYY')}</td>
                      <td>{element.title}</td>
                      <td>{element.first_name}</td>
                      <td>{element.comments}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageCount={totalPages}
            onPageChange={changePage}
            containerClassName="navigationButtons"
            previousLinkClassName="previousButton"
            nextLinkClassName="nextButton"
            disabledClassName="navigationDisabled"
            activeClassName="navigationActive"
          />
        </CardBody>
      </Card>
    </>
  );
};
export default OverAllReport;
