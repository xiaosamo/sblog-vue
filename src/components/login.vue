<template>
  <form class="form-signin" onsubmit="return false;">
    <img class="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
    <h1 class="h3 mb-3 font-weight-normal title">欢 迎</h1>
    <label for="username" class="sr-only">Email address</label>
    <input type="text" id="username" class="form-control" placeholder="用户名" required autofocus v-model="username">
    <label for="inputPassword" class="sr-only">Password</label>
    <input type="password" id="inputPassword" class="form-control" placeholder="密码" required v-model="password">
    <!--<div class="checkbox mb-3 float-left">-->
    <!--<label>-->
    <!--<input type="checkbox" value="remember-me"> 记住我-->
    <!--</label>-->
    <!--</div>-->
    <button class="btn btn-lg btn-primary btn-block" style="margin-top: 28px;" type="button" @click="submit">登入</button>
    <a href="/register" class="float-right" style="margin-top: 12px">去注册</a>
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
      console.log('username=' + this.username + ',password=' + this.password)
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
</style>
