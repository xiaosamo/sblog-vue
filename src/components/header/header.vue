<template>
  <!--导航条-->
  <b-navbar toggleable="md" class="header" fixed="top">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="/" style="color: #0084ff">
      MeowNest
    </b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item class="nav-item" @click="handlerNewest()">首页</b-nav-item>
        <b-nav-item class="nav-item" @click="handlePopular()">热门</b-nav-item>
        <b-nav-item class="nav-item" @click="handleFollow()">关注</b-nav-item>
        <b-nav-item href="/message" class="nav-item">
          消息<b-badge variant="danger" class="message-icon" v-if="unreadMessageCount > 0">{{ unreadMessageCount }}</b-badge>
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-form  onsubmit="return false;">
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="" style="width: 304px" v-model="query"  @keyup.enter.native="search" />
          <b-button size="sm" class="my-2 my-sm-0" type="button" style="background: #0084ff;border: 0;padding: 6px 14px" @click="search">搜索</b-button>
        </b-nav-form>

        <b-navbar-nav right>
          <!--<b-button variant="success" size="sm">写博客</b-button>-->
          <b-nav-item href="javascript:void(0)" @click="writeBlog" style="padding: 0 15px;line-height: 60px">写博客</b-nav-item>
        </b-navbar-nav>

        <b-nav-item-dropdown right  v-if="isLogin">
          <!-- Using button-content slot -->
          <template slot="button-content">
            <!--<em>User</em>-->
            <!--<img alt="" :src="user.portrait" width="48">-->
            <!--<img src="http://b-ssl.duitang.com/uploads/item/201810/13/20181013112906_tqoat.thumb.700_0.jpg" alt="" width="48">-->
            <b-img rounded="circle" width="48" height="48" :src="user.avatar" alt="img" class="img"/>
          </template>
          <b-dropdown-item :href="'/user/' + user.id">我的主页</b-dropdown-item>
          <b-dropdown-item href="/user/settings">个人设置</b-dropdown-item>
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
  import store from '@/store/store'
  export default {
    name: 'header',
    components: {
    },
    // props: ['q'],
    data () {
      return {
        isLogin: false, // 是否登录过
        user: {},
        query: '',
        unreadMessageCount: 0
      }
    },
    mounted: function () {
      // 获取登录信息
      this.user = store.getters.getUser
      this.isLogin = store.getters.isLogin

      this.query = this.$route.query.query

      // console.log('query=' + this.query)
      // this.getLoginUser()
      // this.getUnreadMessageCount()
      // 定时器，每2秒更新
      // setInterval(() => {
      //   this.getUnreadMessageCount()
      // }, 2000)
    },
    methods: {
      // 处理关注的文章
      handleFollow: function () {
        this.$router.replace('/subscribe')
      },
      handlerNewest: function () {
        this.$router.replace('/index?sort=newest')
      },
      handlePopular: function () {
        this.$router.replace('/index?sort=popular')
      },
      // getLoginUser: function () {
      //   this.$http.get(`${process.env.API_ROOT}/user/get_login_user`).then(response => {
      //     console.log(response.data)
      //     // this.someData = response.body;
      //     if (response.data.status === 0) {
      //       this.user = response.data.data
      //       this.isLogin = true
      //       console.log('query=' + this.query)
      //       if (this.query != null && this.query.length > 0) {
      //         // 关键字
      //         // this.query = this.query
      //       }
      //     }
      //   }, response => {
      //     console.log('error')
      //   })
      // },
      // 获取未读消息数量
      // getUnreadMessageCount: function () {
      //   this.$http.get(`${process.env.API_ROOT}/user/get_unread_message_count.do`).then(response => {
      //     if (response.data.status === 0) {
      //       this.unreadMessageCount = response.data.data
      //     }
      //   }, response => {
      //     console.log('error')
      //   })
      // },
      // 退出
      logout: function () {
        // 清空用户信息
        store.commit('signOut')
        this.$http.get(`${process.env.API_ROOT}/logout`, {}, {emulateJSON: true}).then(response => {
          if (response.data.status === 0) {
            // 当前页面
            document.location.reload()
          } else {
            alert('退出登录失败')
          }
        }, response => {
          console.log('error')
        })
      },
      // 点击搜索按钮
      search: function () {
        // 子组件传递给父组件
        if (this.query != null && this.query.trim().length > 0) {
          // this.$emit('query', this.query)
          // alert(this.query)
          this.$router.push({path: '/search', query: {query: this.query}})
        }
      },
      // 跳转到写博客页面
      writeBlog: function () {
        if (this.isLogin) {
          this.$router.push({path: '/write'})
        } else {
          // 未登录
          this.$router.push({
            path: '/login',
            query: {
              redirect: this.$router.currentRoute.fullPath
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .header{
    height: 60px;
    padding: 0 54px;
    /*background: #ccc;*/
    background: #fff;
    /*opacity: 0;*/
    box-shadow: 0 1px 3px rgba(26,26,26,.1);
    /*margin-bottom: 500px;*/
    color: #444;
    margin: 0 auto;
    min-width: 1100px;
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
