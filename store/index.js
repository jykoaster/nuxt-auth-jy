import authModule from './modules/auth'
export default ({ store }) => {
  // register the module using namespace as the name.
  // counter module takes the options object and returns an object that is a
  // vuex store defenition
  store.registerModule('authCustom', authModule(), {
    preserveState: Boolean(store.state.authCustom), // if the store module already exists, preserve it
  })
}
