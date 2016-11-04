import expect from 'expect';
import contactPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('contactPageReducer', () => {
  it('returns the initial state', () => {
    expect(contactPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
