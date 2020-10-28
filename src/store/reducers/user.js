import { ADD_USER } from "../actions/types";

const initialState = {};
export default function user(state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        infos: action.user
      };

    default:
      return state;
  }
}
