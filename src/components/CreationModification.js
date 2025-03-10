import React from 'react';
import { CardTitle, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

export default function CreationModification({ details = null, title }) {
  CreationModification.propTypes = {
    details: PropTypes.object,
    title: PropTypes.string,
  };

  return (
    <CardTitle tag="h5" className="border-bottom px-4 py-3 mb-0">
      <Row>
        <Col>
          <small className="text-muted">{title}</small>
        </Col>
        {details && (
          <Col>
            <Row>
              <small className="text-muted">Modification Date: {details.modification_date}  {details.modified_by}</small>
            </Row>
            <Row className="d-flex">
              <small className="text-muted">Creation Date: {details.creation_date}  {details.created_by}</small>
            </Row>
          </Col>
        )}
      </Row>
    </CardTitle>
  );
}
