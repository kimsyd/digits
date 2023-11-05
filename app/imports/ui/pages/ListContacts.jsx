import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Contacts } from '../../api/contact/Contacts';
import Contact from '../components/Contact';
import LoadingSpinner from '../components/LoadingSpinner';
import { Notes } from '../../api/note/Notes';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListContacts = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  // eslint-disable-next-line no-unused-vars
  const { ready, contacts, notes } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Contacts.userPublicationName);
    const noteSubscription = Meteor.subscribe(Notes.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && noteSubscription.ready();
    // Get the Stuff documents
    const contact = Contacts.collection.find({}).fetch();
    const note = Notes.collection.find({}).fetch();
    return {
      contacts: contact,
      notes: note,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>List Contacts</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {contacts.map((contact, index) => (
              <Col key={index}>
                <Contact
                  key={index}
                  contact={contact}
                  notes={notes.filter(note => (note.contactID === contact._id))}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};
export default ListContacts;
