<template>
  <div class="WrapContent">
    <div id="header">
      <div id="progress"></div>

      <!--上传图片-->
      <div class="img" v-if="!isVedio" @click="change" :style="{'background-image': 'url(' + articleImg + ')',opacity:imgDom.opacity}">
        <div class="img-content" :style="{display:imgDom.display}">
          <i class="fa fa-file-photo-o fa-2x"></i>
          <span>上传图片</span>
        </div>
      </div>

      <div class="img" v-else @click="change">
        <video class="img-thumbnail img-responsive center-block article-img"
               :src="{'background-image': 'url(' + articleImg + ')'}"
               controls="controls">
        </video>
        <!--<div class="img-content">-->
          <!--<i class="fa fa-file-photo-o fa-2x"></i>-->
          <!--<span>上传图片</span>-->
        <!--</div>-->

      </div>

      <!--标题-->
      <textarea id="title" placeholder="这里写标题..."  maxlength="100" autofocus v-model="title"></textarea>

    </div>

    <textarea id="editor" placeholder=""  cols="20" v-model="content">
    </textarea>
    <input type="file" id="file" class="WriteCover-uploadInput" name="file" accept=".jpeg, .jpg, .png, .mp4, .mov, .3gp, .avi, .rmvb" hidden ref="file" @change="upload($event)">

    <div>
      <div class="select">
        <label>博客分类:</label>
        <select name="type" id="type" v-model="categoryId" @change="getCategoryId">
          <!--分类-->
          <option v-for="category in categoryList"
                  :key="category.id"
                  :value="category.id"
          >
            {{category.name}}
          </option>
        </select>

      </div>
      <button id="submit" @click="addArticle">发布</button>

    </div>

  </div>
</template>

<script>
  import Simditor from 'simditor'
  import '../../../static/simditor/styles/simditor.css'
  import '../../../static/font-awesome-4.7.0/css/font-awesome.css'
  import '../../../static/js/jquery-3.2.1'
  import '../../../static/simditor/scripts/module'
  import '../../../static/simditor/scripts/hotkeys'
  import '../../../static/simditor/scripts/uploader'
  import '../../../static/simditor/scripts/simditor'
  import '../../../static/toastr/toastr.css'
  import '../../../static/toastr/toastr.min'
  import '../../../static/js/progressbar'
  // 引入自己的js方法
  import {matchType} from '../../utils/util'

  export default {
    name: 'write',
    data () {
      return {
        editor: '',
        title: '',
        content: '',
        articleImg: '',
        isVedio: false,
        progress: '',
        // 修改img的样式
        imgDom: {
          opacity: 0.3,
          display: 'block'
        },
        categoryList: [], // 分类列表
        categoryId: '' // 选中的分类id
      }
    },
    mounted () {
      this.createEditor()
      this.getCategory()
    },
    methods: {
      valueChange (e, val) {
        this.$emit('change', this.editor.getValue())
        console.log('value=' + this.editor.val)
      },
      createEditor: function () {
        this.editor = new Simditor(Object.assign({}, {
          textarea: $('#editor'),
          // 工具栏
          toolbar: [
            'title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color', 'ol', 'ul', 'blockquote', 'code', 'table', 'link', 'image', 'hr', 'indent', 'outdent', 'alignment'
          ],
          // 默认图片
          defaultImage: false,
          pasteImage: true, // 支持通过从剪贴板粘贴图像来上传。与uploadFirefox和Chrome 一起工作并且仅支持它。
          upload: {
            url: `${process.env.API_ROOT}/upload/articleImg`, // 上传api网址
            // 发送给服务器的额外参数
            params: null,
            fileKey: 'file', // 文件参数的关键
            connectionCount: 8, // 可以同时上传多少张图片
            leaveConfirm: 'Uploading is in progress, are you sure to leave this page?' // 如果在文件上传时离开页面，则会显示消息
          }
          // optional options
          // editor.setValue("hello world");
        }))
        this.editor.on('valuechanged', (e, src) => {
          this.valueChange(e, src)
        })
      },
      addArticle: function () {
        this.$http.post(`${process.env.API_ROOT}/article/add.do`, {
          // this.$http.jsonp(`${process.env.API_ROOT}/user/login.do`, {
          'title': this.title,
          'content': $('.simditor-body').text(), // text内容
          'htmlContent': this.editor.getValue(),
          'categoryId': this.categoryId,
          'img': this.articleImg,
          'isVedio': this.isVedio
        }, {emulateJSON: true}).then(response => {
          console.log(response.data)
          if (response.data.status === 0) {
            window.location.href = '/'
          }
        }, response => {
          console.log('error')
        })
      },
      // 上传文章图片
      upload: function (event) {
        let file = event.target.files[0]
        let config = { headers: { 'Content-Type': 'multipart/form-data' } }
        const formData = new FormData()
        formData.append('file', file)
        this.$http.post(`${process.env.API_ROOT}/upload/articleImg`, formData, config, {
          progress: function (event) {
            this.progress = event
            console.log('进度：' + event)
          }
        }).then(response => {
          console.log('上传文章图片：')
          console.log(response.data)
          console.log('file name = ' + file.name)
          console.log(matchType(file.name))
          if (matchType(file.name) === 'video') {
            this.isVedio = true
          }
          if (response.data.success === true) {
            this.articleImg = response.data.file_path
            console.log('articleImg=' + this.articleImg)
            // 修改透明度
            this.imgDom.opacity = 1
            this.imgDom.display = 'none'
          }
        }, response => {
          console.log('error')
        })
      },
      change: function () {
        this.$refs.file.click()
      },
      // 获取分类
      getCategory: function () {
        // 请求登入
        this.$http.get(`${process.env.API_ROOT}/category/list.do`).then(response => {
          console.log('分类：')
          console.log(response.data)
          if (response.data.status === 0) {
            this.categoryList = response.data.data
            // 默认选中
            this.categoryId = this.categoryList[0].id
          }
        }, response => {
          console.log('error')
        })
      },
      getCategoryId: function () {
        console.log('categoryId=' + this.categoryId)
      }
    }
  }
