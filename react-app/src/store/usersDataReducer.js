const LOAD_USER_DATA = 'session/LOAD_USER_DATA'

const loadUserDataAction = (userData) => {
  return ({
    type: LOAD_USER_DATA,
    userData
  })
}

export const getUsersDataThunk = (id) => async dispatch => {
  const response = await fetch(`/api/users/${id}`)

  if (response.ok) {
    const userData = await response.json();
    dispatch(loadUserDataAction(userData))
  }
}

const initialState = {}

const usersDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_DATA: {
      let newState = {};
      newState = action.userData
      return newState;
    }
    default:
      return state;
  }
}

export default usersDataReducer;
