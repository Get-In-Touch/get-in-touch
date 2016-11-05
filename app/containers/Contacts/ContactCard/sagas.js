import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import APIs from '../../../APIs';
import {
  REQUEST_UPDATE_CONTACT,
  UPDATE_CONTACT_SUCCESSFUL,
  UPDATE_CONTACT_FAILED,
  REQUEST_CONTACT_DELETION,
  CONTACT_DELETION_SUCCESSFUL,
  CONTACT_DELETION_FAILED,
} from './constants';
import moment from 'moment';

function* updateContact(/* action */ { contactId, userId, values, successCb }) {
  try {
    const response = yield call(APIs.server.updateContact, contactId, userId, values);
    if (response.error) {
      throw new Error(response.error);
    }

    successCb();
    const valuesForState = Object.assign({}, values, {
      lastContacted: moment(values.lastContacted),
    });
    yield put({
      type: UPDATE_CONTACT_SUCCESSFUL,
      contactId,
      values: valuesForState,
    });
  } catch (error) {
    yield put({ type: UPDATE_CONTACT_FAILED, contactId, error });
  }
}

function* deleteContact({ contactId, userId }) {
  try {
    const response = yield call(APIs.server.deleteContact, contactId, userId);
    if (response.error) {
      throw new Error(response.error);
    }
    yield put({ type: CONTACT_DELETION_SUCCESSFUL, contactId });
  } catch (error) {
    yield put({ type: CONTACT_DELETION_FAILED, contactId, error });
  }
}

// Individual exports for testing
export function* deleteContactSaga() {
  yield* takeEvery(REQUEST_CONTACT_DELETION, deleteContact);
}
export function* updateContactSaga() {
  yield* takeEvery(REQUEST_UPDATE_CONTACT, updateContact);
}

// All sagas to be loaded
export default [
  deleteContactSaga,
  updateContactSaga,
];
