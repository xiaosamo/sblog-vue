<template>
  <div id="app">
    <!--导航条-->
    <!--定义一个方法来监听子组件的状态-->
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
                      <small class="article-type">{{article.categoryName}}</small>
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
            <!--<span>热门用户</span>-->
            <!--<ul class="form-group">-->
              <!--<li v-for="popularUser in popularUserList" :key="popularUser.userId">-->
                <!--<a class="hot-user-img" :href="'/user/'+popularUser.userId">-->
                  <!--<img class="img-circle" v-bind:src="popularUser.userImg" alt="">-->
                <!--</a>-->
                <!--<a class="hot-user-name" :href="'/user/'+popularUser.userId">{{popularUser.userName}}</a>-->
                <!--<small>写了<span>{{popularUser.count}}</span>篇文章</small>-->
                <!--&lt;!&ndash;<a class="follow" href="">私信</a>&ndash;&gt;-->
              <!--</li>-->

            <!--</ul>-->
            <span>热门用户</span>
            <ul class="list-group mb-3">
              <li class="list-group-item d-flex justify-content-between lh-condensed popular-user" v-for="user in popularUserList" :key="user.id">
                <div>
                  <!--<h6 class="my-0">Product name</h6>-->
                  <b-img rounded="circle" width="48" height="48" :src="user.avatar" alt="img" class="img"/>
                  <small class="text-muted">{{user.name}}</small>
                </div>
                <div>
                  <!--<span class="text-muted" style="">获赞数 520 </span>-->
                  <span class="text-muted" style="">访问量 100</span>

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
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script >
  import header from '@/components/header/header'
  import {formatTime} from '../../utils/time'
  // import '../../static/js/dropload'
  export default {
    name: 'index',
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
        articleTotal: 0,
        popularUserList: [],
        categories: [], // 分类列表
        tags: [], // 标签
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
        // 搜索词
        query: '',
        categoryId: 10000,
      }
    },
    mounted: function () {
      this.query = this.$route.query.query
      // 搜索
      this.search()
      // alert(this.query)
      // 获取首页文章
      // this.getIndexArticle()
      // 热门用户
      this.getPopularUser()
      this.getCategories()

      // 获取标签
      this.getTags()
    },
    watch: {
      // 'query': function (now) {
      //   监听query的变化
        // alert('query=' + now)
      // }
      $route () {
        // 监听路由参数query的变化
        this.query = this.$route.query.query
        this.search()
        // alert(this.query)
      }
    },
    methods: {
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
      getIndexArticle: function () {
        // 请求登入
        this.$http.get(`${process.env.API_ROOT}/article/list.do?sort=newest`).then(response => {
          console.log(response.data.data.list)
          this.articleList = response.data.data.list
          console.log('time = ' + formatTime(1535532912000, false))
          // console.log('time = ' + time.formatTime(this.articleList[0].createTime, false))
          // get body data
          // this.someData = response.body;
        }, response => {
          console.log('error')
        })
      },
      getPopularArticle: function () {
        // 请求登入
        this.$http.get(`${process.env.API_ROOT}/article/list.do?sort=popular`).then(response => {
          console.log(response.data.data.list)
          this.articleList = response.data.data.list
          // get body data
          // this.someData = response.body;
        }, response => {
          console.log('error')
        })
      },
      // 当点击搜索时触发
      handleChange: function (query) {
        // query就是子组件传过来的值
        // this.query = query
        // alert(this.query)
        // this.articleList = article
        // console.log('this.articleList=' + this.articleList)
        // console.log(this.articleList === null)
        // console.log(this.articleList == null)
        // console.log(this.articleList.length === 0)
      },
      // 获取分类
      getCategories: function () {
        // 请求登入
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
      // 搜索
      search: function () {
        this.$http.get(`${process.env.API_ROOT}/article/search?query=` + this.query).then(response => {
          if (response.data.status === 0) {
            // alert('222')
            // alert(this.query)
            // alert('回车，kw=' + this.query)
            this.articleList = response.data.data
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
</style>
