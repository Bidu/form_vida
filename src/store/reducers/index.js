import { combineReducers } from "redux";
import user from "./user";
import vehicle from "./vehicle";
import quote from "./quote";
import transmission from "./transmission_response";

export default combineReducers({
  user,
  vehicle,
  quote,
  transmission,
});
