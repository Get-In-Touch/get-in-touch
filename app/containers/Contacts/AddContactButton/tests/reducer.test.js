import expect from 'expect';
import addContactButtonReducer from '../reducer';
import { fromJS } from 'immutable';

describe('addContactButtonReducer', () => {
  it('returns the initial state', () => {
    expect(addContactButtonReducer(undefined, {})).toEqual(fromJS({}));
  });
});
