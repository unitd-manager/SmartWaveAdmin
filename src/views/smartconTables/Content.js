import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import message from '../../components/Message';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import Publish from '../../components/Publish';
import SortOrder from '../../components/SortOrder';

const Content = () => {
  const [content, setContent] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredContent, setFilteredContent] = useState([]);

  

  const getContent = () => {
    api.get('/content/getContent')
      .then((res) => {
        setContent(res.data.data);
        setFilteredContent(res.data.data);
      })
      .catch(() => {
        message('Cannot get Content Data', 'error');
      });
  };
  useEffect(() => {
    getContent();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
  
    const filteredData = content.filter(item =>
      (item.title || '').toLowerCase().includes(value) ||
      (item.content_type || '').toLowerCase().includes(value) ||
      (item.section_title || '').toLowerCase().includes(value) ||
      (item.category_title || '').toLowerCase().includes(value)
    );
  
    setFilteredContent(filteredData);
  };
  

  const columns = [
    {
      name: '#',
      selector: (row, index) => index + 1,
      width: '5%',
    },
    {
      name: 'Edit',
      cell: (row) => (
        <Link to={`/ContentEdit/${row.content_id}`}>
          <Icon.Edit2 />
        </Link>
      ),
      width: '7%',
    },
    {
      name: 'Title',
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: 'Order',
      cell: (row) => (
        <SortOrder
          idValue={row.content_id}
          idColumn="content_id"
          tablename="content"
          value={row.sort_order}
        />
      ),
      sortable: true,
    },
    {
      name: 'Section',
      selector: (row) => row.section_title,
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row) => row.category_title,
      sortable: true,
    },
    {
      name: 'Sub Category',
      selector: (row) => row.sub_category_title,
      sortable: true,
    },
    {
      name: 'Content Date',
      selector: (row) => moment(row.content_date).format('YYYY-MM-DD'),
      sortable: true,
    },
    {
      name: 'Content Type',
      selector: (row) => row.content_type,
      sortable: true,
    },
    {
      name: 'ID',
      selector: (row) => row.content_id,
      sortable: true,
    },
    {
      name: 'Published',
      cell: (row) => (
        <Publish
          idColumn="content_id"
          tablename="content"
          idValue={row.content_id.toString()}
          value={row.published}
        />
      ),
      sortable: true,
    },
  ];

  return (
    <div className="MainDiv pt-xs-25">
      <BreadCrumbs />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Content List</h4>
        <Link to="/ContentDetails">
          <Button color="primary" className="shadow-none">
            Add New
          </Button>
        </Link>
      </div>
      <Input
        type="text"
        placeholder="Search Content..."
        value={searchText}
        onChange={handleSearch}
        className="mb-3"
        style={{ maxWidth: '250px' }}

      />
      <DataTable
        columns={columns}
        data={filteredContent}
        pagination
        highlightOnHover
        responsive
        striped
      />
    </div>
  );
};

export default Content;