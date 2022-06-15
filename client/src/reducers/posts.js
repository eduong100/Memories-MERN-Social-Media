import {
  DELETE,
  UPDATE,
  FETCH_ALL,
  CREATE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";

/*
state: {
  posts: [post],
  currentPage: Number,
  numberOfPages: Number
}
*/
export default (state = { isLoading: true, posts: [] }, action) => {
  console.log(state, action.type);
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
      console.log(action.payload);
      return { ...state, posts: action.payload };
    case CREATE:
      return { ...state, posts: [action.payload, ...state.posts] };

    default:
      return state;
  }
};
