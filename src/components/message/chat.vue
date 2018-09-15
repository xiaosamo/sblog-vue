<template>
  <div>
    <!--导航栏-->
    <v-header ref="header"></v-header>

    <!--内容部分-->
    <div class="container content" id="content">

      <div class="row">
        <div class="col-md-12">
          <!-- DIRECT CHAT -->
          <div class="box box-warning direct-chat direct-chat-warning">
            <div class="box-header with-border">
              <h3 class="target-user" text="${targetBlogger.bloggerName}">{{targetUser.name}}</h3>
              <!--<input type="hidden" id="">-->

              <!--<img  class="img-circle user-img" src="img3.jpg" alt="">-->

              <div class="box-tools pull-right">
                <!--<span data-toggle="tooltip" title="3 New Messages" class="badge bg-yellow">1</span>-->
                <!--<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>-->
                <!--</button>-->
                <!--<button type="button" class="btn btn-box-tool" data-toggle="tooltip" title="Contacts"-->
                <!--data-widget="chat-pane-toggle">-->
                <!--<i class="fa fa-comments"></i></button>-->
                <!--<button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i>-->
                <!--</button>-->
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <!-- Conversations are loaded here -->
              <div class="direct-chat-messages" >
                <!-- Message. Default to the left -->
                <div v-for="message in messages" id="test" :key="message.id">

                  <!--左边，对方发的消息-->
                  <div class="direct-chat-msg" v-if="message.targetUsername == user.username">
                    <div class="direct-chat-success clearfix">
                                    <span class="direct-chat-name pull-left">
                                        {{targetUser.name}}
                                    </span>
                      <span class="direct-chat-timestamp pull-right">{{message.createTime | dateFormat}}</span>
                    </div>
                    <!-- /.direct-chat-info -->
                    <img class="direct-chat-img" :src="targetUser.img" alt="message user image">
                    <!-- /.direct-chat-img -->
                    <div class="direct-chat-text">
                      {{message.content}}
                    </div>
                    <!-- /.direct-chat-text -->
                  </div>
                  <!-- /.direct-chat-msg -->

                  <!--消息右边，当前用户发的消息-->
                  <div class="direct-chat-msg right" v-else>
                    <div class="direct-chat-success clearfix">
                      <span class="direct-chat-name pull-right">{{user.name}}</span>
                      <span class="direct-chat-timestamp pull-left">{{message.createTime | dateFormat}}</span>
                    </div>
                    <!-- /.direct-chat-info -->
                    <img class="direct-chat-img"  :src="user.img" alt="message user image">
                    <!-- /.direct-chat-img -->
                    <div class="direct-chat-text">
                      {{message.content}}
                    </div>
                    <!-- /.direct-chat-text -->
                  </div>
                  <!-- /.direct-chat-msg -->
                </div>

                <!--&lt;!&ndash; Message. Default to the left &ndash;&gt;-->
                <!--<div class="direct-chat-msg">-->
                <!--<div class="direct-chat-success clearfix">-->
                <!--<span class="direct-chat-name pull-left">Alexander Pierce</span>-->
                <!--<span class="direct-chat-timestamp pull-right">23 Jan 5:37 pm</span>-->
                <!--</div>-->
                <!--&lt;!&ndash; /.direct-chat-info &ndash;&gt;-->
                <!--<img class="direct-chat-img" src="${blogger.bloggerImg}" alt="message user image">-->
                <!--&lt;!&ndash; /.direct-chat-img &ndash;&gt;-->
                <!--<div class="direct-chat-text">-->
                <!--Working with AdminLTE on a great new app! Wanna join?-->
                <!--Working with AdminLTE on a great new app! Wanna join?-->
                <!--Working with AdminLTE on a great new app! Wanna join?-->
                <!--Working with AdminLTE on a great new app! Wanna join?-->
                <!--Working with AdminLTE on a great new app! Wanna join?-->
                <!--Working with AdminLTE on a great new app! Wanna join?-->

                <!--</div>-->
                <!--&lt;!&ndash; /.direct-chat-text &ndash;&gt;-->
                <!--</div>-->
                <!--&lt;!&ndash; /.direct-chat-msg &ndash;&gt;-->

                <!--&lt;!&ndash; Message to the right &ndash;&gt;-->
                <!--<div class="direct-chat-msg right">-->
                <!--<div class="direct-chat-success clearfix">-->
                <!--<span class="direct-chat-name pull-right">Sarah Bullock</span>-->
                <!--<span class="direct-chat-timestamp pull-left">23 Jan 6:10 pm</span>-->
                <!--</div>-->
                <!--&lt;!&ndash; /.direct-chat-info &ndash;&gt;-->
                <!--<img class="direct-chat-img" src="${blogger.bloggerImg}" alt="message user image">-->
                <!--&lt;!&ndash; /.direct-chat-img &ndash;&gt;-->
                <!--<div class="direct-chat-text">-->
                <!--I would love to.-->
                <!--</div>-->
                <!--&lt;!&ndash; /.direct-chat-text &ndash;&gt;-->
                <!--</div>-->
                <!-- /.direct-chat-msg -->

              </div>
              <!--/.direct-chat-messages-->

            </div>
            <!-- /.box-body -->
            <div class="box-footer">
              <!--<form id="sangForm" action="return:false;">-->
              <div class="input-group">
                <input type="text" id="message" name="message" placeholder="输入你要发送的内容 ..." class="form-control" v-model="messageContent" @keyup.enter="sendMessage">
                <span class="input-group-btn">
                            <button id="submit" class="btn btn-success btn-flat " @click="sendMessage">发送</button>
                          </span>
              </div>
              <!--</form>-->
            </div>
            <!-- /.box-footer-->
          </div>
          <!--/.direct-chat -->
        </div>
        <!-- /.col -->

        <!--<div class="col-md-6">-->
        <!--&lt;!&ndash; USERS LIST &ndash;&gt;-->
        <!--<div class="box box-danger">-->
        <!--<div class="box-header with-border">-->
        <!--<h3 class="box-title">Latest Members</h3>-->

        <!--<div class="box-tools pull-right">-->
        <!--<span class="label label-danger">8 New Members</span>-->
        <!--<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>-->
        <!--</button>-->
        <!--<button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i>-->
        <!--</button>-->
        <!--</div>-->
        <!--</div>-->
        <!--&lt;!&ndash; /.box-header &ndash;&gt;-->
        <!--<div class="box-body no-padding">-->
        <!--<ul class="users-list clearfix">-->
        <!--<li>-->
        <!--<img src="dist/img/user1-128x128.jpg" alt="User Image">-->
        <!--<a class="users-list-name" href="#">Alexander Pierce</a>-->
        <!--<span class="users-list-date">Today</span>-->
        <!--</li>-->
        <!--<li>-->
        <!--<img src="dist/img/user8-128x128.jpg" alt="User Image">-->
        <!--<a class="users-list-name" href="#">Norman</a>-->
        <!--<span class="users-list-date">Yesterday</span>-->
        <!--</li>-->
        <!--<li>-->
        <!--<img src="dist/img/user7-128x128.jpg" alt="User Image">-->
        <!--<a class="users-list-name" href="#">Jane</a>-->
        <!--<span class="users-list-date">12 Jan</span>-->
        <!--</li>-->
        <!--<li>-->
        <!--<img src="dist/img/user6-128x128.jpg" alt="User Image">-->
        <!--<a class="users-list-name" href="#">John</a>-->
        <!--<span class="users-list-date">12 Jan</span>-->
        <!--</li>-->
        <!--<li>-->
        <!--<img src="dist/img/user2-160x160.jpg" alt="User Image">-->
        <!--<a class="users-list-name" href="#">Alexander</a>-->
        <!--<span class="users-list-date">13 Jan</span>-->
        <!--</li>-->
        <!--<li>-->
        <!--<img src="dist/img/user5-128x128.jpg" alt="User Image">-->
        <!--<a class="users-list-name" href="#">Sarah</a>-->
        <!--<span class="users-list-date">14 Jan</span>-->
        <!--</li>-->
        <!--<li>-->
        <!--<img src="dist/img/user4-128x128.jpg" alt="User Image">-->
        <!--<a class="users-list-name" href="#">Nora</a>-->
        <!--<span class="users-list-date">15 Jan</span>-->
        <!--</li>-->
        <!--<li>-->
        <!--<img src="dist/img/user3-128x128.jpg" alt="User Image">-->
        <!--<a class="users-list-name" href="#">Nadia</a>-->
        <!--<span class="users-list-date">15 Jan</span>-->
        <!--</li>-->
        <!--</ul>-->
        <!--&lt;!&ndash; /.users-list &ndash;&gt;-->
        <!--</div>-->
        <!--&lt;!&ndash; /.box-body &ndash;&gt;-->
        <!--<div class="box-footer text-center">-->
        <!--<a href="javascript:void(0)" class="uppercase">View All Users</a>-->
        <!--</div>-->
        <!--&lt;!&ndash; /.box-footer &ndash;&gt;-->
        <!--</div>-->
        <!--&lt;!&ndash;/.box &ndash;&gt;-->
        <!--</div>-->
        <!-- /.col -->
      </div>

    </div>

  </div>
