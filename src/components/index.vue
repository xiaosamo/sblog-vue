<template>
  <div id="app">
    <!--导航条-->
    <v-header @change="handleChange"></v-header>
    <!--内容部分-->
    <div class="container content" id="content" @scroll="handleScroll()">
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
                    <!--<div v-if="article.isVedio">-->
                      <!--<video class="img-thumbnail img-responsive center-block article-img" :src="article.articleImg"-->
                             <!--controls="controls">-->
                      <!--</video>-->
                    <!--</div>-->

                    <!--否则是图片-->
                    <div>
                      <a :href="'/article/'+article.id">
                        <img class="img-thumbnail img-responsive center-block article-img" :src="article.articleImg" alt="">
                      </a>
                    </div>
                  </div>
                  <!--<a href="@{'/article/'+${article.articleId}}">-->
                  <!--<a >-->
                  <!--<img class="img-thumbnail img-responsive center-block article-img" src="http://blog.zhangruipeng.me/hexo-theme-icarus/gallery/shoes.jpg"alt="">-->

                  <!--文章内容部分-->
                  <div class="item article-card">
                    <!--用户头像-->
                    <a :href="'/user/'+article.user.id">
                      <img class="img-circle article-user-img" v-bind:src="article.user.avatar" alt="">
                    </a>
                    <span>
                        <a :href="'/user/'+article.user.id">{{article.user.name}}</a>
                        <!--<small>{{article.sign}}</small>-->
                    </span>
                    <div class="article">
                      <h3>
                        <a :href="'/article/'+article.id">{{article.title}}</a>
                      </h3>
                      <small class="article-type">{{article.category.name}}</small>
                      <div class="article-content lead">
                        <a :href="'/article/'+article.id" >
                          <div v-html="article.content.substring(0,280)">
                          </div>
                          <!--{{article.content}}-->
                        </a>
                      </div>
                      <div class="container">
                        <!--<span class="date">2014-14-14</span>-->
                        <i class="fa  fa-eye">{{article.viewCount}}</i>
                        <i class="fa  fa-comment-o">{{article.commentCount}}</i>
                        <i class="fa  fa-star">{{article.likedCount}}</i>
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
            <ul class="list-group mb-3">
              <li class="list-group-item d-flex justify-content-between lh-condensed popular-user" v-for="user in popularUserList" :key="user.id">
                <div>
                  <!--<h6 class="my-0">Product name</h6>-->
                  <a :href="'/user/'+user.id">
                    <b-img rounded="circle" width="48" height="48" :src="user.avatar" alt="img" class="img"/>
                  </a>
                  <a :href="'/user/'+user.id">
                    <small class="text-muted">{{user.name}}</small>
                  </a>
                </div>
                <div>
                  <!--<span class="text-muted" style="">获赞数 520 </span>-->
                  <span class="text-muted" style="vertical-align:middle;padding-top: 20px;">写了{{user.articleNum}}篇文章</span>

                </div>
              </li>
            </ul>

          </div>

          <!--文章分类-->
          <div class="container-fluid article-category">
            <span>文章分类</span>
            <div class="list-group" >
              <!--<div v-for="category in categories" :key="category.id">-->
              <a href="javascript:void(0);" class="category list-group-item"
                 v-for="category in categories" :key="category.id"
                 @click="getCategoryArticle(category.id)"
              >
                {{category.name}}
              </a>

            </div>

          </div>

          <!--热门标签-->
          <div class="container-fluid hot-tag">
            <span style="margin-bottom: 5px;">热门标签</span>
            <div>
              <span :class="tag.cssClass" style="margin-right: 3px;margin-top: 8px;" v-for="tag in tags" :key="tag.id">{{tag.name}}</span>
              <!--<span class="badge badge-secondary">Bootstrap</span>-->
              <!--<span class="badge badge-success">Success</span>-->
              <!--<span class="badge badge-danger">SpringBoot</span>-->
              <!--<span class="badge badge-warning">Warning</span>-->
              <!--<span class="badge badge-info">Info</span>-->
              <!--<span class="badge badge-light">Light</span>-->
              <!--<span class="badge badge-dark">Dark</span>-->

              <!--<span class="badge badge-primary">Primary</span>-->
              <!--<span class="badge badge-secondary">Secondary</span>-->
              <!--<span class="badge badge-success">Success</span>-->
              <!--<span class="badge badge-danger">Danger</span>-->
              <!--<span class="badge badge-warning">Warning</span>-->
              <!--<span class="badge badge-info">Info</span>-->
              <!--<span class="badge badge-light">Light</span>-->
              <!--<span class="badge badge-dark">Dark</span>-->
            </div>
            <!--<div class="list-group">-->
              <!--<a href="#" class="list-group-item list-group-item-danger col-lg-3">python</a>-->
              <!--<a href="#" class="list-group-item list-group-item-info col-lg-3">spring</a>-->
              <!--<a href="#" class="list-group-item list-group-item-success col-lg-3">java</a>-->
              <!--<a href="#" class="list-group-item list-group-item-warning col-lg-3">kotlin</a>-->
              <!--<a href="#" class="list-group-item list-group-item-info col-lg-3">spring</a>-->
              <!--<a href="#" class="list-group-item list-group-item-success col-lg-3">java</a>-->
              <!--<a href="#" class="list-group-item list-group-item-warning col-lg-3">kotlin</a>-->
              <!--<a href="#" class="list-group-item list-group-item-danger col-lg-3">python</a>-->
            <!--</div>-->
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script >
  import header from '@/components/header/header'
  import * as toastr from '@/styles/toastr/toastr.min'
  // import * as time from '../utils/time'
  import {formatTime} from '@/utils/time'
  import store from '../store/user'

  // import BScroll from 'better-scroll'
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
        articleTotal: '', // 所有文章数量
        pageNum: 1,
        articleList: [],
        popularUserList: [],
        categories: [], // 分类列表
        categoryId: 10000,
        tags: [], // 标签
        url: '/list?sort=newest', // 当前url
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
      // window.onscroll = function(){
      //   // 变量scrollTop是滚动条滚动时，距离顶部的距离
      //   var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
      //   // 变量windowHeight是可视区的高度
      //   var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      //   // 变量scrollHeight是滚动条的总高度
      //   var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
      //   console.log("scrollTop + windowHeight = "+ (scrollTop + windowHeight) + " , scrollHeight = " + scrollHeight);
      //
      //   // 滚动条到底部的条件
      //   if (scrollTop + windowHeight >= scrollHeight){
      //     alert("到底部...");
      //     alert("article = " + this.articleList)
      //     // this.articleList.push(this.articleList[0])
      //     // console.log('到底部...')
      //     // console.log(this.sort)
      //     // alert('底部')
      //     // 写后台加载数据的函数
      //     // console.log("距顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);
      //   }
      // }
    },
    mounted: function () {
      // 加载更多
      window.addEventListener('scroll', this.handleScroll)
      // console.log('username=' + this.username + ',password=' + this.password)
      // 获取文章
      this.init()
      // 热门用户
      this.getPopularUser()

      // 获取分类
      this.getCategories()

      // 获取标签
      this.getTags()
    },
    watch: {
      $route (to, from) {
        // 当url改变时，根据不同url做出决定
        // alert('to=' + to.path + ', from=' + from.path)
        this.init()
      }
    },
    methods: {
      handleScroll: function () {
        // 变量scrollTop是滚动条滚动时，距离顶部的距离
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        // 变量windowHeight是可视区的高度
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight
        // 变量scrollHeight是滚动条的总高度
        var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
        // console.log("scrollTop + windowHeight = "+ (scrollTop + windowHeight) + " , scrollHeight = " + scrollHeight);
        // if (scrollTop === 0 ) {
        //   alert('scrollTop');
        // }
        // if (windowHeight === 0 ) {
        //   alert('windowHeight');
        // }
        // if (scrollHeight === 0 ) {
        //   alert('scrollHeight');
        // }
        // 滚动条到底部的条件
        if (Math.ceil(scrollTop + windowHeight) >= scrollHeight && scrollTop !== 0) {
          // TODO
          // this.pageNum = Math.ceil(this.articleList.length / 10 + 1)
          if (this.articleList.length < this.articleTotal) {
            // alert("加载第" + (this.pageNum + 1) + "页")
            this.getMoreArticle(this.pageNum + 1)
          }

          // alert(this.articleList.length)
          // alert("到底部...");
          // alert("article = " + this.articleList[1].title);
          // this.articleList.push(this.articleList[1]);
          // console.log('到底部...')
          // console.log(this.sort)
          // alert('底部')
          // 写后台加载数据的函数
          // console.log("距顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);
        }
      },
      getPopularUser: function () {
        this.pageNum = 1
        this.$http.get(`${process.env.API_ROOT}/user/getPopularUser`).then(response => {
          this.popularUserList = response.data.data
          // get body data
          // this.someData = response.body;
        }, response => {
          console.log('error')
        })
      },
      // 初始化文章
      init: function () {
        this.pageNum = 1
        // alert('path' + this.$route.path + '，  sort=' + this.$route.query.sort)
        // console.log('path = ' + this.$route.path)
        // console.log('rememberMe')
        // console.log(this.$cookies.get('rememberMe'))
        if (this.$route.path === '/subscribe') {
          // 获取用户关注订阅的文章
          this.followArticle()
        } else if (this.$route.path === '/' || this.$route.path === '/index') {
          // /index
          this.getIndexArticle()
        } else if (/category/g.test(this.$route.path)) {
          // alert('分类')
          // /.../.test() 正则表达式g 执行全局匹配
          console.log('/category')
          console.log('split' + this.$route.path.split('/'))
          // console.log('split' + this.$route.path.split('/')[0])
          console.log('split' + this.$route.path.split('/')[1])
          // console.log('split' + this.$route.path.split('/')[2])
          // 查找分类文章
          this.getCategoryArticle(this.$route.path.split('/')[2])
        } else {

        }
      },
      getIndexArticle: function () {
        this.pageNum = 1
        this.sort = this.$route.query.sort
        // 验证sort参数
        if (this.sort !== undefined) {
          if (this.sort !== 'popular' && this.sort !== 'newest') {
            // sort参数不正确
            toastr.error('invalid sort: ' + this.sort)
            return
          }
        }
        var url = `${process.env.API_ROOT}/article/list`
        this.url = '/list?sort=newest'
        if (this.sort !== undefined) {
          url = url + `?sort=` + this.sort
          this.url = '/list?sort=' + this.sort
        }
        // 最新文章
        this.$http.get(url).then(response => {
          if (response.data.status === 0) {
            this.articleList = response.data.data.list
            // alert(this.articleList[0].user[0].avatar)
            this.articleTotal = response.data.data.total
          }
        }, response => {
          console.log('error')
        })
      },
      // 下拉加载更多文章
      getMoreArticle: function (pageNum) {
        if (this.sort === undefined) {
          this.sort = 'newest'
        }
        // alert(this.$route.path + " " + this.$route.params)
        // alert(this.$route.path)
        // alert(this.url)
        // alert(window.location.href)

        this.$http.get(`${process.env.API_ROOT}/article` + this.url + `&pageNum=` + pageNum).then(response => {
        // this.$http.get(`${process.env.API_ROOT}/article/list?sort=` + this.sort + `&pageNum=` + pageNum).then(response => {
        if (response.data.status === 0) {
          // alert("length =" + response.data.data.list.length)
          // this.articleList = this.articleList +    response.data.data.list
          for (var i = 0; i < response.data.data.list.length; i++) {
            this.articleList.push(response.data.data.list[i])
          }
          this.pageNum = response.data.data.pageNum
          // this.articleList.push(response.data.data.list)
          // console.log("下拉加载更多的数据:")
          // console.log(response.data.data.list)
          // console.log("list现在的数据 ：")
          // console.log(this.articleList)
        }
        }, response => {
          console.log('加载更多文章失败')
        });
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
      getCategories: function () {
        this.$http.get(`${process.env.API_ROOT}/categories`).then(response => {
          if (response.data.status === 0) {
            this.categories = response.data.data
          }
        }, response => {
          console.log('error')
        })
      },
      // 获取所有的标签
      getTags: function () {
        this.$http.get(`${process.env.API_ROOT}/tags`).then(response => {
          if (response.data.status === 0) {
            this.tags = response.data.data
          }
        }, response => {
          console.log('error')
        })
      },
      // 获取用户关注对象的文章
      followArticle: function () {
        this.url = '/getFollowArticle'
        this.$http.get(`${process.env.API_ROOT}/article/getFollowArticle`).then(response => {
          if (response.data.status === 0) {
            this.articleList = response.data.data.list
            this.articleTotal = response.data.data.total
          } else if (response.data.status === 10) {
            // 未登录
            this.$router.push({
              path: '/login',
              query: {
                redirect: this.$router.currentRoute.fullPath
              }
            })
          } else {
            alert('error')
          }
        }, response => {
          console.log('error')
        })
      },
      // 获取分类文章
      getCategoryArticle: function (categoryId) {
        this.categoryId = categoryId
        this.url = `/getCategoryArticles?categoryId=` + categoryId
        this.$http.get(`${process.env.API_ROOT}/article/getCategoryArticles?categoryId=` + categoryId).then(response => {
          if (response.data.status === 0) {
            console.log('关注的用户文章：')
            console.log(response.data.data)
            // 修改url,replaceState是将指定的URL替换当前的URL,window.location.pathname获取当前url地址
            // window.history.pushState(
            //   'index',
            //   // {'index'},
            //   document.title,
            //   window.location.pathname + '/category/' + categoryId
            // )

            window.history.replaceState(
              {category: ''},
              document.title,
              // window.location.pathname + '?category/' + categoryId
              '/category/' + categoryId
            )

            this.articleList = response.data.data.list
            this.articleTotal = response.data.data.total
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
  .popular-user{
    border: none;
    padding: 5px;
  }
</style>
