<template>
    <router-view></router-view>
</template>

<script>
  // import '../static/bootstrap/css/bootstrap.css'
  // import '../static/bootstrap/css/bootstrap-theme.css'
  // import '../static/css/dropload.css'
  // import '../static/font-awesome-4.7.0/css/font-awesome.css'
  // import '../static/css/main.css'
  // import '../static/css/index.css'
  // import '../static/toastr/toastr.css'
  // import '../static/toastr/toastr.min'
  // import '../static/js/jquery-3.2.1'
  // import '../static/bootstrap/js/bootstrap'
  // import header from './components/header/header'

  // 登入
  // import '../static/css/login.css'
  // import '../static/css/animate.min.css'
  // import '../static/js/dropload'
  export default {
    name: 'App',
    components: {
      // 2.注册header
      // 'v-header': header
    },
    data () {
      return {
        articleList: [],
        popularUserList: [],
        links: [
          {
            text: '登入',
            route: '/login'
          },
          {
            text: '注册',
            route: '/register'
          },
          {
            text: '首页',
            route: '/'
          }
        ]
      }
    },
    mounted: function () {
      // console.log('username=' + this.username + ',password=' + this.password)
      // // 请求登入
      // this.$http.get(`${process.env.API_ROOT}/article/list.do?sort=newest`).then(response => {
      //   console.log(response.data.data.list)
      //   this.articleList = response.data.data.list
      //   // get body data
      //   // this.someData = response.body;
      // }, response => {
      //   console.log('error')
      // })
      // 热门用户
      // this.getPopularUser()
    },
    methods: {
      getPopularUser: function () {
        this.$http.get(`${process.env.API_ROOT}/user/get_popular_user.do`).then(response => {
          console.log(response.data.data)
          this.popularUserList = response.data.data.list
          // get body data
          // this.someData = response.body;
        }, response => {
          console.log('error')
        })
      }
    }
  }
</script>
