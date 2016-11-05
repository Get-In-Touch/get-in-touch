import { REQUEST_ADD_CONTACT } from './constants';
import moment from 'moment';

export function requestAddContact(userId, newContactValues) {
  const values = newContactValues.toJS();
  values.lastContacted = values.lastContacted ?
    moment(values.lastContacted).format() :
    values.lastContacted;

  return {
    type: REQUEST_ADD_CONTACT,
    userId,
    values,
  };
}
