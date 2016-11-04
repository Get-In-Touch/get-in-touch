import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import APIs from '../../APIs';
import {
  REQUEST_CONTACT_DATA, CONTACT_FETCH_SUCCEEDED, CONTACT_FETCH_FAILED,
} from '../Contacts/ContactCard/constants';

// Will be fired on each REQUEST_CONTACT_DATA action
function* fetchContacts(action) {
  try {
    const response = yield call(APIs.server.fetchAllContacts, action.userId);
    yield put({ type: CONTACT_FETCH_SUCCEEDED, contacts: response.data });
  } catch (error) {
    yield put({ type: CONTACT_FETCH_FAILED, error });
  }
}

// Individual exports for testing
export function* fetchContactsSaga() {
  yield* takeLatest(REQUEST_CONTACT_DATA, fetchContacts);
}

// All sagas to be loaded
export default [
  fetchContactsSaga,
];
