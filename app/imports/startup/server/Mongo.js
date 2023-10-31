import { Meteor } from 'meteor/meteor';
import { Contacts } from '../../api/stuff/Contacts.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.firstName} ${data.lastName} ${data.address}  ${data.image} ${data.description} (${data.owner})`);
  Contacts.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Contacts.collection.find().count() === 0) {
  if (Meteor.settings.defaultContacts) {
    console.log('Creating default contacts.');
    Meteor.settings.defaultContacts.forEach(data => addData(data));
  }
}
