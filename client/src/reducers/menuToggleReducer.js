import { MENU_TOGGLE } from '../constants/action-types';

const initialState = {
  open: false
};

const menuToggleReducer = (state = initialState, action) => {
  switch(action.type) {
    case MENU_TOGGLE:
      return { ...state, open: !state.open };
    default:
      return state
  }
};

export default menuToggleReducer;