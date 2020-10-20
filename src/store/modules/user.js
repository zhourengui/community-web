export default {
  namespaced: true,
  state: () => ({
    info: {},
  }),
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
  },
}
