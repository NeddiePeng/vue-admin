<template>
    <div class="container-node">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="content">
            <div class="steps">
                <el-steps :active="5" simple>
                    <el-step title="步骤 1" icon="el-icon-edit"></el-step>
                    <el-step title="步骤 2" icon="el-icon-upload"></el-step>
                    <el-step title="步骤 3" icon="el-icon-picture"></el-step>
                    <el-step title="步骤 3" icon="el-icon-picture"></el-step>
                    <el-step title="步骤 3" icon="el-icon-picture"></el-step>
                </el-steps>
            </div>
            <el-row :gutter="10">
                <el-col :span="24">
                    <div class="input-item">
                        <label class="title">活动详情</label>
                        <div class="input-right">
                            <div class='tinymce'>
                                <editor id='tinymce' v-model='tinymceHtml' :init='init'></editor>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="input-item submit">
                <el-button type="danger" @click="onSubmitData">立即提交</el-button>
                <el-button>返回上一步</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import tinymce from 'tinymce/tinymce'
    import 'tinymce/themes/silver/theme'
    import Editor from '@tinymce/tinymce-vue'
    import 'tinymce/plugins/image'
    import 'tinymce/plugins/media'
    import 'tinymce/plugins/link'
    import 'tinymce/plugins/code'
    import 'tinymce/plugins/table'
    import 'tinymce/plugins/lists'
    import 'tinymce/plugins/contextmenu'
    import 'tinymce/plugins/wordcount'
    import 'tinymce/plugins/colorpicker'
    import 'tinymce/plugins/textcolor'
    import {addGoodsDetail} from "../../../request/mall/add";
    import axios from 'axios';
    import {getUploadToken} from "../../../request/common";

    export default {
        name: "Detail",
        data() {
          return {
              images_url: 'http://mall.img.aiweimeng.top/',
              qiniuData: {
                  token : "",
                  key : ""
              },
              tinymceHtml: '请输入内容',
              init: {
                  language_url: '/static/tinymce/langs/zh_CN.js',
                  language: 'zh_CN',
                  skin_url: '/static/tinymce/skins/ui/oxide',
                  height: 500,
                  plugins: 'link lists image media code table colorpicker textcolor wordcount contextmenu',
                  toolbar: 'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink media image code | removeformat',
                  branding: false,
                  images_upload_handler: (blobInfo, success, failure) => {
                      this.getToken();
                      this.qiniuData.key = this.guid();
                      let time = setInterval(() => {
                          if(this.qiniuData.token) {
                              clearInterval(time);
                              this.uploadImage(blobInfo.blob(), success);
                          }
                      }, 1000);
                  }
              }
          }
        },
        methods: {
            getToken() {
                getUploadToken(this, {
                    type: 'mall'
                });
            },
            S4(){
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            },
            guid() {
                return (this.S4()+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+this.S4()+this.S4());
            },
            onSubmitData() {
                let goods_id = localStorage.getItem('product_id');
                addGoodsDetail(this, {
                    goods_id: goods_id,
                    content: this.tinymceHtml
                });
            },
            uploadImage(file, success) {
                let _this = this;
                const axiosInstance = axios.create({withCredentials: false});
                let data = new FormData();
                data.append('token', this.qiniuData.token);
                data.append('key', this.qiniuData.key);
                data.append('file', file);
                axiosInstance({
                    method: 'POST',
                    url: 'http://upload.qiniup.com/',
                    data: data,
                    timeout: 30000,
                    onUploadProgress: (progressEvent) => {
                        let imgLoadPercent = Math.round(progressEvent.loaded * 100 / progressEvent.total);
                    },
                }).then(data => {
                    if(data.data) {
                        success(_this.images_url + data.data.key);
                    }
                }).catch(function(err) {
                    console.log(err);
                });
            }
        },
        mounted () {
            tinymce.init({})
        },
        components: {Editor}
    }
</script>

<style>
    .steps{
        padding-bottom: 50px;
        margin: 0 auto;
    }
    .submit{
        margin-top: 20px;
        padding-left: 120px;
    }
    .container-node{
        padding: 20px 10px;
    }
    .content{
        padding-top: 70px;
        width: 80%;
        margin: 0 auto;
    }
    .title{
        padding-bottom: 15px;
        float: left;
        width: 100px;
        text-align: right;
        line-height: 40px;
    }
    .input-item{
        padding-bottom: 20px;
    }
    .input-right{
        margin-left: 120px;
    }
</style>