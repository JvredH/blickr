const GET_TAGS = 'session/GET_TAGS'
const ADD_TAG = 'session/ADD_TAG'

const getPhotoTagsAction = (tags) => {
  return({
    type: GET_TAGS,
    tags
  })
}

const addPhotoTagAction = (newTag) => {
  return({
    type: ADD_TAG,
    newTag
  })
}


export const getPhotoTagsThunk = (photoId) => async dispatch => {
  const response = await fetch(`/api/photos/${+photoId}/tags`)

  if (response.ok) {
    const tags = await response.json();
    dispatch(getPhotoTagsAction(tags));
    return tags;
  }
}

export const addPhotoTagThunk = (tagToAdd, photoId) => async dispatch => {
  const response = await fetch(`/api/photos/${photoId}/tags`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(tagToAdd)
  })

  if (response.ok) {
    const newTag = await response.json()
    dispatch(addPhotoTagAction(newTag))
  }
}

const normalize = (array) => {
  const obj = {};
  array.forEach(el => {obj[el.id] = el})
  return obj
}

const initialState = {allTags: {}, onePhotoTags: {}}

const tagsReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_TAGS: {
      const newState = {...state}
      console.log('action.tags', action.tags.tags)
      newState.onePhotoTags = normalize(action.tags.tags)
      return newState
    }
    case ADD_TAG: {
      const newState = {...state};
      newState.onePhotoTags[action.newTag.id] = action.newTag
      // console.log('newState from tags reducer -->',newState)
      return newState
    }
    default:
      return state;
  }
}

export default tagsReducer;
