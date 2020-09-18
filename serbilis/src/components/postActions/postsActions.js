import {
  USER_POST_FAIL,
  USER_POST_REQUEST,
  USER_POST_SUCCESS,
  SUBMIT_POST,
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAIL,
  IS_LOGIN_FAIL,
  IS_LOGIN_REQUEST,
  IS_LOGIN_SUCCESS,
} from "../type";

const userPosts = () => async (dispatch) => {
  try {
    dispatch({ type: USER_POST_REQUEST });

    const response = await fetch("/postFeed/selectPosts");
    const data = await response.json();
    dispatch({ type: USER_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_POST_FAIL, payload: error.message });
  }
};
const submitPost = (message, type, date, username, token) => async (
  dispatch
) => {
  try {
    const insertData = await fetch(`/postFeed/addPost`, {
      method: "POST",
      body: JSON.stringify({
        message,
        type,
        date,
        username,
        token,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await insertData.json();
    dispatch({ type: SUBMIT_POST, payload: data });
  } catch (error) {}
};
const getComment = (postID) => async (dispatch) => {
  try {
    dispatch({ type: GET_COMMENT_REQUEST });
    const commment = await fetch("/postFeed/getComment", {
      mode: "cors",
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postID: postID }),
    });
    const data = await commment.json();

    dispatch({ type: GET_COMMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_COMMENT_FAIL, payload: error.message });
  }
};
const isLogin = () => async (dispatch) => {
  try {
    dispatch({ type: IS_LOGIN_REQUEST });
    const userData = await fetch("/islogin");
    const data = await userData.json();
    console.log(data);
    dispatch({ type: IS_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: IS_LOGIN_FAIL, payload: error.message });
  }
};
export { userPosts, submitPost, getComment, isLogin };
