<template>
  <div>
    <!--导航条-->
    <v-header></v-header>
    <!--用户头部，背景图片-->
    <div class="container  user-header" :style="{'background-image': 'url(' + userPage.bgImg + ')'}">

      <div class="row">
        <a class="">
          <img class="img-rounded" :src="userPage.img" alt="">
        </a>

        <div class="user-header-info">
          <!--<input type="text" id="bloggerId" value="${bloggerHome.bloggerId}"  hidden>-->
          <!--<input type="text" id="homeUsername" value="${bloggerHome.bloggerUsername}"  hidden>-->
          <!--<input type="text" id="curUsername" value="${blogger.bloggerUsername}"  hidden>-->
          <!--<input type="text" id="bgId" value="${bloggerHome.bloggerBgImg}"  hidden>-->
          <div class="user-follow">
            <h2>{{userPage.name}}</h2>

            <!--<div>-->
            <button class="btn btn-success chat" id="follow-btn" v-if="!isUser" @click="doFollow(userPage.username)">
              <span v-if="follow">已关注 <i class="fa fa-check"></i> </span>
              <span v-else><i class="fa fa-plus"></i>关注</span>
            </button>

            <!--<button class="btn btn-default " if="(${bloggerHome.bloggerId} != ${blogger.bloggerId})" >-->
            <!--私信-->
            <!--</button>-->
            <a :href="'/chat/'+ userPage.id" v-if="!isUser" class="btn btn-default chat">私信</a>
            <!--</div>-->
          </div>
          <p>{{userPage.sign}}</p>
          <!--上传组件-->
          <input type="file" id="file" ref="file" @change="upload($event)">
        </div>

        <a href="/user/settings/profile" v-if="isUser"  class="btn  edit">
          编辑资料
        </a>
        <a href="javascript:void(0)" id="background"  class="btn  edit" v-if="isUser" @click="changeBgImg">
          更换背景
        </a>
      </div>
      <!--<div class="jumbotron">-->
      <!--<h1>Hello, world!</h1>-->
      <!--<p>...</p>-->
      <!--<p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>-->
      <!--</div>-->
    </div>
    <!--用户内容区-->
    <div class="container user-content">
      <!-- Nav tabs -->
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active"><a href="#article" aria-controls="article" role="tab" data-toggle="tab">我的文章</a></li>
        <li role="presentation"><a href="#love" aria-controls="love" role="tab" data-toggle="tab">喜欢</a></li>
        <li role="presentation"><a href="#follow" aria-controls="follow" role="tab" data-toggle="tab">关注</a></li>
        <li role="presentation"><a href="#comment" aria-controls="comment" role="tab" data-toggle="tab">评论</a></li>
      </ul>

      <!-- Tab panes -->
      <div class="tab-content">

        <!--我的文章-->
        <div role="tabpanel" class="tab-pane active lists" id="article">
          <!--文章部分-->
          <div class="item article-card" v-for="userArticle in userPage.userArticles" :key="userArticle.articleId">
            <!--用户头像-->
            <a :href="'/user/'+userArticle.userId">
              <img class="img-circle user-img article-user-img" :src="userArticle.userImg">
            </a>
            <span>
                        <a :href="'/user/'+userArticle.userId">{{userArticle.userName}}</a>
                        <small>{{userArticle.userSign}}</small>
                </span>
            <div class="article">
              <h3 class="title"><a :href="'/article/'+userArticle.articleId">{{userArticle.title}}</a></h3>
              <small class="article-type">{{userArticle.categoryName}}</small>
              <div class="article-content lead" >
                <a :href="'/article/'+userArticle.articleId">
                  {{userArticle.summary}}
                </a>

              </div>
              <div class="container">
                <!--<span class="date">2014-14-14</span>-->
                <i class="fa  fa-eye">{{userArticle.showCount}}</i>
                <i class="fa  fa-comment-o">{{userArticle.commentCount}}</i>
                <i class="fa  fa-star">{{userArticle.loveCount}}</i>
                <i class="fa  fa-calendar">{{userArticle.createTime | dateFormat}}</i>
                <!--calendar-->
              </div>

            </div>

          </div>

        </div>
        <!--喜欢的-->
        <div role="tabpanel" class="tab-pane" id="love">

          <!--文章部分-->
          <div class="item article-card" v-for="userLoveArticle in userPage.userLoveArticles" :key="userLoveArticle.articleId">
            <!--用户头像-->
            <a :href="'/user/'+userLoveArticle.userId">
              <img class="img-circle user-img article-user-img" :src="userLoveArticle.userImg">
            </a>
            <span>
                        <a :href="'/user/'+userLoveArticle.userId">{{userLoveArticle.userName}}</a>
                        <small>{{userLoveArticle.userSign}}</small>
                </span>
            <div class="article">
              <h3 class="title"><a :href="'/article/'+userLoveArticle.articleId">{{userLoveArticle.title}}</a></h3>
              <small class="article-type">{{userLoveArticle.categoryName}}</small>
              <div class="article-content lead" >
                <a :href="'/article/'+userLoveArticle.articleId">
                  {{userLoveArticle.summary}}
                </a>

              </div>
              <div class="container">
                <!--<span class="date">2014-14-14</span>-->
                <i class="fa  fa-eye">{{userLoveArticle.showCount}}</i>
                <i class="fa  fa-comment-o">{{userLoveArticle.commentCount}}</i>
                <i class="fa  fa-star">{{userLoveArticle.loveCount}}</i>
                <i class="fa  fa-calendar">{{userLoveArticle.createTime | dateFormat}}</i>
                <!--calendar-->
              </div>

            </div>

          </div>

        </div>
        <!--关注的-->
        <div role="tabpanel" class="tab-pane" id="follow">

          <!--关注用户-->
          <div class="item article-card" v-for="userFollow in userPage.followList" :key="userFollow.id">
            <!--用户头像-->
            <a :href="'/user/'+userFollow.id">
              <img class="img-circle user-img article-user-img" :src="userFollow.img">
            </a>
            <span>
                        <a :href="'/user/'+userFollow.id">{{userFollow.name}}</a>
                        <small>，{{userFollow.sign}}</small>
                </span>
            <a :href="'/chat/'+ userFollow.id"  class="btn btn-default" id="chat-btn">私信</a>

            <button class="btn btn-success follow-btn"
                    v-if="isUser"
                    @mouseenter="mouseEnter($event)"
                    @mouseleave="mouseLeave($event)"
                    @click="doFollow(userFollow.username)">
              已关注<i class="fa fa-check"></i>
            </button>

          </div>

        </div>
        <!--评论的-->
        <div role="tabpanel" class="tab-pane" id="comment">

          <!--文章部分-->
          <div class="item article-card" v-for="userCommentArticle in userPage.userCommentArticles" :key="userCommentArticle.articleId">
            <!--用户头像-->
            <a :href="'/user/'+userCommentArticle.userId">
              <img class="img-circle user-img article-user-img" :src="userCommentArticle.userImg">
            </a>
            <span>
              <a :href="'/user/'+userCommentArticle.userId">{{userCommentArticle.userName}}</a>
              <small>{{userCommentArticle.userSign}}</small>
            </span>
            <div class="article">
              <h3 class="title"><a :href="'/article/'+userCommentArticle.articleId">{{userCommentArticle.title}}</a></h3>
              <small class="article-type">{{userCommentArticle.categoryName}}</small>
              <div class="article-content lead" >
                <a :href="'/article/'+userCommentArticle.articleId">
                  {{userCommentArticle.summary}}
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
      </div>
    </div>
  </div>
