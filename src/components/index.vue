<template>
  <div id="app">
    <!--导航条-->
    <v-header @change="handleChange"></v-header>
    <!--内容部分-->
    <div class="container content" id="content">
      <div class="row">
        <!--主页左边-->
        <div class="col-md-8 left-text" >
          <div class="container-fluid blog-content">
            <div class="content">
              <div class="lists" v-for="article in articleList" :key="article.id">
                <!--文章部分-->
                <div class="row">
                  <!--文章头部图片或视频-->
                  <div>
                    <!--如果是视频-->
                    <div v-if="article.isVedio">
                      <video class="img-thumbnail img-responsive center-block article-img" :src="article.articleImg"
                             controls="controls">
                      </video>
                    </div>

                    <!--否则是图片-->
                    <div v-else>
                      <a :href="'/article/'+article.articleId">
                        <img class="img-thumbnail img-responsive center-block article-img" :src="article.articleImg" alt="">
                      </a>
                    </div>
                  </div>
                  <!--<a href="@{'/article/'+${article.articleId}}">-->
                  <!--<a >-->
                  <!--<img class="img-thumbnail img-responsive center-block article-img" src="http://blog.zhangruipeng.me/hexo-theme-icarus/gallery/shoes.jpg" alt="">-->
                  <!--文章内容部分-->
                  <div class="item article-card">
                    <!--用户头像-->
                    <a :href="'/user/'+article.userId">
                      <img class="img-circle article-user-img" v-bind:src="article.userImg" alt="">
                    </a>
                    <span>
        <a :href="'/user/'+article.userId">{{article.userName}}</a>
      <small>{{article.sign}}</small>
      </span>
                    <div class="article">
                      <h3>
                        <a :href="'/article/'+article.articleId">{{article.title}}</a>
                      </h3>
                      <small class="article-type">{{article.categoryName}}</small>
                      <div class="article-content lead">
                        <a :href="'/article/'+article.articleId">
                          {{article.content}}
                        </a>
                      </div>
                      <div class="container">
                        <!--<span class="date">2014-14-14</span>-->
                        <i class="fa  fa-eye">{{article.showCount}}</i>
                        <i class="fa  fa-comment-o">{{article.commentCount}}</i>
                        <i class="fa  fa-star">{{article.loveCount}}</i>
                        <!--<i class="fa  fa-calendar">{{article.createTime}}</i>-->
                        <i class="fa  fa-calendar">{{article.createTime | dateFormat}}</i>
                        <!--calendar-->
                      </div>
                    </div>
                    <!--<span>评论</span>-->
                    <!--<span>2014-14-14</span>-->
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <!--主页右边-->
        <div class="col-md-4 right-text">
          <!--热门用户-->
          <div class="container-fluid hot-user">
            <span>热门用户</span>
            <ul class="form-group">
              <li v-for="popularUser in popularUserList" :key="popularUser.userId">
                <a class="hot-user-img" :href="'/user/'+popularUser.userId">
                  <img class="img-circle" v-bind:src="popularUser.userImg" alt="">
                </a>
                <a class="hot-user-name" :href="'/user/'+popularUser.userId">{{popularUser.userName}}</a>
                <small>写了<span>{{popularUser.count}}</span>篇文章</small>
                <!--<a class="follow" href="">私信</a>-->
              </li>

            </ul>
          </div>

          <!--文章分类-->
          <div class="container-fluid article-category">
            <span>文章分类</span>
            <div class="list-group" >
              <!--<div v-for="category in categoryList" :key="category.id">-->
              <a href="javascript:void(0);" class="category list-group-item"
                 v-for="category in categoryList" :key="category.id"
                 @click="getCategoryArticle(category.name)"
              >
                {{category.name}}
              </a>
              <!--</div>-->

              <!--<a href="/article/search?category=后端" class="category list-group-item">后端</a>-->
              <!--<a href="/article/search?category=Android" class="category list-group-item">Android</a>-->
              <!--<a href="/article/search?category=ios" class="category list-group-item">ios</a>-->
              <!--<a href="/article/search?category=设计" class="category list-group-item">设计</a>-->
              <!--<a href="/article/search?category=工具资源" class="category list-group-item">工具资源</a>-->
              <!--<a href="/article/search?category=未分类" class="category list-group-item">未分类</a>-->
              <!--<a href="/article/search?category=其它" class="category list-group-item">其它</a>-->
            </div>

          </div>

          <!--热门标签-->
          <div class="container-fluid hot-tag">
            <span>热门标签</span>
            <div class="list-group">
              <a href="#" class="list-group-item list-group-item-danger col-lg-3">python</a>
              <a href="#" class="list-group-item list-group-item-info col-lg-3">spring</a>
              <a href="#" class="list-group-item list-group-item-success col-lg-3">java</a>
              <a href="#" class="list-group-item list-group-item-warning col-lg-3">kotlin</a>
              <a href="#" class="list-group-item list-group-item-info col-lg-3">spring</a>
              <a href="#" class="list-group-item list-group-item-success col-lg-3">java</a>
              <a href="#" class="list-group-item list-group-item-warning col-lg-3">kotlin</a>
              <a href="#" class="list-group-item list-group-item-danger col-lg-3">python</a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script >
  import header from '@/components/header/header'
  // import * as time from '../utils/time'
  import {formatTime} from '@/utils/time'

  // import '@/styles/js/dropload'
  export default {
    name: 'newIndex',
    components: {
      // 2.注册header
      'v-header': header
    },
    // 过滤器
    filters: {
      dateFormat (time) {
        return formatTime(time, false)
      }
    },
    data () {
      return {
        articleList: [],
        popularUserList: [],
        categoryList: [], // 分类列表
        links: [
          {
            text: '登入',
            route: '/login'
          },
          {
            text: '注册',
            route: '/register'
          }
        ],
        sort: 'newest' // 文章排序,默认按最新排序
      }
    },
    created () {
      // var self = this
      $(window).scroll(function () {
        let scrollTop = $(this).scrollTop()
        let scrollHeight = $(document).height()
        let windowHeight = $(this).height()
        if (scrollTop + windowHeight === scrollHeight) {
          alert('底部')
        }
      })
    },
    mounted: function () {
      // console.log('username=' + this.username + ',password=' + this.password)
      // 获取文章
      this.init()
      // 热门用户
      this.getPopularUser()

      this.getCategory()
    },
    watch: {
      '$route.query.a': function () {
        // pass
      }
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
      },
      // 初始化文章
      init: function () {
        console.log('path = ' + this.$route.path)
        if (this.$route.path === '/follow') {
          // 获取关注的文章
          this.followArticle()
          console.log('/follow')
        } else if (/category/g.test(this.$route.path)) {
          // /.../.test() 正则表达式g 执行全局匹配
          console.log('/category')
          // console.log('split' + this.$route.path.split('/'))
          // console.log('split' + this.$route.path.split('/')[0])
          // console.log('split' + this.$route.path.split('/')[1])
          // console.log('split' + this.$route.path.split('/')[2])
          // 查找分类文章
          this.getCategoryArticle(this.$route.path.split('/')[2])
        } else {
          this.getIndexArticle()
          console.log('/index')
        }
      },
      getIndexArticle: function () {
        if (this.$route.query.sort === 'popular' || this.$route.query.sort === 'newest') {
          this.sort = this.$route.query.sort
        }
        console.log('here sort= ' + this.sort)
        // 最新文章
        this.$http.get(`${process.env.API_ROOT}/article/list.do?sort=` + this.sort).then(response => {
          console.log(response.data.data.list)
          this.articleList = response.data.data.list
        }, response => {
          console.log('error')
        })
      },
      // 当点击搜索时触发
      handleChange: function (article) {
        this.articleList = article
        console.log('this.articleList=' + this.articleList)
        console.log(this.articleList === null)
        console.log(this.articleList == null)
        console.log(this.articleList.length === 0)
      },
      // 获取分类
      getCategory: function () {
        // 请求登入
        this.$http.get(`${process.env.API_ROOT}/category/list.do`).then(response => {
          console.log('分类：')
          console.log(response.data)
          if (response.data.status === 0) {
            this.categoryList = response.data.data
          }
        }, response => {
          console.log('error')
        })
      },
      // 关注用户的文章
      followArticle: function () {
        this.$http.get(`${process.env.API_ROOT}/article/follow.do`).then(response => {
          if (response.data.status === 0) {
            console.log('关注的用户文章：')
            console.log(response.data.data)
            this.articleList = response.data.data.list
          } else if (response.data.status === 10) {
            // 未登入
            window.location.href = '/login'
          } else {
            alert('error')
          }
        }, response => {
          console.log('error')
        })
      },
      // 获取分类文章
      getCategoryArticle: function (categoryName) {
        this.$http.get(`${process.env.API_ROOT}/article/get_category_article.do?categoryName=` + categoryName).then(response => {
          if (response.data.status === 0) {
            console.log('关注的用户文章：')
            console.log(response.data.data)
            // 修改url,replaceState是将指定的URL替换当前的URL,window.location.pathname获取当前url地址
            // window.history.pushState(
            //   'index',
            //   // {'index'},
            //   document.title,
            //   window.location.pathname + '/category/' + categoryName
            // )

            window.history.replaceState(
              {category: ''},
              document.title,
              // window.location.pathname + '?category/' + categoryName
              '/category/' + categoryName
            )

            this.articleList = response.data.data.list
          } else {
            alert('error')
          }
        }, response => {
          console.log('error')
        })
      }
    }
  }
</script>

<style scoped>
</style>
