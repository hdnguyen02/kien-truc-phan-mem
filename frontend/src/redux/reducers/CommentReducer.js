import { GET_COMMENT_OF_GROUP } from "../constants/CommentClassesConstant"

const initialState = {
    commentList: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case GET_COMMENT_OF_GROUP:
    state.commentList = payload;
    return { ...state, ...payload }

  default:
    return state
  }
}
