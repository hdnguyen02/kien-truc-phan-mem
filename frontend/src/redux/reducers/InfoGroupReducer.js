import { GET_INFO_GROUP_ID } from "../constants/InfoGroupContant"

const initialState = {
    infoGroup: {}
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case GET_INFO_GROUP_ID:
    state.infoGroup = payload;
    return { ...state, ...payload }

  default:
    return state
  }
}
