<template>
  <!--<div id="app">-->
    <div class="auth-layout">
      <div class="nav d-lg-none">
        <!--<a href="http://vuestic.epicmax.co/#/" class="i-vuestic router-link-active">博客</a>-->
        <a href="#" class="router-link-active">
          这都被你发现了☺️
        </a>
      </div>

      <div class="main row">
        <div class="auth-content col-lg-12 col-12">
          <!--<div class="login "><h2 class="animated infinite bounce">欢迎</h2>-->
          <div class="login"><h2 class="animated  fadeInDown">欢迎</h2>
            <form onsubmit="return false;">
              <div class="form-group">
                <div class="input-group"><input type="text" name="username" id="username" required="required" v-model="username">
                  <label for="username" class="control-label">用户名</label><i class="bar"></i></div>

              </div>
              <div class="form-group">
                <div class="input-group"><input type="password" id="password" name="password"  required="required" v-model="password"> <label
                  for="password" class="control-label">密码</label><i class="bar"></i></div>
              </div>

              <div>
                <input  type="checkbox" name="remember-me" checked > 记住我
                <!--<span  class="error">用户名或密码不正确</span>-->
                <!--用户名：<span>{{ username}}</span>-->
                <!--密码：<span>{{password}}</span>-->
              </div>
              <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between down-container">
                <!-- v-on:click="doSomething" 完整语法 @click缩写 -->
                <button type="submit" class="btn btn-primary" @click="submit">
                  登入
                </button>
                <a href="/register" class="link">注册</a></div>
            </form>
          </div>
        </div>

      </div>
    </div>
  <!--</div>-->
</template>

<script>
  // 1.导入header.vue
  // import header from './header/header'
  import '@/styles/css/login.css'
  import '@/styles/css/animate.min.css'
  import * as toastr from '@/styles/toastr/toastr.min'
  export default {
    name: 'login',
    components: {
      // 2.注册header
      // 'v-header': header
    },
    data () {
      return {
        username: '',
        password: ''
      }
    },
    mounted: function () {
      // console.log('username=' + this.username + ',password=' + this.password)
    },
    methods: {
      submit: function () {
        // alert('username=' + this.username + ',password=' + this.password)
        // console.log('username=' + this.username + ',password=' + this.password)
        // 请求登入
        this.$http.post(`${process.env.API_ROOT}/user/login.do`, {
          // this.$http.jsonp(`${process.env.API_ROOT}/user/login.do`, {
          'username': this.username,
          'password': this.password
        }, {emulateJSON: true}).then(response => {
          console.log(response.data)
          if (response.data.status === 0) {
            // 登入成功，跳转到首页
            window.location.href = '/'
          } else if (response.data.status === 1) {
            toastr.error(response.data.msg)
            // 用户名或密码错误
          }
          // this.$router.push('/')
          // this.$router.go(-1)
          // this.$router.go(0)
          // sessionStorage.setItem('token', response.data.data)
          // document.cookie = 'SESSION=' + response.data.data
          // get body data
          // this.someData = response.body;
        }, response => {
          console.log('error')
        })
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
  .error{
    font-weight: 400;
    color: red;
    float: right;
  }
</style>
