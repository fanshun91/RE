export default {
  testFunction (state, changes) {
    state.version = changes
    console.log(state.version)
  }
}
