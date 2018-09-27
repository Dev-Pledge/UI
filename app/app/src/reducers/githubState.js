const initialState = () => ({
  state: '',
  userName: ''
})

const githubState = (state = initialState(), action) => {
  console.log(action)
  switch (action.type) {
    case 'INIT_STATE':
      return Object.assign({}, state, {
        state: action.payload.stateString,
        userName: action.payload.userName
      });
    case 'CLEAR_STATE':
      return Object.assign({}, state, {
        state: '',
        userName: ''
      });
    default:
      return state;
  }
}

export default githubState