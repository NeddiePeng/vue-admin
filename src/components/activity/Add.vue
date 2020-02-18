<template>
    <div class="container-node">
        <el-page-header @back="goBack" content="活动首页"></el-page-header>
        <div class="content">
            <el-row :gutter="10">
                <el-col :span="10">
                    <div class="input-item">
                        <label class="title">活动名称</label>
                        <div class="input-right">
                            <el-input v-model="from_data.title" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="10">
                    <div class="input-item">
                        <label class="title">活动显示位置</label>
                        <div class="input-right">
                            <el-select v-model="from_data.mask_id" placeholder="请选择">
                                <el-option v-for="(item, index) in activity_mask" :key="index" :value="item.id" :label="item.mask_title"></el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="10">
                    <div class="input-item">
                        <label class="title">活动类型</label>
                        <div class="input-right">
                            <el-select v-model="from_data.type" placeholder="请选择">
                                <el-option key="article" label="文章" value="article"></el-option>
                                <el-option key="link" label="外部链接" value="link"></el-option>
                                <el-option key="content" label="文字说明" value="content"></el-option>
                                <el-option key="goods" label="商品链接" value="goods"></el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10" v-show="from_data.type != 'content'">
                <el-col :span="15">
                    <div class="input-item">
                        <label class="title">活动跳转</label>
                        <div class="input-right">
                            <el-input v-model="from_data.link" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="15" :md="15">
                    <div class="input-item">
                        <label class="title">活动简单描述</label>
                        <div class="input-right">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="from_data.desc"></el-input>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="10">
                    <div class="input-item">
                        <label class="title">封面图</label>
                        <div class="input-right">
                            <el-upload
                                    class="avatar-uploader"
                                    accept='image/*'
                                    action="https://upload.qiniup.com"
                                    :show-file-list="false"
                                    :data="qiniuData"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                <img v-if="from_data.cover" :src="from_data.cover" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10" v-show="from_data.type == 'content'">
                <el-col :span="15" :md="20">
                    <div class="input-item">
                        <label class="title">活动说明</label>
                        <div class="input-right">
                            <editor id='tinymce' v-model='from_data.content' :init='init'></editor>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="input-item submit">
                <el-button type="danger" @click="handleSubmit">提交</el-button>
                <el-button>取消</el-button>
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
    import {mask, create, detail, update} from "../../request/blog/activity";
    import {getUploadToken} from "../../request/common";

    export default {
        name: "Add",
        data() {
          return {
              from_data: {
                  id: 0,
                  title: '',
                  mask_id: '',
                  cover: '',
                  content: '请输入内容',
                  type: 'article',
                  link: '',
                  object_type: 'blog',
                  desc: ''
              },
              images_url: 'http://img.aiweimeng.top/',
              activity_mask: [],
              init: {
                  language_url: '/static/tinymce/langs/zh_CN.js',
                  language: 'zh_CN',
                  skin_url: '/static/tinymce/skins/ui/oxide',
                  height: 500,
                  plugins: 'link lists code table colorpicker textcolor wordcount contextmenu',
                  toolbar: 'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink code | removeformat',
                  branding: false,
                  images_upload_handler: (blobInfo, success, failure) => {
                      const img = 'data:image/jpeg;base64,' + blobInfo.base64();
                      success(img)
                  }
              },
              qiniuData: {
                  token : "",
                  key : ""
              }
          }
        },
        mounted () {
            this.from_data.object_type = this.$route.query.type ? this.$route.query.type : 'blog';
            tinymce.init({});
            let id = this.$route.query.id;
            if(id) {
                detail(this, {
                    id: id
                });
            }
            mask(this);
        },
        components: {Editor},
        methods: {
            handleSubmit() {
                if(this.from_data.id) {
                    update(this, this.from_data);
                } else {
                    create(this, this.from_data);
                }
            },
            goBack() {
                this.$router.go(-1);
            },
            S4(){
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            },
            guid() {
                return (this.S4()+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+this.S4()+this.S4());
            },
            handleAvatarSuccess(response, file) {
                if(response) {
                    this.from_data.cover = this.images_url + response.key;
                }
            },
            beforeAvatarUpload() {
                this.qiniuData.key = this.guid();
            },
            getToken() {
                getUploadToken(this, {
                    type: 'activity'
                });
            },
        },
        created(){
            this.getToken();
        },
    }
</script>

<style>
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
        font-size: 14px;
    }
    .input-item{
        padding-bottom: 20px;
    }
    .input-right{
        margin-left: 120px;
    }



    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>