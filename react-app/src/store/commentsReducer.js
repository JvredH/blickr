const LOAD_COMMENTS = 'session/LOAD_COMMENTS';
const ADD_COMMENT = 'session/ADD_COMMENT'
const EDIT_COMMENT = 'session/EDIT_COMMENT'
const DELETE_COMMENT = 'session/DELETE_COMMENT'

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

const editCommentAction = (comment) => {
  return({
    type: EDIT_COMMENT,
    comment
  })
}

const deleteCommentAction = (commentId) => {
  return ({
    type: DELETE_COMMENT,
    commentId
  })
}

export const loadCommentsThunk = (photoId) => async dispatch => {
  const response = await fetch(`/api/photos/${photoId}/comments`)

  if (response.ok) {
    const comments = await response.json()
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

export const editCommentThunk = (comment, commentId) => async dispatch =>{
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(comment)
  })

  if (response.ok) {
    const editedComment = await response.json()
    dispatch(editCommentAction(editedComment));
    return editedComment
  }
}

export const deleteCommentThunk = (commentId) => async dispatch => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE'
  })

  if (response.ok) {
    dispatch(deleteCommentAction(commentId))
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
      const newState = {photoComments: {}};
      newState.photoComments = normalize(action.comments)
      return newState;
    }
    case ADD_COMMENT: {
      const newState = {...state}
      newState.photoComments[action.createdComment.id] = action.createdComment
      return newState
    }
    case EDIT_COMMENT: {
      const newState = {...state}
      newState.photoComments[action.comment.id] = action.comment
      return newState;
    }
    case DELETE_COMMENT: {
      const newState = {...state}
      delete newState.photoComments[action.commentId]
      return newState;
    }
    default:
      return state
  }
}
