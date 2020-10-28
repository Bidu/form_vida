import {
  GET_TRANSMISSION_RESPONSE,
  GET_TRANSMISSION_LOADING,
  REDIRECT_TRANSMISSION_SUCCESS,
  GET_TRANSMISSION_LOADING_ERROR,
} from "../actions/types";

const initialState = {};

export default function transmission(state = initialState, action) {
  switch (action.type) {
    case GET_TRANSMISSION_RESPONSE:
      return {
        ...state,
        response: action.quote,
      };

    case GET_TRANSMISSION_LOADING:
      return {
        ...state,
        loading: true,
      };

    case GET_TRANSMISSION_LOADING_ERROR:
      return {
        ...state,
        loading: false,
      };

    case REDIRECT_TRANSMISSION_SUCCESS:
      return {
        ...state,
        redirect: true,
      };

    default:
      return state;
  }
}
