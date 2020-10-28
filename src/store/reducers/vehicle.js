import { ADD_VEHICLE } from "../actions/types";

const initialState = {};
export default function vehicle(state = initialState, action) {
  switch (action.type) {
    case ADD_VEHICLE:
      return {
        ...state.vehicle,
        infos: action.vehicle
      };

    default:
      return state;
  }
}
