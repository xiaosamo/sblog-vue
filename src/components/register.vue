<template>
  <form class="form-signin" onsubmit="return false;">
    <img class="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
    <h1 class="h3 mb-3 font-weight-normal title">欢 迎</h1>
    <label for="username" class="sr-only">username</label>
    <input type="text" id="username" class="form-control" placeholder="用户名" required autofocus v-model="username" @blur="checkUsername">

    <label for="name" class="sr-only">name</label>
    <input type="text" id="name" class="form-control" placeholder="名称" required autofocus v-model="name">

    <label for="inputPassword" class="sr-only">Password</label>
    <input type="password" id="inputPassword" class="form-control" placeholder="密码" required v-model="password">
    <button class="btn btn-lg btn-primary btn-block" style="margin-top: 28px;" type="button" @click="submit">注册     </button>
    <a href="/login" class="float-right" style="margin-top: 12px">去登入</a>
    <p class="mt-5 mb-3" style="color: #ccc">&copy; 2017-2018</p>
  </form>
</template>

<script>
  // 1.导入header.vue
  // import header from './header/header'
  // import '@/styles/css/login.css'
  // import '@/styles/css/animate.min.css'
  import * as toastr from '@/styles/toastr/toastr.min'
  export default {
    name: 'register',
    components: {
      // 2.注册header
      // 'v-header': header
    },
    data () {
      return {
        username: '',
        password: '',
        name: ''
      }
    },
    mounted: function () {
      // console.log('username=' + this.username + ',password=' + this.password)
    },
    methods: {
      // 验证用户名
      checkUsername: function () {
        if (this.username.trim().length === 0) {
          return
        }
        this.$http.get(`${process.env.API_ROOT}/valid_username/` + this.username, {
        }, {emulateJSON: true}).then(response => {
          if (response.data.status === 0) {
            // 验证成功
            toastr.success(response.data.msg)
          } else {
            // 验证失败
            toastr.error(response.data.msg)
          }
          console.log(response.data)
        }, response => {
          console.log('error')
        })
      },
      submit: function () {
        if (!this.judgeEmpty()) {
          return
        }
        // console.log('username=' + this.username + ',password=' + this.password)
        // 请求登入
        this.$http.post(`${process.env.API_ROOT}/register`, {
          // this.$http.jsonp(`${process.env.API_ROOT}/user/login.do`, {
          'username': this.username,
          'password': this.password,
          'name': this.name
        }, {emulateJSON: true}).then(response => {
          if (response.data.status === 0) {
            toastr.success(response.data.msg)
            // 未登录
            this.$router.push({path: '/login'})
          } else {
            toastr.error(response.data.msg)
          }
          console.log(response.data)
          // get body data
          // this.someData = response.body;
        }, response => {
          console.log('error')
        })
      },
      judgeEmpty: function () {
        if (this.username.trim().length === 0) {
          toastr.error('用户名不能为空')
          return false
        }
        if (this.password.trim().length === 0) {
          toastr.error('密码不能为空')
          return false
        }
        if (this.name.trim().length === 0) {
          toastr.error('名称不能为空')
          return false
        }
        return true
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
    /*background-color: #f5f5f5;*/
    background-color: #f1f1f1;
    /*background-image: url("http://www.znsfagri.com/uploadfile/editor/image/20170626/20170626151136_11631.jpg");*/
    /*background-image: url("http://img.mp.itc.cn/upload/20170324/663c85eae74f4320a3e382f03af76d52_th.jpg");*/
    background-image: url("http://4493bz.1985t.com/uploads/allimg/141124/4-141124100202.jpg");
    background-repeat:no-repeat ;
    background-size:100% 100%;
    background-attachment: fixed;
  }

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
</style>
