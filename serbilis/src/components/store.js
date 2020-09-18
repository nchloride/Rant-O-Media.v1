import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import userPostsReducer from "./reducers/userPostsReducer";
import submitPostReducer from "./reducers/submitPostReducer";
import getCommentReducer from "./reducers/getCommentReducer";
import isLogin from "./reducers/isLoginReducer";
const initialState = {};
const reducer = combineReducers({
  userPosts: userPostsReducer,
  submitPost: submitPostReducer,
  getComment: getCommentReducer,
  isLogin: isLogin,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
