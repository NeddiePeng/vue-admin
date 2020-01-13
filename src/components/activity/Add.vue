<template>
    <div class="container-node">
        <el-page-header @back="goBack" content="详情页面"></el-page-header>
        <div class="content">
            <el-row :gutter="10">
                <el-col :span="10">
                    <div class="input-item">
                        <label class="title">活动详情</label>
                        <div class="input-right">
                            <el-input v-model="from_data.name" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="10">
                    <div class="input-item">
                        <label class="title">活动详情</label>
                        <div class="input-right">
                            <el-select v-model="from_data.mask" placeholder="请选择"></el-select>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="10">
                    <div class="input-item">
                        <label class="title">活动详情</label>
                        <div class="input-right">
                            <el-input v-model="from_data.name" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="10">
                    <div class="input-item">
                        <label class="title">活动详情</label>
                        <div class="input-right">
                            <el-upload
                                    class="avatar-uploader"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                <img v-if="cover" :src="cover" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="15">
                    <div class="input-item">
                        <label class="title">活动详情</label>
                        <div class="input-right">
                            <editor id='tinymce' v-model='from_data.tinymceHtml' :init='init'></editor>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="input-item submit">
                <el-button type="danger">危险按钮</el-button>
                <el-button>默认按钮</el-button>
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


    export default {
        name: "Add",
        data() {
          return {
              from_data: {
                  name: '',
                  mask: '',
                  cover: '',
                  tinymceHtml: '请输入内容',
              },
              init: {
                  language_url: '/static/tinymce/langs/zh_CN.js',
                  language: 'zh_CN',
                  skin_url: '/static/tinymce/skins/ui/oxide',
                  height: 500,
                  plugins: 'link lists image media code table colorpicker textcolor wordcount contextmenu',
                  toolbar: 'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink media image code | removeformat',
                  branding: false,
                  images_upload_handler: (blobInfo, success, failure) => {
                      const img = 'data:image/jpeg;base64,' + blobInfo.base64()
                      success(img)
                  }
              }
          }
        },
        mounted () {
            tinymce.init({})
        },
        components: {Editor},
        methods: {
            goBack() {
                console.log('go back');
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
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