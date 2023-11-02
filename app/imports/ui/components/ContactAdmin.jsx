import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ContactAdmin = ({ contact }) => (
  <Card className="h-100">
    <Card.Header>
      <img src={contact.image} style={{ width: '75px' }} alt="contact" />
      <Card.Title>{contact.firstName} {contact.lastName}</Card.Title>
      <Card.Subtitle>{contact.address}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{contact.description}</Card.Text>
      <footer className="blockquote-footer">{contact.owner}</footer>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
ContactAdmin.propTypes = {
  contact: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    address: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default ContactAdmin;
