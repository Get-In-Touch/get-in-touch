import { fromJS } from 'immutable';
import {
  CHANGE_USER,
} from './constants';

const initialState = fromJS({
  currentUser: 1,
  users: [
    { userId: 1, name: 'Nico Greenarry' },
    { userId: 3, name: 'George Weiler' },
    { userId: 2, name: 'Elyse Greenarry' },
  ],
});

function signInReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USER:
      return state.set('currentUser', action.userId);
    default:
      return state;
  }
}

export default signInReducer;
