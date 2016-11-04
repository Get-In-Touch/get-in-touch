import { createSelector } from 'reselect';

/**
 * Direct selector to the contactPage state domain
 */
const selectContactPageDomain = () => (state) => state.get('contactPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ContactPage
 */

const selectContactPage = () => createSelector(
  selectContactPageDomain(),
  (substate) => substate.toJS()
);

export default selectContactPage;
export {
  selectContactPageDomain,
};
