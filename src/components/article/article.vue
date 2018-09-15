<template>
  <div>
    <!--导航条-->
    <v-header></v-header>
    <!--博客内容-->
    <div class="container" id="content">

      <div class="blog-header">
        <h1 class="blog-title">{{article.title}}</h1>
        <!--<input type="hidden" id="articleId" value="${article.articleId}" attr="articleId=${article.articleId}">-->
        <!--<input type="hidden" id="username" value="${blogger.bloggerUsername}">-->
        <!--<input type="hidden" id="isLove" value="${isLove}">-->
        <!--<p class="lead blog-description">The official example template of creating a blog with Bootstrap.</p>-->
      </div>

      <div class="row">

        <div class="col-sm-8 blog-main">
          <div class="blog-post">
            <div class="blog-top">
              <a href="@{'/user/'+${articleBlogger.bloggerId}}">
                <img class="img-circle user-img img"  :src="article.userImg"  alt="">
              </a>
              <!--<p class="blog-post-meta">2018-6-1 <a href="#"></a></p>-->

              <a href="@{'/user/'+${articleBlogger.bloggerId}}" class="article-use">{{article.name}}</a>
              <a :href="'/blog/edit/'+article.id" class="article-edit" v-if="isUser">编辑</a>
              <a href="javascript:void(0)" id="user-delete" class="user-delete" v-if="isUser" @click="delArticle(article.id)">删除</a>

              <small class="time">{{ article.createTime | dateFormat}}</small>
            </div>

            <!--文章内容部分-->
            <div id="main-content"  v-html="article.htmlContent">
            </div><!-- /.blog-post -->

          </div>
          <!--<nav>-->
          <!--<ul class="pager">-->

          <!--<li><a href="#">上一篇</a></li>-->
          <!--<li><a href="#">下一篇</a></li>-->
          <!--</ul>-->
          <!--</nav>-->

          <!--喜欢按钮-->
          <div class="btn like-group">
            <a href="javascript:void(0)" id="loveArticle">
              <!--喜欢的-->
              <div v-if="article.isLove" id="Like" @click="love('delete', article.id)">
              <i class="fa fa-heart"></i>    喜欢 | <span class="like-count">{{article.loveCount}}</span>
              </div>
              <!--没喜欢-->
              <div v-else id="notLike" @click="love('increase', article.id)">
                <i class="fa fa-heart-o" ></i>    喜欢 | <span class="like-count">{{article.loveCount}}</span>
              </div>
              <!--<div  id="Like">-->
              <!--<i class="fa fa-heart-o"></i>    喜欢 |-->
              <!--<span class="like-count" text="${article.articleLoveCount}">43</span>-->
              <!--</div>-->
            </a>
          </div>

          <!--评论-->
          <div class="panel panel-primary comment">
            <form onsubmit="return false;">
              <textarea name="" id="comment" cols="" rows="" placeholder="写下你的评论..." v-model="message"></textarea>
              <button type="button" class="btn btn-success" id="submitComment" @click="addComment">发布</button>
            </form>

          </div>

          <!--评论列表-->
          <div class="panel  comment-list">
            <ul class="form-group">
              <li v-for="comment in comments" :key="comment.id">
                <a class="" href="@{'/user/'+${comment.bloggerId}}">
                  <img class="img-circle user-img img"  :src="comment.userImg" alt="">
                </a>
                <a class="comment-user" href="@{'/user/'+${comment.bloggerId}}" >{{comment.userName}}</a>
                <small text="${#dates.format(comment.createTime, 'yyyy-MM-dd HH:mm')}">2018-6-2 12:59</small>
                <!--删除评论-->
                <a class="comment-delete" href="javascript:void(0)" id="comment-delete" v-if="user.username === comment.username" @click="delComment(comment.id)">
                  <i class="fa fa-trash-o"></i>
                </a>
                <p>{{comment.content}}</p>
                <hr>
              </li>

            </ul>
          </div>
        </div><!-- /.blog-main -->

        <!--文章右侧-->
        <div class="col-sm-3 col-sm-offset-1 blog-sidebar">
          <div class="sidebar-module sidebar-module-inset">
            <h4>关于作者</h4>
            <p text="${articleBlogger.bloggerInfo}">我是一个来自外星人的嗷嗷？？</p>
            <p if="(${#strings.isEmpty(articleBlogger.bloggerInfo)})">emmm还没有写个人介绍哦...</p>
          </div>
          <br>
          <br>
          <div class="sidebar-module">
            <h4>最新文章</h4>
            <ol class="list-unstyled">
              <li each="otherArticle:${otherArticles}"><a href="@{'/article/'+${otherArticle.articleId}}" text="${otherArticle.articleTitle}">March 2014</a></li>

            </ol>
          </div>
          <!--<br>-->
          <!--<br>-->
          <!--<div class="sidebar-module">-->
          <!--<h4>查看主页</h4>-->
          <!--<ol class="list-unstyled">-->
          <!--<li><a href="#">GitHub</a></li>-->
          <!--<li><a href="#">Twitter</a></li>-->
          <!--<li><a href="#">Facebook</a></li>-->
          <!--</ol>-->
          <!--</div>-->
        </div><!-- /.blog-sidebar -->

      </div><!-- /.row -->

    </div><!-- /.container -->
    <!--尾部-->
    <footer class="container-fluid">
      <div class="container footer">

        <p>
          <span class="glyphicon  glyphicon-copyright-mark" aria-hidden="true"></span> 2018
          yuan
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
  import header from '../header/header'
  import '../../../static/bootstrap/css/bootstrap.css'
  import '../../../static/bootstrap/css/bootstrap-theme.css'
  import '../../../static/css/dropload.css'
  import '../../../static/font-awesome-4.7.0/css/font-awesome.css'
  import '../../../static/css/main.css'
  import '../../../static/toastr/toastr.css'
  import '../../../static/toastr/toastr.min'
  import '../../../static/js/jquery-3.2.1'
  import '../../../static/bootstrap/js/bootstrap'
  import {formatTime} from '../../utils/time'

  export default {
    name: 'article',
    components: {
      'v-header': header
    },
    data () {
      return {
        id: '',
        article: [],
        comments: [],
        message: '', // 评论内容,
        user: [], // 当前用户,
        isUser: false // 文章是否是当前用户的
      }
    },
    // 过滤器
    filters: {
      dateFormat (time) {
        return formatTime(time, false)
      }
    },
    mounted: function () {
      this.getArticle() // 获取文章信息
    },
    methods: {
      // 加载文章内容,包括评论
      getArticle: function () {
        this.id = this.$route.params.id
        this.$http.get(`${process.env.API_ROOT}/article/` + this.id).then(response => {
          console.log('文章内容')
          console.log(response.data)
          // get body data
          // this.someData = response.body;

          if (response.data.status === 0) {
            this.article = response.data.data
            this.comments = this.article.commentList

            this.getUserInfo() // 获取当前用户信息
          }
        }, response => {
          console.log('error')
        })
      },
      // 添加评论
      addComment: function () {
        this.$http.post(`${process.env.API_ROOT}/comment/add.do`, {
          'articleId': this.id,
          'content': this.message
        }, {emulateJSON: true}).then(response => {
          console.log(response.data)
          // get body data
          // this.someData = response.body;
          if (response.data.status === 0) {
            // 评论成功，获取评论列表
            this.getComment()
          } else if (response.data.status === 10) {
            // alert('未登入')
            // this.$router.push({
            //   path: '/login'
              // query: {redirect: this.to.fullPath} // 如果你使用钩子函数，your path 可以替换成to.fullPath
            // })
            // alert('未登入')
            window.location.href = '/login'
          } else {
            alert('失败')
          }
        }, response => {
          console.log('error')
        })
      },
      // 获取评论，即更新comments
      getComment: function () {
        this.$http.get(`${process.env.API_ROOT}/comment/` + this.id).then(response => {
            if (response.data.status === 0) {
              console.log('评论')
              console.log(response.data)
              // 评论成功
              this.comments = response.data.data
              // 清空评论区
              this.message = ''
            } else {
              alert('失败')
            }
          },
          response => {
            console.log('error')
          })
      },
      // 删除评论
      delComment: function (id) {
        this.$http.get(`${process.env.API_ROOT}/comment/delete.do?id=` + id).then(response => {
            if (response.data.status === 0) {
              console.log(response.data)
              // 重新加载评论
              this.getComment()
            } else {
              alert('失败')
            }
          },
          response => {
            console.log('error')
          })
      },
      // 添加或删除喜欢
      love: function (type, id) {
        this.$http.get(`${process.env.API_ROOT}/article/love.do?type=` + type + `&id=` + id).then(response => {
            console.log(response.data)
            if (response.data.status === 0) {
              console.log('结果')
              console.log(response.data)
              // 重新加载文章
              this.getArticle()
            } else if (response.data.status === 10) {
              window.location.href = '/login'
            } else {
              alert('失败')
            }
          },
          response => {
            console.log('error')
          })
      },
      // 获取当前登入的用户
      getUserInfo: function () {
        this.$http.get(`${process.env.API_ROOT}/user/get_user_info.do`).then(response => {
          console.log('获取当前登入的用户=')
          console.log(response.data)

          if (response.data.status === 0) {
            this.user = response.data.data
            this.judgeUser()
          }
        }, response => {
          console.log('error')
        })
      },
      judgeUser: function () {
        console.log('this.user.username=' + this.user.username)
        console.log('this.article.username=' + this.article.username)
        if (this.user.username === this.article.username) {
          this.isUser = true
        }
        console.log('this.isUser=' + this.isUser)
      },
      // 删除文章
      delArticle: function (id) {
        this.$http.get(`${process.env.API_ROOT}/article/delete.do?id=` + id).then(response => {
            if (response.data.status === 0) {
              window.location.href = '/'
            } else {
              alert('失败')
            }
          },
          response => {
            console.log('error')
          })
      }
    }
  }
