const LOAD_COMMENTS = 'session/LOAD_COMMENTS';
const ADD_COMMENT = 'session/ADD_COMMENT'

const loadCommentsAction = (comments) => {
  return({
    type: LOAD_COMMENTS,
    comments
  })
}

const addCommentAction = (createdComment) => {
  return ({
    type: ADD_COMMENT,
    createdComment
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

export const addCommentThunk = (newComment, photoId) => async dispatch => {
  const response = await fetch(`/api/photos/${+photoId}/comments`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newComment)
  })
  if (response.ok){
    const createdComment = await response.json()
    console.log('CREATED COMMENT THUNK ---->', createdComment)
    dispatch(addCommentAction(createdComment))
    return createdComment
  } else if (response.status < 500){
    const data = await response.json()
    if (data.errors) {
      return data.errors
    }
  } else {
    return ['An error occurred. Please try again.']
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
    case ADD_COMMENT: {
      const newState = {...state}
      console.log('ACTION.CREATEDCOMMENT REDUCER  -----> ', action.createdComment)
      newState.photoComments[action.createdComment.id] = action.createdComment
      return newState
    }
    default:
      return state
  }
}
