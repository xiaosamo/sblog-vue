<template>
  <div>
    <!--导航条-->
    <v-header :loginUser="loginUser"></v-header>
    <div id="content" style="min-width: 1000px">
      <!--用户头部，背景图片-->
      <div class="container  user-header" :style="{'background-image': 'url(' + userInfo.bgImg + ')'}">
        <div class="row" style="position: relative;">
          <a class="">
            <!--<img class="img-rounded" :src="userInfo.img" alt="">-->
            <b-img slot="aside" class="img-rounded" :src="userInfo.avatar" />
          </a>

          <div class="user-header-info">
            <!--<input type="text" id="bloggerId" value="${bloggerHome.bloggerId}"  hidden>-->
            <!--<input type="text" id="homeUsername" value="${bloggerHome.bloggerUsername}"  hidden>-->
            <!--<input type="text" id="curUsername" value="${blogger.bloggerUsername}"  hidden>-->
            <!--<input type="text" id="bgId" value="${bloggerHome.bloggerBgImg}"  hidden>-->
            <div class="user-follow">
              <h2>{{userInfo.name}}</h2>

              <b-button class="chat" variant="success"  id="follow-btn" v-if="!isCurUser() && isFollow" @click="cancelFollow(userInfo.id)">
                已关注 <i class="fa fa-check"></i>
              </b-button>

              <b-button class="chat" variant="outline-success"  id="follow-btn" v-if="!isCurUser() && !isFollow" @click="addFollow(userInfo.id)">
                <span>关注</span>
              </b-button>
              <!--<button class="btn btn-success chat" id="follow-btn" v-if="!isCurUser" @click="doFollow(userInfo.username)">-->
                <!--<span v-if="follow">已关注 <i class="fa fa-check"></i> </span>-->
                <!--<span v-else><i class="fa fa-plus"></i>关注</span>-->
              <!--</button>-->

              <!--<b-link href="#foo" class="chat" variant="default">私信</b-link>-->
              <b-button v-if="!isCurUser()" class="chat" variant="default" @click="toChat(userInfo.id)">私信</b-button>
              <!--<a :href="'/chat/'+ userInfo.id" v-if="!isCurUser" class="btn btn-default chat">私信</a>-->
            </div>
            <p>{{userInfo.sign}}</p>
            <!--上传组件-->
            <input type="file" id="file" ref="file" @change="upload($event)">
          </div>

          <!--<b-button-group v-if="isCurUser" style="position: absolute;right: 10px; top:190px;">-->
          <div v-if="isCurUser()" style="position: absolute;right: 10px; top:190px;">
            <b-button variant="outline-primary" class="btn-edit" @click="changeUrl('/user/settings/profile')">
              编辑资料
            </b-button>
            <b-button variant="outline-primary" class="btn-edit" @click="changeBgImg">更换背景</b-button>

            <!--<b-button>Button 2</b-button>-->
            <!--<b-button>Button 2</b-button>-->
          </div>
          <!--<a href="/user/settings/profile" v-if="isCurUser"  class="btn  edit">-->
            <!--编辑资料-->
          <!--</a>-->

          <!--<a href="javascript:void(0)" id="background"  class="btn  edit" v-if="isCurUser" @click="changeBgImg">-->
            <!--更换背景-->
          <!--</a>-->
        </div>

      </div>
      <!--用户内容区-->
      <div class="container user-content">

        <!-- Tab panes -->
        <div class="tab-content">

          <b-tabs>
            <b-tab title="我的文章" active>
              <!--我的文章-->
              <div role="tabpanel" class="tab-pane active lists" id="article">
                <!--文章部分-->
                <div class="item article-card" v-for="article in articles" :key="article.id">
                  <!--用户头像-->
                  <a :href="'/user/'+article.user.id">
                    <img class="img-circle user-img article-user-img" :src="article.user.avatar">
                  </a>
                  <span>
                        <a :href="'/user/'+article.user.id">{{article.user.name}}</a>
                        <!--<small v-if="article.user.sign.length > 0">:{{article.user.sign}}</small>-->
                </span>
                  <div class="article">
                    <h3 class="title"><a :href="'/article/'+article.id">{{article.title}}</a></h3>
                    <small class="article-type">{{article.category.name}}</small>
                    <div class="article-content lead" >
                      <a :href="'/article/'+article.id">
                        <div v-html="article.content.substring(0,280)">
                        </div>
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

                </div>

              </div>
            </b-tab>
            <b-tab title="我喜欢的" @click="getUserLikedArticle()">
              <!--喜欢的-->
              <div role="tabpanel" class="tab-pane" id="love">
                <!--文章部分-->
                <div class="item article-card" v-for="userLikedArticle in userLikedArticles" :key="userLikedArticle.id">
                  <!--用户头像-->
                  <a :href="'/user/'+userLikedArticle.user.id">
                    <img class="img-circle user-img article-user-img" :src="userLikedArticle.user.avatar">
                  </a>
                  <span>
                        <a :href="'/user/'+userLikedArticle.user.id">{{ userLikedArticle.user.name}}</a>
                    <!--<small>{{userLikedArticle.userSign}}</small>-->
                </span>
                  <div class="article">
                    <h3 class="title"><a :href="'/article/'+userLikedArticle.id">{{userLikedArticle.title}}</a></h3>
                    <small class="article-type">{{userLikedArticle.category.name}}</small>
                    <div class="article-content lead" >
                      <a :href="'/article/'+userLikedArticle.id">
                        <div v-html="userLikedArticle.content.substring(0,280)">
                        </div>
                      </a>

                    </div>
                    <div class="container">
                      <!--<span class="date">2014-14-14</span>-->
                      <i class="fa  fa-eye">{{userLikedArticle.viewCount}}</i>
                      <i class="fa  fa-comment-o">{{userLikedArticle.commentCount}}</i>
                      <i class="fa  fa-star">{{userLikedArticle.likedCount}}</i>
                      <i class="fa  fa-calendar">{{userLikedArticle.createTime | dateFormat}}</i>
                      <!--calendar-->
                    </div>

                  </div>

                </div>

              </div>
            </b-tab>
            <b-tab title="关注的人" @click="getFollowedCollection()">
              <!--关注的-->
              <div role="tabpanel" class="tab-pane" id="follow">
                <!--关注用户-->
                <div class="item article-card" v-for="userInfo in userFollowCollection" :key="userInfo.id">
                  <!--用户头像-->
                  <a :href="'/user/'+userInfo.id">
                    <img class="img-circle user-img article-user-img" :src="userInfo.avatar">
                  </a>
                  <span>
                        <a :href="'/user/'+userInfo.id">{{userInfo.name}}</a>
                        <!--<small>，{{userFollow.sign}}</small>-->
                </span>
                  <a :href="'/chat/'+ userInfo.id"  class="btn btn-default" id="chat-btn">私信</a>

                  <button class="btn btn-success follow-btn"
                          v-if="isCurUser()"
                          @mouseenter="mouseEnter($event)"
                          @mouseleave="mouseLeave($event)"
                          @click="cancelFollow(userInfo.id)">
                    已关注<i class="fa fa-check"></i>
                  </button>

                </div>

              </div>
            </b-tab>
            <b-tab title="已评论的" @click="getUserCommentArticles()">
              <!--评论的-->
              <div role="tabpanel" class="tab-pane" id="comment">

                <!--文章部分-->
                <div class="item article-card" v-for="userCommentArticle in userCommentArticles" :key="userCommentArticle.id">
                  <!--用户头像-->
                  <a :href="'/user/'+userCommentArticle.user.id">
                    <img class="img-circle user-img article-user-img" :src="userCommentArticle.user.avatar">
                  </a>
                  <span>
              <a :href="'/user/'+userCommentArticle.user.id">{{userCommentArticle.user.name}}</a>
              <!--<small>{{userCommentArticle.userSign}}</small>-->
            </span>
                  <div class="article">
                    <h3 class="title"><a :href="'/article/'+userCommentArticle.id">{{userCommentArticle.title}}</a></h3>
                    <small class="article-type">{{userCommentArticle.category.name}}</small>
                    <div class="article-content lead" >
                      <a :href="'/article/'+userCommentArticle.id">
                        <div v-html="userCommentArticle.content.substring(0,280)">
                        </div>
                      </a>

                    </div>
                    <div class="container">
                      <!--<span class="date">2014-14-14</span>-->
                      <i class="fa  fa-eye">{{userCommentArticle.showCount}}</i>
                      <i class="fa  fa-comment-o">{{userCommentArticle.commentCount}}</i>
                      <i class="fa  fa-star">{{userCommentArticle.loveCount}}</i>
                      <i class="fa  fa-calendar">{{userCommentArticle.createTime | dateFormat}}</i>
                      <!--calendar-->
                    </div>

                  </div>

                </div>

              </div>
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import header from '@/components/header/header'
  import store from '@/store/store'

  /* eslint-disable */
  import $ from 'jquery'
  import {formatTime} from '../../utils/time'


  export default {
    name: 'userHome',
    components: {
      // 2.注册header
      'v-header': header
    },
    filters: {
      dateFormat (time) {
        return formatTime(time, false)
      }
    },
    data () {
      return {
        userId: '',
        userInfo: {}, // 当前页面用户信息
        // isCurUser: false, // 是否是浏览的自己的主页
        loginUser: {},  // 登录的用户信息
        articles: {}, // 用户的文章
        userCommentArticles: {}, // 用户评论的文章
        userLikedArticles: {},  // 用户点赞的文章
        userFollowCollection: {}, // 用户关注的集合
        isFollow: false
      }
    },
    mounted: function () {
      this.userId = this.$route.params.id

      this.getUserInfo()

      // 获取用户的文章
      this.getUserArticles()

      this.isCurrentUserFollow()

    },
    methods: {
      toChat: function (id) {
        window.location.href = '/chat/' + id
      },
      changeUrl: function (url) {
        window.location.href = url
      },
      // 获取用户信息
      getUserInfo: function () {
        this.$http.get(`${process.env.API_ROOT}/user/getUserInfo?uid=` + this.userId).then(response => {
          if (response.data.status === 0) {
            this.userInfo = response.data.data
            // 设置背景图片
            // $('.user-header').css("background-image","url('"+$('#bgId').val()+"')");

          }

        }, response => {
          console.log('error')
        })
      },
      // 判断当前页面是否属于用户
      isCurUser: function(){
        if (this.userId == null || this.userId.length === 0) {
          return false
        }
        this.loginUser = store.getters.getUser
        if (this.loginUser != null && this.loginUser.id != null) {
          return this.loginUser.id === this.userId;
        }
        return false;
      },
      isCurrentUserFollow: function(){
        this.$http.get(`${process.env.API_ROOT}/follow/isCurrentUserFollow?uid=` + this.userId).then(response => {
          if (response.data.status === 0) {
            this.isFollow = response.data.data
          }
        }, response => {
          console.log('error')
        })
      },
      // 获取用户关注的集合
      getFollowedCollection: function(){
        this.$http.get(`${process.env.API_ROOT}/follow/getFollowedCollection?uid=` + this.userId).then(response => {
          if (response.data.status === 0) {
            this.userFollowCollection = response.data.data
          }
        }, response => {
          console.log('error')
        })
      },
      // 获取当前页的用户信息
      // getPageUser: function () {
      //   console.log("get token=" + sessionStorage.getItem('token'));
      //
      //   this.$http.get(`${process.env.API_ROOT}/user/get_user_info?uid=` + this.userId).then(response => {
      //     console.log("获取当前页的用户信息=");
      //     console.log(response.data);
      //     // get body data
      //     // this.someData = response.body;
      //
      //     if (response.data.status === 0) {
      //       this.userInfo = response.data.data
      //       // this.user = response.data.data;
      //       // console.log(this.user);
      //       // 设置背景图片
      //       // $('.user-header').css("background-image","url('"+$('#bgId').val()+"')");
      //
      //       // this.judgeUser()
      //       // this.judgeFollow()
      //     }
      //
      //   }, response => {
      //     console.log('error')
      //   });
      // },
      getUserArticles: function () {
        this.$http.get(`${process.env.API_ROOT}/user/` + this.userId + `/articles`).then(response => {
          if (response.data.status === 0) {
            this.articles = response.data.data.list
          }
        }, response => {
          console.log('error')
        })
      },
      // 获取用户评论的文章
      getUserCommentArticles: function () {
        this.$http.get(`${process.env.API_ROOT}/article/getUserCommentArticle?uid=` + this.userId).then(response => {
          if (response.data.status === 0) {
            this.userCommentArticles = response.data.data.list
          }
        }, response => {
          console.log('error')
        })
      },
      // 获取用户点赞的文章
      getUserLikedArticle: function () {
        this.$http.get(`${process.env.API_ROOT}/article/getUserLikedArticle?uid=` + this.userId).then(response => {
          if (response.data.status === 0) {
            this.userLikedArticles = response.data.data.list
          }
        }, response => {
          console.log('error')
        })
      },
      // 上传图片
      upload: function (event) {
        let file = event.target.files[0]
        let config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const formData = new FormData()
        formData.append('file', file)

        this.$http.post(`${process.env.API_ROOT}/user/settings/bgImg`, formData, config).then(response => {
          console.log(response.data);
          if (response.data.status === 0) {
            // this.getPageUser() // 更新用户信息
          }

        }, response => {
          console.log('error')
        })
      },
      // 修改背景图片
      changeBgImg: function () {
        this.$refs.file.click()
      },
      // 关注关注
      addFollow: function (id) {
        this.$http.put(`${process.env.API_ROOT}/follow/` + id).then(response => {
          if (response.data.status === 0) {
            this.isFollow = !this.isFollow
          }else if (response.data.status === 10) {
            // 未登录
            this.$router.push({
              path: '/login',
              query: {
                redirect: this.$router.currentRoute.fullPath
              }
            })
          }
        }, response => {
          console.log('error')
        });
      },
      // 取消关注
      cancelFollow: function (id) {
        this.$http.delete(`${process.env.API_ROOT}/follow/` + id).then(response => {
          if (response.data.status === 0) {
            this.isFollow = !this.isFollow
            this.getFollowedCollection()
          }else if (response.data.status === 10) {
            // 未登录
            this.$router.push({
              path: '/login',
              query: {
                redirect: this.$router.currentRoute.fullPath
              }
            })
          }
        }, response => {
          console.log('error')
        });
      },
      // 鼠标移入
      mouseEnter: function ($event) {
        // $event.currentTarget表示当前的元素
        $event.currentTarget.className = "btn btn-default follow-btn";
        $event.currentTarget.innerText = "取消关注";
        // console.log('innerHTml = ' + $event.currentTarget.innerText)
      },
      // 鼠标移出
      mouseLeave: function ($event) {
        $event.currentTarget.className = "btn btn-success follow-btn";
        $event.currentTarget.innerText = "已关注";
      }
    }
  }