</template>

<script>
  import header from '@/components/header/header'
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
        user: [], // 当前登入的用户信息
        isUser: false, // 是否是浏览的自己的主页
        userPage: [],  // 当前页面的用户信息
        follow: false, // 关注,
      }
    },
    mounted: function () {
      this.userId = this.$route.params.id
      console.log('userId=' + this.userId)
      this.getUserInfo()
      console.log('user = '+this.user.username)

      this.getPageUser()
      console.log('userPage = '+this.userPage.username)



    },
    methods: {
      // 获取当前登入的用户
      getUserInfo: function () {
        console.log("get token=" + sessionStorage.getItem('token'));

        this.$http.get(`${process.env.API_ROOT}/user/get_user_info.do`).then(response => {
          console.log("获取当前登入的用户=");
          console.log(response.data);
          // get body data
          // this.someData = response.body;

          if (response.data.status === 0) {
            this.user = response.data.data;
            console.log(this.user);
            // 设置背景图片
            // $('.user-header').css("background-image","url('"+$('#bgId').val()+"')");

          }

        }, response => {
          console.log('error')
        })
      },
      // 获取当前页的用户信息
      getPageUser: function () {
        console.log("get token=" + sessionStorage.getItem('token'));

        this.$http.get(`${process.env.API_ROOT}/user/` + this.userId).then(response => {
          console.log("获取当前页的用户信息=");
          console.log(response.data);
          // get body data
          // this.someData = response.body;

          if (response.data.status === 0) {
            this.userPage = response.data.data
            // this.user = response.data.data;
            // console.log(this.user);
            // 设置背景图片
            // $('.user-header').css("background-image","url('"+$('#bgId').val()+"')");

            this.judgeUser()
            this.judgeFollow()
          }

        }, response => {
          console.log('error')
        });
      },
      judgeUser: function () {
        console.log()
        if (this.user.username === this.userPage.username) {
          this.isUser = true;
        } else {
          this.isUser = false;
        }
        console.log('this.user.username=' + this.user.username + ',this.userPage.username=' + this.userPage.username + ',isUser=' + this.isUser)
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
            this.getPageUser() // 更新用户信息
          }

        }, response => {
          console.log('error')
        })
      },
      // 修改背景图片
      changeBgImg: function () {
        this.$refs.file.click()
      },
      // 判断是否关注
      judgeFollow: function () {
        this.$http.get(`${process.env.API_ROOT}/user/judge_follow.do?username=` + this.userPage.username).then(response => {
          console.log("是否关注=");
          console.log(response.data);
          if (response.data.status === 0) {
            this.follow = response.data.data
            console.log("follow = " + this.follow)
          }
        }, response => {
          console.log('error')
        });
      },
      // 关注/取消关注
      doFollow: function (username) {
        this.$http.get(`${process.env.API_ROOT}/user/follow.do?username=` + username).then(response => {
          console.log(" 关注/取消关注=");
          console.log(response.data);
          if (response.data.status === 0) {
            this.follow = !this.follow

            // 重新获取信息
            this.getPageUser()
            // this.follow = response.data.data
            // console.log("follow = " + this.follow)

          }else if (response.data.status === 10) {
            window.location.href = '/login'
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
    /*overflow: hidden;*/
    margin-top: 12px;
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
    margin-left: 15px;
    margin-bottom: 10px;
  }
  .user-header-info .user-follow>h2 {
    display: inline-block;

  }
  #chat-btn{
    margin-left: 7px;
  }

</style>
