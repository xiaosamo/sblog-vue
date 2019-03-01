import Vuex from 'vuex'

// 保存用户登录信息
const store = new Vuex.Store({
  // 定义状态
  state: {
    currentUser: null,
    isLogin: false

  },
  getters: {
    getUser: state => {
      if (state.currentUser == null) {
        state.currentUser = {}
        state.currentUser.id = sessionStorage.getItem('uid');
        state.currentUser.name = sessionStorage.getItem('name');
        state.currentUser.username = sessionStorage.getItem('username');
        state.currentUser.avatar = sessionStorage.getItem('avatar');
        state.currentUser.token = sessionStorage.getItem('token');
        state.isLogin = sessionStorage.getItem('isLogin');
      }
      return state.currentUser;
    },
    isLogin: state => {
      if (!state.isLogin) {
        // 从sessionStorage中读取状态
        state.isLogin = sessionStorage.getItem('isLogin')
        console.log('sessionStorage_isLogin:')
        console.log(sessionStorage.getItem('isLogin'))
      }
      return state.isLogin
    }
  },
  mutations: {
    setLoginUser (state, user) {
      // 保存信息在sessionStorage
      sessionStorage.setItem('uid', user.id);
      sessionStorage.setItem('name', user.name);
      sessionStorage.setItem('username', user.username);
      sessionStorage.setItem('avatar', user.avatar);
      sessionStorage.setItem('token', user.token);
      sessionStorage.setItem('sign', user.sign);
      sessionStorage.setItem('info', user.info);
      sessionStorage.setItem('phone', user.phone);
      sessionStorage.setItem('email', user.email);

      sessionStorage.setItem('isLogin', true);
      // 保存信息在vuex
      state.currentUser = user;
      state.isLogin = true;
    },
    // 退出登录
    signOut (state) {
      sessionStorage.removeItem('uid');
      sessionStorage.removeItem('name');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('avatar');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('sign');
      sessionStorage.removeItem('info');
      sessionStorage.removeItem('phone');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('isLogin');
      state.currentUser = null;
      state.isLogin = false;
    }
  }
});
export default store;
