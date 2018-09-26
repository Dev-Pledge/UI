const initialState = () => ({
  state: ""
})

const githubState = (state = initialState(), action) => {
  console.log(action)
  switch (action.type) {
    case 'INIT_STATE':
      return Object.assign({}, state, {
        state: action.payload
      });
    case 'CLEAR_STATE':
      return Object.assign({}, state, {
        state: ''
      });
    default:
      return state;
  }
}

export default githubState