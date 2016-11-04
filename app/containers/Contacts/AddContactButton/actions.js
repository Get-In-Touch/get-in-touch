import { REQUEST_ADD_CONTACT } from './constants';

export function requestAddContact(userId, newContactValues) {
  const jsContact = newContactValues.toJS();

  jsContact.userId = userId;

  return {
    type: REQUEST_ADD_CONTACT,
    values: jsContact,
  };
}
