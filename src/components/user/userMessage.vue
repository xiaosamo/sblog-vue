<template>
  <div>
    <!--导航栏-->
    <v-header></v-header>
    <div id="content">
      <!--用户内容区-->
      <div class="container message-content">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="active"><a href="#article" aria-controls="message" role="tab" data-toggle="tab">消息</a></li>
        </ul>

        <!-- Tab panes -->
        <div class="tab-content">
          <!--消息列表-->
          <div role="tabpanel" class="tab-pane active" id="message">

            <!--消息部分-->
            <div class="item message-card" v-for="message in messageList" :key="message.id">
              <!--用户头像-->
              <a :href="'/user/'+message.id">
                <img class="img-circle user-img" :src="message.img" alt="">
              </a>
              <span>
                          <a :href="'/user/'+message.id">{{message.name}}</a>
                          <small>：</small><small text="${message.content}">{{message.content}}</small>
                  </span>
              <div class="article">
                <span class="message-time">{{message.createTime | dateFormat}}</span>
                <a href="javascript:void(0);"  class="article-type delete" id="delete"  @click="deleteMessage(message.username)">删除</a>
                <a :href="'/chat/' + message.id" class="article-type">查看</a>
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
  import {formatTime} from '@/utils/time'
  import * as toastr from '@/styles/toastr/toastr.min'

  export default {
      name: 'userMessage',
      components: {
        // 2.注册header
        'v-header': header
      },
      data () {
        return {
          messageList: []
        }
      },
      mounted: function () {
        this.getMessageList()
        // 定时器，每2秒更新
        setInterval(() => {
          this.getMessageList()
        }, 2000)
      },
      // 过滤器
      filters: {
        dateFormat (time) {
          return formatTime(time, false)
        }
      },
      methods: {
        // 获取消息列表
        getMessageList: function () {
          this.targetUserId = this.$route.params.id
          this.$http.get(`${process.env.API_ROOT}/user/get_unread_message_list.do`).then(response => {
            if (response.data.status === 0) {
              console.log('获取未读消息列表：')
              console.log(response.data.data)
              this.messageList = response.data.data
            } else if (response.data.status === 10) {
              window.location.href = '/login'
            } else {
              alert('错误：' + response.data.msg)
            }
          }, response => {
            console.log('error')
          })
        },
        // 删除消息
        deleteMessage: function (username) {
          this.$http.post(`${process.env.API_ROOT}/message/delete.do`, {
            'username': username
          }, {emulateJSON: true}).then(response => {
            if (response.data.status === 0) {
              console.log('删除消息：')
              console.log(response.data.data)
              toastr.success(response.data.msg)
              this.getMessageList()
            } else if (response.data.status === 10) {
              window.location.href = '/login'
            } else {
              toastr.error(response.data.msg)
            }
          }, response => {
            console.log('error')
          })
        }
      }
    }
</script>

<style scoped>
  /*内容区*/
  .message-content{
    padding:8px 10px  40px 10px ;
    /*padding-bottom: 10px;*/
    /*padding: 12px;*/
    /*margin-top: 12px;*/
    background: #fff;
    /*background: red;*/

    min-height: 720px;
    height: auto;
    margin-bottom: 35px;
  }
  .message-content .nav-tabs{
    margin-bottom: 5px;
    /*width: 100% ;*/

  }

  /*文章部分*/
  .message-card{
    /*background: #ccc;*/
    background: #ffffff;
    /*width: 100px;*/
    /*box-sizing: border-box;*/
    padding: 1.5%;
    border-bottom: 1px solid #ccc;
    /*padding: 0;*/
  }

  .message-card  a{
    text-decoration: none;
  }

  .message-content .item img{
    display: inline;
    /*display: block;*/
    width: 40px;
    height: 40px;
    /*border:1px solid #ddd;*/
  }
  .message-content .item h3{
    display: inline;

  }

  .content .lists a{
    text-decoration: none;

  }
  .user-img {
    margin-right: 5px;
    margin-bottom: 7px;
  }

  .article-type{
    color: #698ebf;
    /*display: inline;*/
    /*margin-top: 10px;*/
    float: right;
    margin-right: 20px;
  }

  .message-time{
    color: #999;
    margin-left: 50px;
  }

  .message-card .title>a{
    margin-top: 50px;
  }
  .article{
    margin-top: 12px;
  }

  .user-header-info p{
    margin-top: 21px;
  }

</style>
