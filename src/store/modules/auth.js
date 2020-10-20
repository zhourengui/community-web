export default {
  namespaced: true,
  state: () => ({
    sid: null,
  }),
  mutations: {
    setSid(state, sid) {
      state.sid = sid
    },
  },
}
