<template>
  <div>
    <!--导航栏-->
    <v-header ref="header"></v-header>
    <!--编辑区-->
    <div class="container edit">
      <h2>个人资料</h2>
      <form class="form-horizontal" onsubmit="return false;">

        <!--头像-->
        <div class="form-group">
          <label class="col-sm-2 control-label">头像</label>
          <div class="col-sm-10 img">
            <img class="img-rounded" :src="user.img" alt="">
            <input type="file"  id="file" ref="file" @change="upload($event)">

            <a href="javascript:void(0)"  id="edit-img"  @click="changeUserImg">编辑</a>
          </div>
        </div>
        <hr>
        <div class="form-group">
          <label for="inputName" class="col-sm-2 control-label" >名称</label>
          <div class="col-sm-10">
            <input type="text" class="form-control edit-form" id="inputName" v-model="name">
            <!--<input type="text" class="form-control edit-form" id="username" placeholder="" value="${blogger.bloggerUsername}" hidden>-->
          </div>
        </div>
        <hr>
        <div class="form-group">
          <label for="inputSign" class="col-sm-2 control-label">一句话介绍自己</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="inputSign" placeholder="说点什么吧..." v-model="sign">
          </div>
        </div>
        <hr>
        <div class="form-group">
          <label for="inputInfo" class="col-sm-2 control-label">个人介绍</label>
          <div class="col-sm-10">
            <!--<input type="text" class="form-control" id="inputInfo" placeholder="" value>-->
            <textarea class="form-control" id="inputInfo" placeholder="" v-model="info"></textarea>
          </div>
        </div>
        <hr>
        <div class="form-group">
          <label for="inputPhone" class="col-sm-2 control-label">手机号</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="inputPhone" placeholder="" v-model="phone">
          </div>
        </div>
        <hr>
        <div class="form-group">
          <label for="email" class="col-sm-2 control-label">邮箱</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="email" placeholder="" v-model="email">
          </div>
        </div>
        <hr>

        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <button id="submit" class="btn btn-primary" @click="updateInfo">修改</button>
          </div>
        </div>
      </form>

    </div>
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
  export default {
    name: 'userSetting',
    components: {
      // 2.注册header
      'v-header': header
    },
    data () {
      return {
        name: '',
        info: '',
        sign: '',
        email: '',
        phone: '',
        user: [] // 用户信息
      }
    },
    mounted: function () {
      // console.log('username=' + this.username + ',password=' + this.password)
      this.getUserInfo()
    },
    methods: {
      getUserInfo: function () {
        this.$http.get(`${process.env.API_ROOT}/user/get_user_info.do`).then(response => {
          if (response.data.status === 0) {
            console.log('设置页面，信息：')
            this.user = response.data.data
            console.log(response.data.data)

            this.name = response.data.data.name
            this.sign = response.data.data.sign
            this.info = response.data.data.info
            this.phone = response.data.data.phone
            this.email = response.data.data.email
            // thi
            console.log(this.user)
          } else if (response.data.status === 10) {
            // 未登入
            window.location.href = '/login'
          } else {
            alert(response.data.msg)
          }
        }, response => {
          console.log('error')
        })
      },
      // 上传图片
      upload: function (event) {
        let file = event.target.files[0]
        let config = { headers: { 'Content-Type': 'multipart/form-data' } }
        const formData = new FormData()
        formData.append('file', file)

        this.$http.post(`${process.env.API_ROOT}/user/settings/img`, formData, config).then(response => {
          if (response.data.status === 0) {
            console.log('更新头像成功')
            console.log(response.data)
            // 刷新当前页面
            this.getUserInfo()
            // 父组件调用子组件的方法
            this.$refs.header.getUserInfo()
          } else if (response.data.status === 10) {
            // 未登入
            window.location.href = '/login'
          } else {
            alert(response.data.msg)
          }
        }, response => {
          console.log('error')
        })
      },
      // 修改背景图片
      changeUserImg: function () {
        this.$refs.file.click()
      },
      // 更新用户信息
      updateInfo: function () {
        this.$http.post(`${process.env.API_ROOT}/user/update_information.do`, {
          'name': this.name,
          'sign': this.sign,
          'info': this.info,
          'email': this.email,
          'phone': this.phone
        }, {emulateJSON: true}).then(response => {
          console.log('修改后的信息：')
          console.log(response.data)
          if (response.data.status === 0) {
            // 重新获取用户信息
            this.getUserInfo()
          }
            // console.log(response)
            // 登入后跳转到首页
            // this.$router.replace('/')
            // window.location.href = '/'
            // this.$router.push('/')
            // this.$router.go(-1)
            // this.$router.go(0)
            // sessionStorage.setItem('token', response.data.data)
            // document.cookie = 'SESSION=' + response.data.data
            // get body data
            // this.someData = response.body;
          }, response => {
          console.log('error')
        })
      }
    }
  }
</script>

<style scoped>
  .edit{
    margin-top: 12px;
    background: #fff;
    height: auto;
    padding-bottom: 12px;
  }
  .edit h2{
    /*background: #000;*/
    margin-left: 25px;
    margin-top: 28px;
  }

  .edit .form-group{
    /*border-bottom: 1px solid #000;*/
    /*border-bottom-width: ;*/
  }
  .edit .form-group textarea{
    /*禁止拉伸*/
    resize: none;

  }

  .edit .form-group:after {
    /*content: '';*/
    /*position: absolute;*/
    /*left: 18px;*/
    /*top: auto;*/
    /*bottom: 0;*/
    /*right: auto;*/
    /*height: 6px;*/
    /*width: 105px;*/
    /*background-color: #32b66b;*/
  }

  .edit .form-horizontal {
    width: 82%;
    margin:0 auto;
    /*background: #ccc;*/
    /*margin-top: 10px;*/
  }

  .edit .form-horizontal .form-group{
    /*background: red;*/
    /*padding-bottom: 20px;*/
    margin-top: 30px;
    margin-bottom: 30px;
    /*line-height: 100%;*/

  }

  .edit  hr {

    margin: 0 auto;
    width: 85%;
    /*margin-top: 10px;*/
  }

  /*一句话介绍自己*/
  #inputSign{
    height: 48px;

  }

  .form-group .img:hover{
    z-index: 4;
    /*border: 4px solid #fff;*/

    /*background: #1a1a1a;*/
    /*background: rgba(122,122,122,0.5);*/

  }
  .form-group label{
    font-size:18px;
  }
  /*头像*/
  .form-group .img-rounded {

    /*z-index: 999;*/
    height: 160px;
    border-radius: 8px;

    /*cursor: pointer;*/
  }
  #inputInfo{
    height: 120px;

  }
  .form-group button{
    padding: 10px 16px 10px 16px ;
    font-size: 16px;
    /*padding: 10px;*/
  }
  input[type="file"] {
    display: none;
  }

  #edit-img{
    /*float: right;*/
    /*margin-top: 80px;*/
    /*margin-right: 50px;*/
    /*line-height: 50px;*/
    /*line-height: 100%;*/
    margin-left: 40px;
    color: #175199;
    text-decoration: none;

  }
</style>
