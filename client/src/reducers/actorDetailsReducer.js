import { GET_ACTOR_DETAILS_SUCCESS, GET_ACTOR_DETAILS_ERROR } from '../constants/action-types';

const initialState = {
  actorDetails: {},
  loading: true,
  error: false
};

const actorDetailsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_ACTOR_DETAILS_SUCCESS:
      return { ...state, actorDetails: action.payload, loading: false }
    case GET_ACTOR_DETAILS_ERROR:
      return { ...state, loading: false, error: true }
    default:
      return state
  }
};

export default actorDetailsReducer;