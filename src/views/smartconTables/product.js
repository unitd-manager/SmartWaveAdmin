import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button, Input } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import Publish from '../../components/Publish';
//import SortOrder from '../../components/SortOrder';

const SectionDetails = () => {
  // State Variables
  const [section, setSection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState('');
  
  // Get Parameter from URL
  const { id } = useParams();

  // Fetch Section Data
  const getSection = () => {
    setLoading(true);
    api
      .get('/product/getProductAdmin')
      .then((res) => {
        setSection(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getSection();
  }, [id]);

  // Filtered Data based on search input
  const filteredData = section.filter(item =>
    (item.title?.toLowerCase().includes(filterText.toLowerCase()) || '') ||
    (item.category_title?.toLowerCase().includes(filterText.toLowerCase()) || '')
  );
  

  // Table Columns
  const columns = [
    {
      name: '#',
      selector: (row, index) => index + 1,
      width: '4%',
      sortable: true,
    },
    {
      name: 'Edit',
      cell: (row) => (
        <Link to={`/ProductEdit/${row.product_id}`}>
          <Icon.Edit2 />
        </Link>
      ),
      width: 'auto',
      button: true,
    },
    {
      name: 'Product Code',
      selector: row => row.product_code,
      sortable: true,
      cell: row => (
        <Link to={`/InventoryEdit/${row.inventory_id}`}>
          {row.product_code}
        </Link>
      ),
    },
    {
      name: 'Title',
      selector: row => row.title,
      sortable: true,
    },
    {
      name: 'Unit',
      selector: row => row.unit,
      sortable: true,
    },
    {
      name: 'Category',
      selector: row => row.category_title,
      sortable: true,
    },
    {
      name: 'Published',
      selector: row => row.published,
      sortable: true,
      cell: row => (
        <Publish
          idColumn="product_id"
          tablename="product"
          idValue={row.product_id.toString()}
          value={row.published}
        />
      ),
    },
   
  ];

  return (
    <div className="MainDiv">
      <div className="pt-xs-25">
        <BreadCrumbs />
        
        {/* Search Input */}
        <div className="mb-3 d-flex justify-content-between">
          <Input
            type="text"
            placeholder="Search by Title.."
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
            className="w-25"
          />
          <Link to="/ProductDetails">
            <Button color="primary" className="shadow-none">
              Add New
            </Button>
          </Link>
        </div>

        {/* Data Table */}
        <DataTable
          title="Product List"
          columns={columns}
          data={filteredData}
          progressPending={loading}
          pagination
          highlightOnHover
          responsive
        />
      </div>
    </div>
  );
};

export default SectionDetails;
