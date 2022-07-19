export default () => ({
  namespaced: true,
  state: () => ({
    isLogin: null,
    token: null,
  }),
  mutations: {
    LOGIN(state, token) {
      state.isLogin = true
      state.token = token
    },
  },
  actions: {
    login({ commit }, token) {
      commit('LOGIN', token)
    },
  },
  getters: {
    status: (state) => state.isLogin,
  },
})
