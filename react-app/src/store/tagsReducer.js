const GET_TAGS = 'session/GET_TAGS'

const getPhotoTagsAction = (tags) => {
  return({
    type: GET_TAGS,
    tags
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
    default:
      return state;
  }
}

export default tagsReducer;
