import { REQUEST_CONTACT_DATA } from '../Contacts/ContactCard/constants';

export function requestContactData(userId) {
  return {
    type: REQUEST_CONTACT_DATA,
    userId,
  };
}