</script>

<style scoped>
  /*内容*/
  .simditor{
    margin: 20px auto
    /*width: 55%;*/
  }

  .WrapContent{
    width: 55%;
    height: auto;
    /*height: 45px;*/
    /*background: green;*/
    margin: 0 auto;
  }

  #header{
  }

  #title{
    /*height: 45px;*/
    /*margin-top: 15px;*/

    min-height: 45px;
    display: block;
    width: 100%;

    margin: 0 auto;
    /*border: 0;*/
    font-size: 32px;
    line-height: 1.4;
    font-weight: 600;
    font-synthesis: style;
    outline: none;
    box-shadow: none;

    border: none;
    outline: none;
    resize: none;

    /*background: red;*/

  }

  #header .img{
    /*margin-top: 10px;*/
    margin: 15px auto;
    width: 100%;
    height: 190px;
    background: #ccc;

    opacity: 0.3;
    cursor: pointer;

  }

  #header .img .img-content{
    /*background: red;*/
    margin: 0 auto;
    text-align: center;
    line-height: 190px;
  }

  /*.select{*/
  /*margin-top: 15px;*/
  /*}*/

  .select>label{
    margin-right: 6px;
    padding: 0;
    width: 72px;
    line-height: 32px;
    text-align: right;

    font-size: 16px;
    color: #4F4F4F;
    margin-right: 10px;
  }

  .select>select {

    width: 138px;
    height: 32px;
    line-height: 32px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f4f4f4;
    box-sizing: border-box;
    padding-left: 16px;
    outline: none;
    text-transform: none;
    font-size: inherit;
  }
  /*发布*/
  #submit{
    background-color: transparent;
    border-color: #b3b3b3;
    color: gray;
    cursor: pointer;
    opacity: .5;
    width: 82px;
    height: 32px;
    line-height: 30px;
    padding: 0;
    border-radius: 4px;
    text-align: center;

    font: inherit;

    -webkit-appearance: none;
    margin-top: 15px;
    /*background: none;*/
    /*border: 1px solid;*/

  }

  #submit:hover{
    /*background-color: #007fff;*/
    color: #007fff;

  }
  /* 进度条 */
  #progress {
    margin: 20px;
    width: 400px;
    height: 8px;
    /*position: relative;*/
    position: absolute;
    left: 50%;
    margin-left: -200px;
    top: 135px;
    /*margin-top: 20px;*/
    display: none;

  }
</style>
