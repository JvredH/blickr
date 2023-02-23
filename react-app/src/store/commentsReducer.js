const LOAD_COMMENTS = 'session/LOAD_COMMENTS';

const loadCommentsAction = (comments) => {
  return({
    type: LOAD_COMMENTS,
    comments
  })
}

export const loadCommentsThunk = (photoId) => async dispatch => {
  const response = await fetch(`/api/photos/${photoId}/comments`)

  if (response.ok) {
    const comments = await response.json()
    console.log('comments from thunk ----> ', comments)
    dispatch(loadCommentsAction(comments))
    return comments
  }
}

const normalize = (array) => {
  const obj = {};
  array.forEach(el => {obj[el.id] = el})
  return obj
}

const initialState = {photoComments: {}};

export default function commentsReducer(state = initialState, action) {
  switch(action.type) {
    case LOAD_COMMENTS: {
      console.log('action.comments ---> ', action.comments)
      const newState = {photoComments: {}};
      newState.photoComments = normalize(action.comments)
      console.log('newState from reducer -----> ', newState)
      return newState;
    }
    default:
      return state
  }
}
