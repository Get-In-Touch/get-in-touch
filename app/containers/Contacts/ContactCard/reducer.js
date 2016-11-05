import { fromJS } from 'immutable';
import {
  MARK_CONTACT_CONTACTED,
  CONTACT_FETCH_SUCCEEDED,
  CONTACT_DELETION_SUCCESSFUL,
  UPDATE_CONTACT_SUCCESSFUL,
} from './constants';
import moment from 'moment';

const initialState = fromJS([]);

const convertDatesToMoment = (contact) => {
  const lastContacted = contact.lastContacted ? moment(contact.lastContacted) : contact.lastContacted;
  return Object.assign(contact, { lastContacted });
};

function loadFetchedContactData(state, action) {
  const idsInState = state.map((contact) => contact.get('id'));
  const newContacts = action.contacts
    .filter((contact) => !idsInState.includes(contact.id))
    .map(convertDatesToMoment);
  return state.push(...(newContacts.map((contact) => fromJS(contact))));
}

function updateContact(state, action) {
  // Discover the index of the contact we need to update
  let indexOfContact = -1;
  for (let i = 0, len = state.size; i < len; i++) { // eslint-disable-line no-plusplus
    if (state.get(i).get('id') === action.contactId) {
      indexOfContact = i;
      break;
    }
  }

  if (indexOfContact === -1) {
    throw new Error(`Contact with id #${action.contactId} not found!`);
  }

  const contact = state.get(indexOfContact);

  return state.set(indexOfContact, contact.merge(action.values));
}

function updateLastContactedDate(state, action) {
  return state.map((contact) => {
    // We only want to update the relevant contact
    if (contact.get('id') === action.contactId) {
      return contact.set('lastContacted', action.lastContacted);
    }
    return contact;
  });
}

function contactsReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CONTACT_SUCCESSFUL:
      return updateContact(state, action);
    case MARK_CONTACT_CONTACTED:
      return updateLastContactedDate(state, action);
    case CONTACT_FETCH_SUCCEEDED:
      return loadFetchedContactData(state, action);
    case CONTACT_DELETION_SUCCESSFUL:
      return state.filter((contact) => contact.get('id') !== action.contactId);
    default:
      return state;
  }
}

export default contactsReducer;
