const LOAD_USERS_ALBUMS = 'session/LOAD_USER_ALBUMS'
const GET_ALBUM_DETAILS = 'session/GET_ALBUM_DETAILS'

const loadUsersAlbumsAction = (userAlbums) => {
  return ({
    type: LOAD_USERS_ALBUMS,
    userAlbums
  })
}

const getOneAlbumDetailsAction = (albumData) => {
  return ({
    type: GET_ALBUM_DETAILS,
    albumData
  })
}

export const getUsersAlbumsThunk = (userId) => async dispatch => {
  const response = await fetch(`/api/users/${userId}/albums`)
  console.log('resposne' , response)
  if (response.ok) {
    const userAlbums = await response.json()
    dispatch(loadUsersAlbumsAction(userAlbums));
    return userAlbums
  }
}

export const getOneAlbumDetailsThunk = (albumId) => async dispatch => {
  const response = await fetch(`/api/albums/${albumId}`)

  if (response.ok) {
    const albumData = await response.json();
    dispatch(getOneAlbumDetailsAction(albumData))
    return albumData
  }
}


const normalize = (array) => {
  const obj = {};
  array.forEach(el => {obj[el.id] = el})
  return obj
}

const initialState = { usersAlbums:{}, singleAlbum:{} }

const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USERS_ALBUMS: {
      const newState = {...state}
      newState.usersAlbums = normalize(action.userAlbums.albums)
      return newState;
    }
    case GET_ALBUM_DETAILS: {
      const newState = {...state}
      newState.singleAlbum = action.albumData
      newState.singleAlbum.photos = normalize(action.albumData.photos)
      return newState
    }
    default:
      return state
  }
}

export default albumsReducer;
