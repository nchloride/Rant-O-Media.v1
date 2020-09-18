import { IS_LOGIN_REQUEST, IS_LOGIN_SUCCESS, IS_LOGIN_FAIL } from "../type/";

const isLoginReducer = (state = { userInformation: [] }, action) => {
  switch (action.type) {
    case IS_LOGIN_REQUEST:
      return { isLoading: true };
    case IS_LOGIN_SUCCESS:
      return { isLoading: false, userInformation: action.payload };
    case IS_LOGIN_FAIL:
      return { isLoading: false, error: action.payload };

    default:
      return state;
  }
};
export default isLoginReducer;
