import React, { useState } from 'react';
import { Table, Button } from 'reactstrap';
import * as Icon from 'react-feather';
import PropTypes from 'prop-types';
import moment from 'moment';
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
  handleDeleteQuote, // New prop for delete handler
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
    handleDeleteQuote: PropTypes.func, // PropTypes validation
  };

  const [selectedFormat, setSelectedFormat] = useState('format1');
  const [quoteDatas, setQuoteData] = useState([]);

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
                <tr >
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
                        if (window.confirm('Are you sure you want to delete this quote?')) {
                          handleDeleteQuote(item); // Call the delete handler
                        }
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
