import React, { useState } from 'react';
import { Table, Button } from 'reactstrap';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types';
import moment from 'moment';
import Swal from 'sweetalert2';
import api from '../../constants/api';
import EditQuoteModal from './EditQuoteModal';

export default function TenderQuotation({
  quote,
  lineItem,
  setEditQuoteModal,
  editQuoteModal,
  handleQuoteForms,
  generateCode,
  getLine,
  getQuote,
}) {
  TenderQuotation.propTypes = {
    quote: PropTypes.array,
    lineItem: PropTypes.object,
    setEditQuoteModal: PropTypes.func,
    editQuoteModal: PropTypes.bool,
    handleQuoteForms: PropTypes.func,
    generateCode: PropTypes.func,
    getLine: PropTypes.object,
    getQuote: PropTypes.func,
  };

  const [selectedFormat, setSelectedFormat] = useState('format1');
  const [quoteDatas, setQuoteData] = useState([]);

  const deleteSupplierData = (id) => {
    Swal.fire({
      title: `Are you sure? `,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .post('/enquiry/deleteQuoteEnq', { enq_quote_id: id })
          .then(() => {
            Swal.fire('Deleted!', 'Your Quote has been deleted.', 'success');
            window.location.reload();
          });
      }
    });
  };

  return (
    <div>
      <Button
        color="primary"
        className="mb-3"
        onClick={(ele) => {
          if (window.confirm('Do you Like to Add Quote?')) {
            handleQuoteForms(ele);
            generateCode(ele);
            setSelectedFormat('format1');
          }
        }}
      >
        Add Quote
      </Button>

      {quote.length > 0 ? (
        <Table bordered>
          <thead>
            <tr>
              <th>Quote Code</th>
              <th>Quote Date</th>
              <th>Quote Status</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(quote) && quote.length > 0 ? (
              quote.map((item) => (
                <tr key={item.enq_quote_id}> {/* Add a key for each row */}
                  <td>{item.quote_code || 'N/A'}</td>
                  <td>{item.quote_date ? moment(item.quote_date, 'YYYY-MM-DD').format('DD/MM/YY') : 'N/A'}</td>
                  <td>{item.status || 'N/A'}</td>
                  <td>{item.price || 'N/A'}</td>
                  <td>
                    <Icon.Edit
                      className="pointer me-2"
                      onClick={() => {
                        setEditQuoteModal(true);
                        setQuoteData(item);
                      }}
                    />
                    <Icon.Trash
                      className="pointer text-danger"
                      onClick={() => {
                        deleteSupplierData(item.enq_quote_id); // Corrected line
                      }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No quotes available.</td>
              </tr>
            )}
          </tbody>
        </Table>
      ) : (
        <p>No quotes available.</p>
      )}

      {editQuoteModal && (
        <EditQuoteModal
          lineItem={lineItem}
          getLine={getLine}
          editQuoteModal={editQuoteModal}
          setEditQuoteModal={setEditQuoteModal}
          quoteDatas={quoteDatas}
          getQuoteFun={getQuote}
          selectedFormat={selectedFormat}
          setSelectedFormat={setSelectedFormat}
        />
      )}
    </div>
  );
}