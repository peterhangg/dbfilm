import { MENU_TOGGLE } from '../constants/action-types';

const menuToggle = () => ({
  type: MENU_TOGGLE
});

export const fetchMenuToggle = () => {
  return dispatch => {
    dispatch(menuToggle());
  }
};