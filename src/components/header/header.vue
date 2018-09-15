<template>
  <!--导航条-->
  <nav class="navbar navbar-default">
    <div class="container">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header ">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="/">博客</a>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav ul-left">
          <li ><a href="/index?sort=newest">首页 <span class="sr-only">(current)</span></a></li>
          <li><a href="/index?sort=popular" id="hotArticle">热门</a></li>
          <li><a href="/follow">关注</a></li>
        </ul>
        <!--
        /**
         * 遇到问题-----JS中设置window.location.href跳转无效
         * 原因是 a标签的href跳转会执行在window.location.href设置的跳转之前:
         * 如果是表单form的话  也会先执行form提交。
         * 提交之后 就已经不在当前页面了。所以 window.location.href无效。
         *
         * 加上return false;即可
         */
        -->
        <form class="navbar-form navbar-left" onsubmit="return false;">
          <!--搜索-->
          <div class="form-group">
            <input type="text" class="form-control search" id="search" placeholder="搜索" v-model="keyword" @keyup.enter="search">
            <!--<button type="button" class="btn glyphicon glyphicon-search search-btn" aria-hidden="true"></button>-->
          </div>

        </form>
        <ul class="nav navbar-nav navbar-right nav-right ">
          <li><a href="javascript:void(0)" @click="writeBlog">写博客</a></li>
          <li>
            <a href="/message">
              <i class="fa fa-bell"></i>
              <span class="tip" v-if="unreadMessageCount > 0">{{unreadMessageCount}}</span>
            </a>
          </li>

          <!--已登入-->
          <li class="dropdown" v-if="hasLogin">
            <img class="dropdown-toggle img-circle user-img" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="img" :src="user.img" id="img" >
            <ul class="dropdown-menu">
              <li><a :href="'/user/' + user.id">我的主页</a></li>
              <li><a href="/user/settings/profile">设置</a></li>
              <li role="separator" class="divider"></li>
              <li>
                <a href="javascript:void(0)" id="logout" @click="logout">退出</a>
              </li>
            </ul>
          </li>
          <!--未登入-->
          <li v-else>
            <a href="/login" id="login">登入</a>
          </li>
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
</template>

<script>
  import header from '@/components/header/header'
  // import '../../../static/bootstrap/css/bootstrap.css'
  // import '../../../static/bootstrap/css/bootstrap-theme.css'
  // import '../../../static/css/dropload.css'
  // import '../../../static/font-awesome-4.7.0/css/font-awesome.css'
  // import '../../../static/css/main.css'
  // import '../../../static/css/index.css'
  export default {
    name: 'header',
    components: {
      // 2.注册header
      'v-header': header
    },
    props: ['kw'],
    data () {
      return {
        hasLogin: false, // 是否登录过
        user: [],
        keyword: '',
        unreadMessageCount: 0
      }
    },
    mounted: function () {
      // console.log('kw=' + this.kw)
      // console.log('username=' + this.username + ',password=' + this.password)
      this.getUserInfo()
      this.getUnreadMessageCount()
      // 定时器，每2秒更新
      setInterval(() => {
        this.getUnreadMessageCount()
      }, 2000)
    },
    methods: {
      getUserInfo: function () {
        this.$http.get(`${process.env.API_ROOT}/user/get_user_info.do`).then(response => {
          console.log(response.data)
          // get body data
          // this.someData = response.body;
          if (response.data.status === 0) {
            this.user = response.data.data
            console.log(this.user)
            this.hasLogin = true

            console.log('kw=' + this.kw)

            if (this.kw != null && this.kw.length > 0) {
              // 关键字
              this.keyword = this.kw
            }
          }
        }, response => {
          console.log('error')
        })
      },
      // 获取未读消息数量
      getUnreadMessageCount: function () {
        this.$http.get(`${process.env.API_ROOT}/user/get_unread_message_count.do`).then(response => {
          if (response.data.status === 0) {
            this.unreadMessageCount = response.data.data
          }
        }, response => {
          console.log('error')
        })
      },
      logout: function () {
        this.$http.post(`${process.env.API_ROOT}/user/logout.do`, {}, {emulateJSON: true}).then(response => {
          // 当前页面
          document.location.reload()
          // if (response.data.status === 0) {
          // }
        }, response => {
          console.log('error')
        })
      },
      // 搜索
      search: function () {
        if (this.keyword != null && this.keyword.trim().length > 0) {
          window.location.href = '/search?kw=' + this.keyword
        }
      },
      // 跳转到写博客页面
      writeBlog: function () {
        if (this.hasLogin) {
          window.location.href = '/blog/edit/new'
        } else {
          window.location.href = '/login'
        }
      }
    }
  }
</script>
