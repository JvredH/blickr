const LOAD_PHOTOS = 'session/LOAD_ALL_PHOTOS'
const ONE_PHOTO = 'session/ONE_PHOTO'
const CREATE_PHOTO = 'session/CREATE_PHOTO'
const EDIT_PHOTO = 'session/EDIT_PHOTO'
const DELETE_PHOTO = 'session/DELETE_PHOTO'
const GET_USER_PHOTOS = 'session/GET_USER_PHOTOS'

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

const deletePhotoAction = (photoId) => {
  return({
    type: DELETE_PHOTO,
    photoId
  })
}

const getUsersPhotosAction = (userPhotos) => {
  console.log('from action creator', userPhotos)
  return ({
    type: GET_USER_PHOTOS,
    userPhotos
  })
}

export const getAllPhotosThunk = () => async dispatch => {
  const response = await fetch(`/api/photos`)

  if (response.ok) {
    const photos = await response.json();
    dispatch(loadPhotosAction(photos))
  }
}

export const getOnePhotoThunk = (photoId) => async dispatch => {
  const response = await fetch(`/api/photos/${photoId}`)

  if (response.ok) {
    const photo = await response.json();
    dispatch(loadOnePhotoAction(photo))
    return photo
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
  const response = await fetch(`/api/photos/${+photoId}`, {
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


export const deletePhotoThunk = (photoId) => async dispatch => {
  const response = await fetch(`/api/photos/${+photoId}`, {
    method: 'DELETE'
  })

  if (response.ok) {
    dispatch(deletePhotoAction(photoId))
  }
}

export const getUsersPhotosThunk = (userId) => async dispatch => {
  const response = await fetch(`/api/users/${userId}/photos`)

  if (response.ok) {
    const userPhotos = await response.json()
    console.log('usersphotos --->', userPhotos)
    dispatch(getUsersPhotosAction(userPhotos))
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

const initialState = {allPhotos: {}, onePhoto: {}, usersPhotos: {}}

export default function photosReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PHOTOS: {
      const newState = {allPhotos: {}, onePhoto: {}, usersPhotos: {}};
      newState.allPhotos = normalize(action.photos.allPhotos)
      return newState;
    }
    case ONE_PHOTO: {
      const newState = {...state}
      newState.onePhoto = action.photo
      return newState
    }
    case CREATE_PHOTO: {
      const newState = {...state}
      newState.allPhotos[action.newPhoto.id] = action.newPhoto
      newState.onePhoto = action.newPhoto
      return newState
    }
    case EDIT_PHOTO: {
      const newState = {...state}
      newState.allPhotos[action.editedPhoto.id] = action.editedPhoto
      newState.onePhoto = action.editedPhoto
      return newState
    }
    case DELETE_PHOTO: {
      const newState = {...state, onePhoto: {}}
      delete newState.allPhotos[action.photoId]
      return newState
    }
    case GET_USER_PHOTOS: {
      const newState = {...state}
      newState.usersPhotos = normalize(action.userPhotos.photos)
      return newState
    }
    default:
      return state
  }
}
