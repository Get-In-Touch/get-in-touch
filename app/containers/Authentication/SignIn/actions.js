import {
  CHANGE_USER,
} from './constants';

export function changeUser(userId) {
  return {
    type: CHANGE_USER,
    userId,
  };
}
