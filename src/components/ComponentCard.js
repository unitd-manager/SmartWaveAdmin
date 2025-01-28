import { Card, CardBody, CardSubtitle } from 'reactstrap';
import PropTypes from 'prop-types';
import CreationModification from './CreationModification';

const ComponentCard = ({ children, title, subtitle,creationModificationDate }) => {
  return (
    <Card className='shadow-none'>
      <CreationModification details={creationModificationDate} title={title}></CreationModification>
      {/* <CardTitle tag="h4" className="border-bottom px-4 py-3 mb-0">
        {title}
        <p tag='h2' className="float-end small fs-5">{righttitle}</p>
      </CardTitle> */}
      <CardBody className="p-4">
        <CardSubtitle className="text-muted mb-3">{subtitle || ''}</CardSubtitle>
        <div>{children}</div>
      </CardBody>
    </Card>
  );
};

ComponentCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.node,
  creationModificationDate:PropTypes.any
};

export default ComponentCard;
