import { fetchUser, updateUser } from "./user.actions";
import { createTrid, fetchTrids } from "./trid.actions";

export const USER_ACTIONS = {
  updateUser,
  fetchUser,
};

export const TRID_ACTIONS = {
  createTrid,
  fetchTrids,
};
