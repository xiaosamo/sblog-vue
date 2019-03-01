
import Vuex from 'vuex'

const user = new Vuex.Store({
  state: {
    name: '',
    username: '',
    id: '',
    portrait: '',
    bgImg: '',
    role: '',
    permissions: []
  },
  mutations: {
    SET_USER: (state, userInfo) => {
      state.name = userInfo.name;
      state.username = userInfo.username;
      state.id = userInfo.id;
      state.portrait = userInfo.portrait;
      state.bgImg = userInfo.bgImg;
      state.role = userInfo.role;
      state.permissions = userInfo.permissions;
    },
    RESET_USER: (state) => {
      state.name = ''
      state.username = ''
      state.id = ''
      state.portrait = ''
      state.bgImg = ''
      state.role = ''
      state.permissions = ''
    }
  },
  actions: {
  },
  getters: {
    id: state => {
      return state.id
    },
    username: state => {
      return state.username
    },
    name: state => {
      return state.name
    },
    portrait: state => {
      return state.portrait
    },
    bgImg: state => {
      return state.bgImg
    }
  }
})
export default user
