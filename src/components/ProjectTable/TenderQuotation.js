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
}) {
  TenderQuotation.propTypes = {
    lineItem: PropTypes.object,
 
    getLine: PropTypes.object,
    setEditQuoteModal: PropTypes.func,
    editQuoteModal: PropTypes.bool,
    quote: PropTypes.array,
    handleQuoteForms: PropTypes.func,
    generateCode: PropTypes.func,
    getQuote: PropTypes.func,
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
                      className="pointer"
                      onClick={() => {
                        setEditQuoteModal(true);
                        setQuoteData(item);
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
