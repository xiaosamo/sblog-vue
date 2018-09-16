<!--<link rel="stylesheet" href="components/login/login.css">-->
<template>
  <div id="app">
    <div class="auth-layout">

      <div class="nav d-lg-none">
        <!--<a href="http://vuestic.epicmax.co/#/" class="i-vuestic router-link-active">博客</a>-->
        <a href="#" class="router-link-active">
          送你小心心‍‍‍❤️‍‍‍‍‍❤️‍‍‍‍‍❤️‍‍‍‍‍❤️‍‍
        </a>
      </div>

      <div class="main row">
        <div class="auth-content col-lg-12 col-12">
          <!--<div class="login "><h2 class="animated infinite bounce">欢迎</h2>-->
          <div class="login"><h2 class="animated  rubberBand">欢迎加入博客</h2>
            <form onsubmit="return false;">
              <div class="form-group">
                <div class="input-group"><input type="text" id="username" required="required" v-model="username" @blur="checkUsername">
                  <label for="username" class="control-label">用户名</label><i class="bar"></i>
                </div>

              </div>

              <div class="form-group">
                <div class="input-group"><input type="password" id="password" required="required" v-model="password"> <label
                  for="password" class="control-label">密码</label><i class="bar"></i>
                </div>
              </div>
              <div class="form-group">
                <div class="input-group"><input type="text" id="name" required="required" v-model="name"> <label
                  for="name" class="control-label">名称</label><i class="bar"></i>
                </div>
              </div>

              <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between down-container">
                <button id="submit" type="button" class="btn btn-primary" @click="submit">
                  注册
                </button>
                <a href="/login" class="link">去登入</a></div>
            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
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
        this.$http.post(`${process.env.API_ROOT}/user/check_valid.do`, {
          'str': this.username,
          'type': 'username'
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
        this.$http.post(`${process.env.API_ROOT}/user/register.do`, {
          // this.$http.jsonp(`${process.env.API_ROOT}/user/login.do`, {
          'username': this.username,
          'password': this.password,
          'name': this.name
        }, {emulateJSON: true}).then(response => {
          if (response.data.status === 0) {
            toastr.success(response.data.msg)
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
  .login {
    width: 21.375rem
  }

  @media (max-width: 991.98px) {
    .login {
      width: 100%;
      padding-right: 2rem;
      padding-left: 2rem
    }

    .login .down-container .link {
      margin-top: 2rem
    }
  }

  .login h2 {
    text-align: center
  }

  .login .down-container {
    margin-top: 3.125rem
  }

  .main{
    width: 100%;
    margin: 0 auto;
    background: red;
  }
  .CHAT{
    display: none;
  }
</style>
