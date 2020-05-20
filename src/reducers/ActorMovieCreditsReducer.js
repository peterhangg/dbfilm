import { GET_ACTOR_MOVIE_CREDITS_SUCCESS, GET_ACTOR_MOVIE_CREDITS_ERROR} from '../constants/action-types';

const initialState = {
  actorMovieCredits: {},
  loading: true,
  error: false
};

const actorMovieCreditsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_ACTOR_MOVIE_CREDITS_SUCCESS:
      return { ...state, actorMovieCredits: action.payload, loading: false };
    case GET_ACTOR_MOVIE_CREDITS_ERROR:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}

export default actorMovieCreditsReducer;