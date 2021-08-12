import { CONSTANTS } from "./index";

export const authUser = (user) => {
  return {
    type: CONSTANTS.AUTH_USER,
    payload: user,
  };
};
