import { SEND_QUOTE, SEND_QUOTE_SUCCESS } from "../actions/types";

const initialState = {};

export default function quote(state = initialState, action) {
  switch (action.type) {
    case SEND_QUOTE:
      return {
        ...state,
        infos: action.quote
      };

    case SEND_QUOTE_SUCCESS:
      return {
        ...state,
        infos: action.quote
      };

    default:
      return state;
  }
}