</script>

<style scoped>
  a{
    text-decoration: none;
  }
  #content{
    margin-top: 10px;
    background: #fff;
    height: auto;
    padding-bottom: 50px;
    overflow: hidden;
  }
  /*喜欢*/
  .like-group{
    margin-top: 20px;
    margin-bottom: 20px;

    /*border: 1px solid #000;*/
    /*position: relative;*/
    /*padding: 13px 0 15px 0;*/
    /*font-size: 0;*/
    border: 1px solid #EA6F5A;
    border-radius: 40px;
    width:  180px;

    height: 50px;
    /*display: inline-block;*/
    /*margin-bottom: 0;*/
    /*text-align: center;*/
    /*vertical-align: middle;*/
    /*-ms-touch-action: manipulation;*/
    /*touch-action: manipulation;*/
    /*cursor: pointer;*/
    /*background-image: none;*/
    /*border: 1px solid transparent;*/
    /*white-space: nowrap;*/
    /*padding: 6px 12px;*/
    /*font-size: 14px;*/
    /*line-height: 1.42857;*/
    /*border-radius: 4px;*/
    /*-webkit-user-select: none;*/
    /*-moz-user-select: none;*/
    /*-ms-user-select: none;*/
    /*user-select: none;*/
    padding: 0;
  }

  .like-group a{
    color: #EA6F5A;
    text-decoration: none;
    line-height: 50px;
    font-size: 19px;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    /*padding: 18px 30px 18px 55px;*/

  }
  .img{
    height: 40px;
  }

  .blog-post .img-circle{
    margin-top: 10px;
    margin-bottom: 16px;
  }
  .comment{
    margin-top: 10px;
    height: 120px;

    /*color: ;*/
  }
  .comment textarea {
    /*padding: 10px 15px;*/
    height: 120px;

    width: 100%;
    /*height: 100%;*/
    /*height: 80px;*/
    font-size: 14px;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    background-color: hsla(0, 0%, 71%, .1);
    padding: 0;
    /*禁止拉伸*/
    resize: none;
    /*display: in   line-block;*/
    /*vertical-align: top;*/
    /*outline-style: none;*/
    /*wid 100%;*/
    /*height: 100%;*/
    /*margin: 0 auto;*/
    /*padding: 0;*/
    /*background: #ccc;*/
  }
  /*发布按钮*/
  .comment .btn-success {
    margin-top: 20px;

    float: right;
    width: 80px;
    display: block;
  }
  /*评论列表*/
  .comment-list{
    margin-top: 80px;
  }
  .comment-list ul li {
    margin-top: 10px;
    /*border-bottom: 1px solid #ccc;*/
    margin-bottom: 10px;
    /*border-wid 100px;*/
    /*border-top-wid 80%;*/
  }
  /*分割线*/
  .comment-list hr {
    width: 90%;
    /*height: 0.3px;*/
    background: #c0c0c0;
    text-align: center;
  }

  .comment-list a{
    text-decoration: none;
  }
  .comment-list .img-circle {
    float: left;
    margin-right: 7px;

  }
  .comment-list .comment-user{
    display: block;
    /*float: left;*/
  }

  /*编辑文章*/
  .article-edit{
    color: #79a5e5;
    margin-left: 30px;

    text-decoration: none;
    /*left: 50%;*/
    /*margin-top: 20px;*/
    /*margin: 0 auto;*/
  }
  /*删除用户*/
  .user-delete{
    margin-left: 15px;
    color: red;
  }
  #content a{
    text-decoration: none;
  }
  /*时间*/
  .blog-post .time{

    float: right;
    margin-right: 30px;
    margin-top: 25px;
  }

  .comment-list .comment-delete{
    margin-right: 20px;
    color: red;
    float: right;
    margin-top: -8px;
    /*float: left;*/
  }
  .comment-list p {
    /*background: #ccc;*/
    margin-top: 15px;
    margin-bottom: 15px;
    padding-left: 5px;
    padding-right: 5px;

  }

  .blog-top{
    /*background: red;*/
    display: block;
  }

</style>