</template>

<script>
  import header from '@/components/header/header'
  import '@/styles/css/AdminLTE.css'
  // import '@/styles/js/sockjs.min'
  // import '@/styles/js/stomp'
  import {formatTime} from '@/utils/time'
  export default {
    name: 'chat',
    components: {
      // 2.注册header
      'v-header': header
    },
    data () {
      return {
        targetUserId: '', // 接受消息方的用户id
        user: [], // 发送方的用户信息
        targetUser: [], // 消息接受方的用户信息
        messages: [], // 消息列表
        messageContent: '' // 要发送的消息
      }
    },
    mounted: function () {
      this.getUserInfo()
      this.getCurrentUserInfo()
    },
    // 过滤器
    filters: {
      dateFormat (time) {
        return formatTime(time, false)
      }
    },
    methods: {
      // 获取用户信息
      getUserInfo: function () {
        this.targetUserId = this.$route.params.id
        this.$http.get(`${process.env.API_ROOT}/user/` + this.targetUserId).then(response => {
          console.log('消息的id')
          console.log(response.data)
          if (response.data.status === 0) {
            console.log('222 获取的数据')
            console.log(response.data.data)
            this.targetUser = response.data.data
            this.getMessage()
            // this.user = response.data.data;
            // console.log(this.user);
            // 设置背景图片
            // $('.user-header').css("background-image","url('"+$('#bgId').val()+"')");
          }
        }, response => {
          console.log('error')
        })
      },
      // 获取消息列表
      getMessage: function () {
        this.$http.get(`${process.env.API_ROOT}/message/list.do?userId=` + this.targetUserId).then(response => {
          if (response.data.status === 0) {
            console.log('消息列表：')
            console.log(response.data.data)
            this.messages = response.data.data
            console.log('targetUser = ')
            this.setRead()
          } else if (response.data.status === 10) {
            window.location.href = '/login'
          } else {
            alert('错误：' + response.data.msg)
          }
        }, response => {
          console.log('error')
        })
      },
      getCurrentUserInfo: function () {
        this.$http.get(`${process.env.API_ROOT}/user/get_user_info.do`).then(response => {
          if (response.data.status === 0) {
            this.user = response.data.data
          }
        }, response => {
          console.log('error')
        })
      },
      // 设置消息已读
      setRead: function () {
        this.$http.get(`${process.env.API_ROOT}/message/set_read.do?username=` + this.targetUser.username).then(response => {
          if (response.data.status === 0) {
            console.log('设置消息已读:')
            console.log(response.data)
            // 父组件调用子组件的方法
            this.$refs.header.getUnreadMessageCount()
          } else if (response.data.status === 10) {
            window.location.href = '/login'
          } else {
            alert('错误：' + response.data.msg)
          }
        }, response => {
          console.log('error')
        })
      },
      // 发送消息
      sendMessage: function (event) {
        this.$http.post(`${process.env.API_ROOT}/message/add.do`, {
          'username': this.targetUser.username,
          'message': this.messageContent
        }, {emulateJSON: true}).then(response => {
          console.log(response.data)
          if (response.data.status === 0) {
            this.getMessage() // 更新用户信息
            this.messageContent = ''
          }
        }, response => {
          console.log('error')
        })
      }
    }
  }
</script>

<style scoped>
  #content{
    margin-top: 12px;
    /*background: #ccc;*/
    height: 680px;
  }
  #content .direct-chat-messages {
    height: 615px;
  }
  .direct-chat-text{
    /*background: #c0c0c0;*/
    /*width:320px*/
  }
  .box-title{
    /*text-align: center;*/
    /*margin: 0 auto;*/
  }
  .target-user{
    text-align: center;
    font-size: 24px;
    margin: 5px auto;
    line-height: 1;
    /*margin-left: 19px;*/
    /*float: right;*/
    /*margin-left: 20px;*/
  }

</style>
