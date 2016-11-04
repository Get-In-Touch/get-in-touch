import { fromJS } from 'immutable';
import {
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_FAILURE,
} from './constants';

const initialState = fromJS({});

function addContactButtonReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CONTACT_SUCCESS:
      return state;
    case ADD_CONTACT_FAILURE:
      return state;
    default:
      return state;
  }
}

export default addContactButtonReducer;
