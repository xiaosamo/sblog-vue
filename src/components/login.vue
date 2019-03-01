<template>
  <form class="form-signin" onsubmit="return false;">
    <img class="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
    <h1 class="h3 mb-3 font-weight-normal title">欢 迎</h1>
    <label for="username" class="sr-only">Email address</label>
    <input type="text" id="username" class="form-control" placeholder="用户名" required autofocus v-model="username">
    <label for="inputPassword" class="sr-only">Password</label>
    <input type="password" id="inputPassword" class="form-control" placeholder="密码" required v-model="password">
    <div class="checkbox mb-3 float-left">
      <label>
        <input type="checkbox" value="rememberMe" v-model="rememberMe" checked><span class="rememberMeText">记住我</span>
      </label>
    </div>
    <button class="btn btn-lg btn-primary btn-block" style="margin-top: 28px;" type="button" @click="submit">登入</button>
    <a href="/register" class="float-right" style="margin-top: 12px">去注册</a>
    <p class="mt-5 mb-3" style="color: #ccc">&copy; 2017-2019</p>
  </form>
</template>

<script>
  // 1.导入header.vue  @将指向到项目的src文件夹
  // import header from './header/header'
  // import '@/styles/css/login.css'
  // import '@/styles/css/animate.min.css'
  import * as toastr from '@/styles/toastr/toastr.min'
  import store from '@/store/store'
  export default {
    name: 'login',
    components: {
      // 2.注册header
      // 'v-header': header
    },
    data () {
      return {
        username: '',
        password: '',
        rememberMe: false
      }
    },
    mounted: function () {
      console.log('username=' + this.username + ',password=' + this.password)
    },
    methods: {
      valid: function () {
        if (this.username.trim().length === 0) {
          toastr.warning('用户名不能未空')
          return false
        }
        if (this.password.trim().length === 0) {
          toastr.warning('密码不能未空')
          return false
        }
        return true
      },
      submit: function () {
        // 验证合法
        if (!this.valid()) {
          return
        }
        // 请求登入
        this.$http.post(`${process.env.API_ROOT}/login`, {
          'username': this.username,
          'password': this.password,
          'rememberMe': this.rememberMe
        }, {emulateJSON: true}).then(response => {
          console.log(response.data)
          if (response.data.status === 0) {
            // 调用setLoginUser，保存把用户信息
            store.commit('setLoginUser', response.data.data)
            console.log('登录成功')
            // 获取user
            // const user = store.getters.getUser
            // console.log(user.username)
            // 登入成功，跳转到首页
            // this.$router.push({path: '/'})
            this.$router.push(this.$route.query.redirect || '/')
          } else if (response.data.status === 1) {
            // 用户名或密码错误
            toastr.warning(response.data.msg)
          }
        }, response => {
          console.log('error')
        })
      },
      setCookie: function (cname, cvalue, exdays) {
        var d = new Date()
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
        var expires = 'exdays=' + d.toUTCString()
        console.info(cname + '=' + cvalue + '; ' + expires)
        document.cookie = cname + '=' + cvalue + '; ' + expires
        console.info(document.cookie)
      }
    }
  }
</script>

<style scoped>
  html,
  body {
    height: 100%;
  }

  body {
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-align: center;
    -ms-flex-pack: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
    /*background-image: url("http://www.znsfagri.com/uploadfile/editor/image/20170626/20170626151136_11631.jpg");*/
    /*background-image: url("http://img.mp.itc.cn/upload/20170324/663c85eae74f4320a3e382f03af76d52_th.jpg");*/
    background-image: url("http://4493bz.1985t.com/uploads/allimg/141124/4-141124100202.jpg");
    background-repeat:no-repeat ;
    background-size:100% 100%;
    background-attachment: fixed;
  }

  /*.form-signin {*/
    /*color: #fff;*/
    /*width: 100%;*/
    /*max-width: 330px;*/
    /*padding: 15px;*/
    /*margin: 140px auto;*/
    /*text-align: center;*/
  /*}*/

  .form-signin {
    color: #fff;
    width: 100%;
    max-width: 380px;
    padding: 40px 45px;
    margin: 110px auto;
    margin-bottom: 0;
    text-align: center;
    background: #fff;
  }
  .form-signin .checkbox {
    font-weight: 400;
  }
  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  .form-signin .form-control:focus {
    z-index: 2;
  }
  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .title{
    color: #444;
  }
  .rememberMeText{
    margin-left: 5px;
    color: #444;
  }
</style>
