import { AUTH, LOGOUT } from "../constants/actionTypes.js";

const authReducer = (state = { authData: null }, action) => {
  console.log(action.data);
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      console.log({ ...state, authData: action?.data });
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
