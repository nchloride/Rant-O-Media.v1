import {
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAIL,
} from "../type";

const getCommentReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case GET_COMMENT_REQUEST:
      return { loading: true };
    case GET_COMMENT_SUCCESS:
      return { loading: false, comments: action.payload };
    case GET_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export default getCommentReducer;
