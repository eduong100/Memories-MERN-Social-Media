import { GH_PATH, AUTH } from "../constants/actionTypes";
import * as api from "../api";

export const signin = (formData, navigate, setError) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });
    navigate(GH_PATH + "/");
  } catch (err) {
    console.log(err);
    setError(true);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });
    navigate(GH_PATH + "/");
  } catch (err) {
    console.log(err);
  }
};
