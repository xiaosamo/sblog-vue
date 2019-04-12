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
                <a :href="'/user/'+article.user.id">
                  <img class="img-circle user-img img"  :src="article.user.avatar"  alt="">
                </a>
                <!--<p class="blog-post-meta">2018-6-1 <a href="#"></a></p>-->
                <a :href="'/user/'+article.user.id" class="article-use">{{article.user.name}}</a>
                <a :href="'/editor/'+article.id" class="article-edit" v-if="isCurUser()">编辑</a>
                <a href="javascript:void(0)" id="user-delete" class="user-delete" v-if="isCurUser()" @click="delArticle(article.id)">删除</a>
                <small class="time">{{ article.createTime | dateFormat}}</small>
              </div>
              <!--文章内容部分-->
              <div id="main-content"  v-html="article.content">
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
                <div v-if="article.isLiked" id="Like" @click="cancelLike(article.id)">
                <i class="fa fa-heart"></i>    喜欢 | <span class="like-count">{{article.likedCount}}</span>
                </div>
                <!--没喜欢-->
                <div v-else id="notLike" @click="like(article.id)">
                  <i class="fa fa-heart-o" ></i>    喜欢 | <span class="like-count">{{article.likedCount}}</span>
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
                  <a class="" :href="'/user/'+comment.user.id" >
                    <img class="img-circle user-img img"  :src="comment.user.avatar" alt="">
                  </a>
                  <div class="comment-div">
                    <a class="comment-user" :href="'/user/'+comment.user.id" style="margin-bottom: 3px;">{{comment.user.name}}</a>
                    <div >
                      {{comment.content}}
                    </div>
                    <small text="${#dates.format(comment.createTime, 'yyyy-MM-dd HH:mm')}">{{comment.createTime | dateFormat}}</small>

                    <!--删除评论-->
                    <a class="comment-delete" href="javascript:void(0)" id="comment-delete" v-if="isCurUserComment(comment.user.id)" @click="delComment(comment.id)">
                      <i class="fa fa-trash-o"></i>
                    </a>
                  </div>
                  <!--<p></p>-->
                  <!--<hr style="height: 0.1px;">-->
                </li>
              </ul>
            </div>
          </div><!-- /.blog-main -->
          <!--文章右侧-->
          <div class="col-sm-4 col-sm-offset-1 blog-sidebar article-right">
            <div class="sidebar-module sidebar-module-inset">
              <h4>关于作者</h4>
              <p text="${articleBlogger.bloggerInfo}">我是一个来自外星人的嗷嗷？？</p>
              <p if="(${#strings.isEmpty(articleBlogger.bloggerInfo)})">emmm还没有写个人介绍哦...</p>
            </div>
            <br>
            <br>
            <!--最新文章-->
            <!--<div class="sidebar-module">-->
              <!--<h4>最新文章</h4>-->
              <!--<ol class="list-unstyled" v-for="article in userLatestArticles" :key="article.id">-->
                <!--<li style="padding: 1px;">-->
                  <!--<a :href="'/article/'+article.id">{{article.title}}</a>-->
                <!--</li>-->
              <!--</ol>-->
            <!--</div>-->
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
  import header from '@/components/header/header'
  import {formatTime} from '../../utils/time'
  import * as toastr from '@/styles/toastr/toastr.min'
  import store from '@/store/store'

  export default {
    name: 'article',
    components: {
      'v-header': header
    },
    data () {
      return {
        id: '',
        article: {
          // 使用{{}}双花括号在html页面进行数据绑定时，从一个对象中获取，超过两个.就报错
          user: {}
        },
        comments: [],
        message: '', // 评论内容,
        user: [], // 当前用户,
        userLatestArticles: {}, // 用户最新的文章
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
      this.id = this.$route.params.id

      // 获取文章信息
      this.getArticle()
      // 获取文章评论
      this.getComment()
    },
    methods: {
      // 文章是否是当前用户的
      isCurUser: function () {
        this.loginUser = store.getters.getUser
        if (this.loginUser != null && this.loginUser.id != null) {
          return this.loginUser.id === this.article.user.id
        }
        return false
      },
      // 加载文章内容,包括评论
      getArticle: function () {
        this.$http.get(`${process.env.API_ROOT}/article/` + this.id).then(response => {
          if (response.data.status === 0) {
            this.article = response.data.data
            // 获取用户最新的文章
            this.getLatestArticle(this.article.user.id)
          }
        }, response => {
          console.log('error')
        })
      },
      // 添加评论
      addComment: function () {
        if (this.message.trim().length === 0) {
          toastr.warning('内容不能为空')
          return
        }
        this.$http.post(`${process.env.API_ROOT}/comment/add`, {
          'articleId': this.id,
          'content': this.message
        }, {emulateJSON: true}).then(response => {
          if (response.data.status === 0) {
            // 评论成功，重新获取评论列表
            this.getComment()
          } else if (response.data.status === 10) {
            // 未登录
            this.$router.push({
              path: '/login',
              query: {
                redirect: this.$router.currentRoute.fullPath
              }
            })
          } else {
            toastr.error(response.data.msg)
          }
        }, response => {
          console.log('error')
        })
      },
      // 获取评论，即更新comments
      getComment: function () {
        this.$http.get(`${process.env.API_ROOT}/comment/` + this.id).then(response => {
            if (response.data.status === 0) {
              // 评论成功
              this.comments = response.data.data
              // 清空评论区
              this.message = ''
            } else {
            }
          },
          response => {
            console.log('error')
          })
      },
      // 删除评论
      delComment: function (id) {
        this.$http.delete(`${process.env.API_ROOT}/comment/` + id + `?aid=` + this.id).then(response => {
            if (response.data.status === 0) {
              // 重新加载评论
              this.getComment()
            } else {
              toastr.error('删除失败')
            }
          },
          response => {
            console.log('error')
          })
      },
      // 点赞文章
      like: function (id) {
        this.$http.put(`${process.env.API_ROOT}/like/` + id).then(response => {
            if (response.data.status === 0) {
              // 重新加载文章
              this.getArticle()
            } else if (response.data.status === 10) {
              // 未登录
              this.$router.push({
                path: '/login',
                query: {
                  redirect: this.$router.currentRoute.fullPath
                }
              })
            } else {
              alert('失败')
            }
          },
          response => {
            console.log('error')
          })
      },
      // 取消点赞
      cancelLike: function (id) {
        this.$http.delete(`${process.env.API_ROOT}/like/` + id).then(response => {
            if (response.data.status === 0) {
              // 重新加载文章
              this.getArticle()
            } else if (response.data.status === 10) {
              // 未登录
              this.$router.push({
                path: '/login',
                query: {
                  redirect: this.$router.currentRoute.fullPath
                }
              })
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
      // 判断此评论是否是当前用户
      isCurUserComment: function (uid) {
        this.loginUser = store.getters.getUser
        if (this.loginUser != null && this.loginUser.id != null) {
          return this.loginUser.id === uid
        }
        return false
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
        this.$http.delete(`${process.env.API_ROOT}/article/` + id).then(response => {
            if (response.data.status === 0) {
              window.location.href = '/'
            } else {
              alert('失败');
            }
          },
          response => {
            console.log('error')
          })
      },
      // 获取用户最新的文章
      getLatestArticle: function (uid) {
        this.$http.get(`${process.env.API_ROOT}/article/getLatestArticle?uid=` + uid).then(response => {
            if (response.data.status === 0) {
              this.userLatestArticles = response.data.data
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
    margin-top: 78px;
    /*margin-top: 10px;*/
    background: #fff;
    padding-top: 0;
    /*height: auto;*/
    /*padding-bottom: 50px;*/
    /*overflow: hidden;*/
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
    margin-right: 4px;
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
  .blog-title{
    padding-top: 10px;
  }

  .comment-div {
    margin-top: 5px;
    padding-bottom: 8px;
    padding-left: 10px;
    border-bottom: 1px solid #f1f1f1;
  }
  .comment-div div{
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .article-right{
    padding-left: 80px;
  }
</style>
