import { ADD_LEAD } from "../actions/types";

const initialState = {};
export default function lead(state = initialState, action) {
  switch (action.type) {
    case ADD_LEAD:
      return {
        ...state,
        idCotacao: action.pre_lead,
        loading: true,
      };

    default:
      return state;
  }
}
