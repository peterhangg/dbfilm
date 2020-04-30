import { GET_CONFIG } from '../constants/action-types';

const initialState = {
  config: {}
};

const configReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_CONFIG:
      return {...state, config: action.payload}
    default:
      return state;
  }
}
export default configReducer;