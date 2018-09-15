<template>

  <!--<div id="app">-->
    <!--<router-view></router-view>-->
  <!--</div>-->
  <!--<div>-->
    <!--<ul>-->
      <!--<li v-for="item in links" :key="item.index"><a @click="$goRoute(item.route)" >{{item.text}}</a></li>-->
    <!--</ul>-->
    <router-view></router-view>
  <!--</div>-->
  <!--<div id="app">-->
    <!--导航条22222-->
    <!--<v-header></v-header>-->
    <!--&lt;!&ndash;内容部分&ndash;&gt;-->
    <!--<div class="container content" id="content">-->
      <!--&lt;!&ndash;主页左边&ndash;&gt;-->
      <!--<div class="col-md-8 left-text">-->
      <!--<div class="container-fluid blog-content">-->
        <!--<div class="content">-->
          <!--<div class="lists" v-for="article in articleList" :key="article.id">-->
            <!--&lt;!&ndash;文章部分&ndash;&gt;-->
            <!--<div class="row">-->
              <!--&lt;!&ndash;文章头部图片或视频&ndash;&gt;-->
              <!--&lt;!&ndash;<div if="${!#strings.isEmpty(article.articleImg)}">&ndash;&gt;-->
              <!--&lt;!&ndash;如果是视频&ndash;&gt;-->
              <!--&lt;!&ndash;<div if="${article.isVedio}">&ndash;&gt;-->
              <!--&lt;!&ndash;<video class="img-thumbnail img-responsive center-block article-img"&ndash;&gt;-->
              <!--&lt;!&ndash;src="${article.articleImg}"&ndash;&gt;-->
              <!--&lt;!&ndash;controls="controls">&ndash;&gt;-->
              <!--&lt;!&ndash;</video>&ndash;&gt;-->
              <!--&lt;!&ndash;</div>&ndash;&gt;-->

              <!--&lt;!&ndash;否则是图片&ndash;&gt;-->
              <!--&lt;!&ndash;<div unless="${article.isVedio}">&ndash;&gt;-->
              <!--&lt;!&ndash;<a href="@{'/article/'+${article.articleId}}">&ndash;&gt;-->
              <!--&lt;!&ndash;<img class="img-thumbnail img-responsive center-block article-img"&ndash;&gt;-->
              <!--&lt;!&ndash;src="${article.articleImg}" alt="">&ndash;&gt;-->
              <!--&lt;!&ndash;</a>&ndash;&gt;-->
              <!--&lt;!&ndash;<img class="img-thumbnail img-responsive center-block article-img" src="http://blog.zhangruipeng.me/hexo-theme-icarus/gallery/shoes.jpg" alt="">&ndash;&gt;-->
              <!--&lt;!&ndash;</div>&ndash;&gt;-->
              <!--&lt;!&ndash;<a href="@{'/article/'+${article.articleId}}">&ndash;&gt;-->
              <!--&lt;!&ndash;<a >&ndash;&gt;-->

              <!--&lt;!&ndash;<img class="img-thumbnail img-responsive center-block article-img" src="http://blog.zhangruipeng.me/hexo-theme-icarus/gallery/shoes.jpg" alt="">&ndash;&gt;-->
            <!--</div>-->
            <!--&lt;!&ndash;文章内容部分&ndash;&gt;-->
            <!--<div class="item article-card">-->
              <!--&lt;!&ndash;用户头像&ndash;&gt;-->
              <!--<a href="@{'/user/'+${article.bloggerId}}">-->
                <!--<img class="img-circle article-user-img" v-bind:src="article.userImg" alt="">-->
              <!--</a>-->
              <!--<span>-->
                                <!--<a href="@{'/user/'+${article.bloggerId}}">{{article.userName}}</a>-->
                                <!--<small text="${article.bloggerSign}">{{article.sign}}</small>-->
                            <!--</span>-->
              <!--<div class="article">-->
                <!--<h3><a href="@{'/article/'+${article.articleId}}" text="${article.articleTitle}">{{article.title}}</a></h3>-->
                <!--<small class="article-type" text="${article.categoryName}">JAVA</small>-->
                <!--<div class="article-content lead" >-->
                  <!--<a href="@{'/article/'+${article.articleId}}" text="${article.articleSummary}" >-->
                    <!--{{article.content}}-->
                  <!--</a>-->

                <!--</div>-->
                <!--<div class="container">-->
                  <!--&lt;!&ndash;<span class="date">2014-14-14</span>&ndash;&gt;-->
                  <!--<i class="fa  fa-eye" text="${article.articleShowCount}">12</i>-->
                  <!--<i class="fa  fa-comment-o" text="${article.articleCommentCount}">12</i>-->
                  <!--<i class="fa  fa-star" text="${article.articleLoveCount}">12</i>-->
                  <!--<i class="fa  fa-calendar" text="${#dates.format(article.createTime, 'yyyy-MM-dd')}">2018-6-1</i>-->
                  <!--&lt;!&ndash;calendar&ndash;&gt;-->
                <!--</div>-->

              <!--</div>-->

              <!--&lt;!&ndash;<span>评论</span>&ndash;&gt;-->
              <!--&lt;!&ndash;<span>2014-14-14</span>&ndash;&gt;-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
      <!--&lt;!&ndash;主页右边&ndash;&gt;-->
      <!--<div class="col-md-4 right-text">-->
        <!--&lt;!&ndash;热门用户&ndash;&gt;-->
        <!--<div class="container-fluid hot-user">-->
          <!--<span>热门用户</span>-->
          <!--<ul class="form-group">-->
            <!--<li v-for="popularUser in popularUserList" :key="popularUser.userId">-->
              <!--<a class="hot-user-img" href="'/user/'+${hotUser.bloggerId}}">-->
                <!--<img class="img-circle" v-bind:src="popularUser.userImg"  alt="">-->
              <!--</a>-->
              <!--<a class="hot-user-name" href="@{'/user/'+${hotUser.bloggerId}}">{{popularUser.userName}}</a>-->
              <!--<small>写了<span text="${hotUser.count}">{{popularUser.count}}</span>篇文章</small>-->
              <!--&lt;!&ndash;<a class="follow" href="">私信</a>&ndash;&gt;-->
            <!--</li>-->

          <!--</ul>-->
        <!--</div>-->

        <!--&lt;!&ndash;文章分类&ndash;&gt;-->
        <!--<div class="container-fluid article-category">-->
          <!--<span>文章分类</span>-->
          <!--<div class="list-group">-->

            <!--<a href="@{'/article/search?category=' + ${type.categoryName}}" class="category list-group-item">-->
              <!--前端-->
            <!--</a>-->
            <!--<a href="/article/search?category=后端" class="category list-group-item">后端</a>-->
            <!--<a href="/article/search?category=Android" class="category list-group-item">Android</a>-->
            <!--<a href="/article/search?category=ios" class="category list-group-item">ios</a>-->
            <!--<a href="/article/search?category=设计" class="category list-group-item">设计</a>-->
            <!--<a href="/article/search?category=工具资源" class="category list-group-item">工具资源</a>-->
            <!--<a href="/article/search?category=未分类" class="category list-group-item">未分类</a>-->
            <!--<a href="/article/search?category=其它" class="category list-group-item">其它</a>-->
          <!--</div>-->

        <!--</div>-->

        <!--&lt;!&ndash;热门标签&ndash;&gt;-->
        <!--<div class="container-fluid hot-tag">-->
          <!--<span>热门标签</span>-->
          <!--<div class="list-group">-->
            <!--<a href="#" class="list-group-item list-group-item-danger col-lg-3">python</a>-->
            <!--<a href="#" class="list-group-item list-group-item-info col-lg-3" >spring</a>-->
            <!--<a href="#" class="list-group-item list-group-item-success col-lg-3">java</a>-->
            <!--<a href="#" class="list-group-item list-group-item-warning col-lg-3">kotlin</a>-->
            <!--<a href="#" class="list-group-item list-group-item-info col-lg-3" >spring</a>-->
            <!--<a href="#" class="list-group-item list-group-item-success col-lg-3">java</a>-->
            <!--<a href="#" class="list-group-item list-group-item-warning col-lg-3">kotlin</a>-->
            <!--<a href="#" class="list-group-item list-group-item-danger col-lg-3">python</a>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
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
      // 请求登入
      this.$http.get(`${process.env.API_ROOT}/article/list.do?sort=newest`).then(response => {
        console.log(response.data.data.list)
        this.articleList = response.data.data.list
        // get body data
        // this.someData = response.body;
      }, response => {
        console.log('error')
      })
      // 热门用户
      this.getPopularUser()
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
