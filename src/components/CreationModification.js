import React from 'react';
import { CardTitle, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

export default function CreationModification({ details = null, title }) {
  CreationModification.propTypes = {
    details: PropTypes.object,
    title: PropTypes.string,
  };

  return (
    <CardTitle className="border-bottom px-4 py-3 mb-0">
      <Row>
        <Col>
          <small className="text-muted">{title}</small>
        </Col>
        {details && (
          <Col>
            <Row>
              <small className="text-muted">Modification Date: {details.modified_by} {details.modification_date}  </small>
            </Row>
            <Row className="d-flex">
              <small className="text-muted">Creation Date:  {details.created_by} {details.creation_date} </small>
            </Row>
          </Col>
        )}
      </Row>
    </CardTitle>
  );
}