</script>

<style scoped>
  /*头部*/
  .user-header{
    /*padding-top: 8px;*/
    /*overflow: hidden;*/
    /*margin-top: 12px;*/
    background: #fff;
    height: 250px;
    /*background-size: 250px;*/
    /*background-image: url('http://blog.zhangruipeng.me/hexo-theme-icarus/gallery/shoes.jpg');*/
    /*background-image: url('http://bpic.588ku.com/back_pic/04/76/98/6558ad5a9051beb.jpg!r850/fw/1600');*/
    /*position: relative;*/
  }
  /*头像*/
  .user-header .img-rounded{
    /*position: absolute;*/
    height: 160px;
    float: left;
    overflow: hidden;
    /*margin: 0 auto;*/
    margin-top: 70px;
    margin-left: 20px;
    padding: 0;
    background: #ccc;
    display: block;
    margin-right: 25px;
    margin-bottom: 20px;

    /*line-height: 250;*/
  }

  .user-header-info{
    margin-top: 135px;
    height: auto;
  }

  /*编辑按钮*/
  .edit{
    /*position: absolute;*/
    color: #0084ff;
    border-color: #0084ff;
    border-radius: 8px;
    font-size: 14px;
    padding: 0 16px;
    text-align: center;
    line-height: 32px;
    cursor: pointer;
    background: none;
    display: inline-block;

    float: right;
    margin-right: 25px;
    margin-top: -25px;
    /*margin-bottom: 20px;*/
    /*background: red;*/

  }
  .edit:hover {
    /*color: #0084ff;*/
    color: #fff;
    background: #0084ff;

  }
  .jumbotron{
    width: 80%;
    float: right;
    height: 100%;
    /*background: */
    /*border: 0;*/
  }

  /*用户内容区*/
  .user-content{

    padding:8px 10px  18px 10px ;
    /*padding-bottom: 10px;*/
    /*padding: 12px;*/
    margin-top: 12px;
    background: #fff;
    /*background: red;*/

    min-height: 480px;
    height: auto;
    margin-bottom: 35px;
  }
  .user-content .nav-tabs{
    margin-bottom: 5px;
    /*wid 100% ;*/

  }

  /*文章部分*/
  .article-card{
    /*background: #ccc;*/
    background: #ffffff;
    /*wid 100px;*/
    /*box-sizing: border-box;*/
    padding: 1.5%;
    border-bottom: 1px solid #ccc;
    /*padding: 0;*/
  }

  .article-card  a{
    text-decoration: none;
  }
  .article-card .article-content{
    margin-top: 8px;
    /*background: #005cbf;*/
    margin-bottom: 8px;
    font-size: 16px;
    color: #1a1a1a;
    /*font-family: KaiTi;*/
    letter-spacing: 0.03em;
    font-weight: 400;
  }
  .user-content .item img{
    display: inline;
    /*display: block;*/
    width:  40px;
    height: 40px;
    /*border:1px solid #ddd;*/
  }
  .user-content .item h3{
    display: inline;

  }

  .article-img{
    border: none;
    padding: 0;
    /*去掉圆角*/
    border-radius: 0;
  }

  .content .lists a{
    text-decoration: none;

  }
  .article-user-img{
    margin-right: 5px;
    margin-bottom: 7px;
  }

  .article-type{
    color: #ccc;
    /*display: inline;*/
    /*margin-top: 10px;*/
    float: right;
    margin-right: 20px;
  }
  /*文章部分结束*/
  .article-card .title>a{
    margin-top: 50px;
  }
  .article{
    margin-top: 12px;
  }

  /*已关注*/
  .follow-btn{
    float: right;
    margin-top: 6px;
    /*margin-right: 20px;*/
  }

  .user-header-info p{
    margin-top: 8px;
    margin-bottom: 0;
  }
  input[type="file"] {
    display: none;
  }
  /*上面的关注按钮*/

  .user-header-info .user-follow{
    /*display: inline;*/

    height: 65px;

    /*background: #0b58a2;*/
    /*wid 80%;*/
    /*height: 48px;*/
    /*margin: 0 auto;*/
    /*float: left;*/
  }

  .chat{
    /*color: #fff;*/
    margin-left: 15px;
    margin-bottom: 10px;
  }
  .user-header-info .user-follow>h2 {
    display: inline-block;

  }
  #chat-btn{
    margin-left: 7px;
  }
  .btn-edit {
    margin-right: 15px;
    /*margin-top: 130px;*/
    /*border-radius: 5px;*/
    /*position: absolute;*/
    /*height: 50px;*/
    /*top: 50%;*/
    /*left: 30%;*/
    /*line-height: 250px;*/
    float: right;
  }

</style>
