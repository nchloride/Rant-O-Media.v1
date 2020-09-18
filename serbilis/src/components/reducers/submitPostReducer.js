import { SUBMIT_POST } from "../type";

const submitPostReducer = (state = [], action) => {
  switch (action.type) {
    case SUBMIT_POST:
      return { message: action.payload };

    default:
      return state;
  }
};
export default submitPostReducer;
