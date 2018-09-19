<template>
  <!--导航条-->
  <b-navbar toggleable="md" class="header" fixed="top">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="/" style="color: #0084ff">
      MeowNest
    </b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item href="/index?sort=newest" class="nav-item">首页</b-nav-item>
        <b-nav-item href="/index?sort=popular" class="nav-item">热门</b-nav-item>
        <b-nav-item href="/follow" class="nav-item">关注</b-nav-item>
        <b-nav-item href="/message" class="nav-item">
          消息<b-badge variant="danger" class="message-icon" v-if="unreadMessageCount > 0">{{ unreadMessageCount }}</b-badge>
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-form  onsubmit="return false;">
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="" style="width: 304px" v-model="keyword"  @keyup.enter.native="search" />
          <b-button size="sm" class="my-2 my-sm-0" type="button" style="background: #0084ff;border: 0;padding: 6px 14px" @click="search">搜索</b-button>
        </b-nav-form>

        <b-navbar-nav right>
          <!--<b-button variant="success" size="sm">写博客</b-button>-->
          <b-nav-item href="javascript:void(0)" @click="writeBlog" style="padding: 0 15px;line-height: 60px">写博客</b-nav-item>
        </b-navbar-nav>

        <b-nav-item-dropdown right  v-if="hasLogin">
          <!-- Using button-content slot -->
          <template slot="button-content">
            <!--<em>User</em>-->
            <b-img rounded="circle" width="48" height="48" :src="user.img" alt="img" class="img"/>
          </template>
          <b-dropdown-item :href="'/user/' + user.id">我的主页</b-dropdown-item>
          <b-dropdown-item href="/user/settings/profile">个人设置</b-dropdown-item>
          <b-dropdown-item href="javascript:void(0)" @click="logout">退出</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-navbar-nav right v-else>
          <!--<b-button variant="success" size="sm">写博客</b-button>-->
          <b-nav-item href="/login" style="line-height: 60px;padding: 0 15px">登入</b-nav-item>
        </b-navbar-nav>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>

  <!-- navbar-1.vue -->
</template>

<script>
  export default {
    name: 'header',
    components: {
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
            // alert(this.keyword)
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

<style scoped>
  .header{
    height: 60px;
    padding: 0 16px;
    /*background: #ccc;*/
    background: #fff;
    /*opacity: 0;*/
    box-shadow: 0 1px 3px rgba(26,26,26,.1);
    /*margin-bottom: 500px;*/
    color: #444;
    min-width: 1000px;
    /*overflow: hidden;*/
  }
  .img{
    padding: 0;
  }
  .nav-item{
    padding: 8px;
    color: #444;
  }
  .message-icon{
    position: relative;
    top: -6px;
    border-radius: 50px;
    /*margin-top: 5px;*/
  }
</style>
