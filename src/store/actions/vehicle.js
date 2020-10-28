import { ADD_VEHICLE } from "./types";

export const addVehicle = vehicle => ({
  type: ADD_VEHICLE,
  vehicle
});
