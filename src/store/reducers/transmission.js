import {
  SEND_TRANSMISSION,
  SEND_TRANSMISSION_SUCCESS,
  GET_TRANSMISSION_RESPONSE,
} from "../actions/types";

const initialState = {};

export default function quote(state = initialState, action) {
  switch (action.type) {
    case SEND_TRANSMISSION:
      return {
        ...state,
        transmissao: action.quote,
      };

    case SEND_TRANSMISSION_SUCCESS:
      return {
        ...state,
        transmissao: action.quote,
      };

    case GET_TRANSMISSION_RESPONSE:
      return {
        ...state,
        transmissao_response: action.quote,
      };

    default:
      return state;
  }
}
