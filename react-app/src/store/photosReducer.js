const LOAD_PHOTOS = 'session/LOAD_ALL_PHOTOS'
const ONE_PHOTO = 'session/ONE_PHOTO'
const CREATE_PHOTO = 'session/CREATE_PHOTO'
const EDIT_PHOTO = 'session/EDIT_PHOTO'

const loadPhotosAction = (photos) => {
  return ({
    type: LOAD_PHOTOS,
    photos
  })
}

const loadOnePhotoAction = (photo) => {
  return ({
    type: ONE_PHOTO,
    photo
  })
}

const createPhotoAction = (newPhoto) => {
  return({
    type: CREATE_PHOTO,
    newPhoto
  })
}

const editPhotoAction = (editedPhoto) => {
  return ({
    type: EDIT_PHOTO,
    editedPhoto
  })
}

export const getAllPhotosThunk = () => async dispatch => {
  const response = await fetch(`/api/photos`)

  if (response.ok) {
    const photos = await response.json();
    console.log('all photos ------ >', photos)
    dispatch(loadPhotosAction(photos))
  }
}

export const getOnePhotoThunk = (photoId) => async dispatch => {
  const response = await fetch(`/api/photos/${photoId}`)

  if (response.ok) {
    const photo = await response.json();
    console.log('one photo ------ > ', photo)
    dispatch(loadOnePhotoAction(photo))
  }
}

export const createPhotoThunk = (formData) => async dispatch => {
  const response = await fetch(`/api/photos/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(formData)
  })

  if (response.ok) {
    const newPhoto = await response.json()
    console.log('newPhoto -----> ', newPhoto)
    dispatch(createPhotoAction(newPhoto))
    return newPhoto
  } else if (response.status < 500){
    const data = await response.json()
    if (data.errors) {
      return data.errors
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const editPhotoThunk = (editFormData, photoId) => async dispatch => {
  const response = await fetch(`/api/photos/${photoId}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(editFormData)
  })
  if (response.ok) {
    const editedPhoto = await response.json()
    dispatch(editPhotoAction(editedPhoto))
    return editedPhoto
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

const initialState = {allPhotos: {}, onePhoto: {}}

export default function photosReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PHOTOS: {
      console.log('action.photos ----->', action.photos)
      const newState = {allPhotos: {}, onePhoto: {}};
      newState.allPhotos = normalize(action.photos.allPhotos)
      console.log('newState ------->', newState)
      return newState;
    }
    case ONE_PHOTO: {
      const newState = {...state}
      newState.onePhoto = action.photo
      console.log('newState after one photo ----> ', newState)
      return newState
    }
    case CREATE_PHOTO: {
      const newState = {...state}
      // console.log(action.photo)
      newState.allPhotos[action.newPhoto.id] = action.newPhoto
      newState.onePhoto = action.newPhoto
    }
    case EDIT_PHOTO: {
      const newState = {...state}
      newState.allPhotos[action.editedPhoto.id] = action.editedPhoto
      newState.onePhoto = action.editedPhoto
      return newState
    }
    default:
      return state
  }
}
