const LOAD_PHOTOS = 'session/LOAD_ALL_PHOTOS'

const loadPhotosAction = (photos) => {
  return ({
    type: LOAD_PHOTOS,
    photos
  })
}

export const getAllPhotosThunk = () => async dispatch => {
  const response = await fetch(`/api/photos`)

  if (response.ok) {
    const photos = await response.json();
    dispatch(loadPhotosAction(photos))
  }
}

const normalize = (array) => {
  const obj = {};
  array.forEach(el => {obj[el.id] = el})
  return obj
}

const initialState = {allPhotos: {}, onePhoto: {}}

export default function photosReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PHOTOS: {
      const newState = {};
      return newState;
    }
    default:
      return state
  }

}
