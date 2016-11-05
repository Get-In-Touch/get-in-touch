import {
  REQUEST_UPDATE_CONTACT,
  MARK_CONTACT_CONTACTED,
  REQUEST_CONTACT_DELETION,
  CANCEL_CONTACT_EDITING_APP_STATE,
} from './constants';
import moment from 'moment';

function getToday() {
  return moment().hours(0).minutes(0).seconds(0).milliseconds(0);
}

export function markContactContacted(contactId, lastContactedParam = getToday()) {
  const lastContacted = typeof lastContacted === 'string' ? moment(lastContactedParam) : lastContactedParam;
  return {
    type: MARK_CONTACT_CONTACTED,
    contactId,
    lastContacted,
  };
}

export function requestUpdateContact(contactId, userId, formValues, successCb) {
  const values = formValues.toJS();
  values.lastContacted = values.lastContacted ?
    moment(values.lastContacted).format() :
    values.lastContacted;

  return {
    type: REQUEST_UPDATE_CONTACT,
    contactId,
    userId,
    values,
    successCb,
  };
}

export function requestContactDeletion(contactId, userId) {
  return {
    type: REQUEST_CONTACT_DELETION,
    contactId,
    userId,
  };
}
// The contactDeletionSuccessful action is fired by the saga

export function cancelContactEditingAppState(contactId) {
  return {
    type: CANCEL_CONTACT_EDITING_APP_STATE,
    contactId,
  };
}
