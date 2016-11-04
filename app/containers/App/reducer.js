import { fromJS } from 'immutable';
import {
  REQUEST_UPDATE_CONTACT,
  UPDATE_CONTACT_SUCCESSFUL,
  UPDATE_CONTACT_FAILED,
  CANCEL_CONTACT_EDITING_APP_STATE,
} from '../Contacts/ContactCard/constants';

const initialState = fromJS({
  containers: {},
  contacts: {},
  stories: {},
});

function appStatusReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_UPDATE_CONTACT:
      return state.setIn(['contacts', action.contactId, 'updatingStatus'], true);
    case UPDATE_CONTACT_SUCCESSFUL:
      return state.setIn(['contacts', action.contactId, 'updatingStatus'], false);
    case UPDATE_CONTACT_FAILED:
      return state.setIn(['contacts', action.contactId, 'updatingStatus'], `Failed: ${action.error}`);
    case CANCEL_CONTACT_EDITING_APP_STATE:
      return state.setIn(['contacts', action.contactId, 'updatingStatus'], false);
    default:
      return state;
  }
}

export default appStatusReducer;
