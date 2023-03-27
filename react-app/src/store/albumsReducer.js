const LOAD_USERS_ALBUMS = 'session/LOAD_USER_ALBUMS'

const loadUsersAlbumsAction = (userAlbums) => {
  return ({
    type: LOAD_USERS_ALBUMS,
    userAlbums
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
    default:
      return state
  }
}

export default albumsReducer;
