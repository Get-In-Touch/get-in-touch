import expect from 'expect';
import contactCardReducer from '../reducer';
import { fromJS } from 'immutable';

describe('contactCardReducer', () => {
  it('returns the initial state', () => {
    expect(contactCardReducer(undefined, {})).toEqual(fromJS({}));
  });
});
