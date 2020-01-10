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
                <el-steps :active="2" simple>
                    <el-step title="步骤 1" icon="el-icon-edit"></el-step>
                    <el-step title="步骤 2" icon="el-icon-upload"></el-step>
                    <el-step title="步骤 3" icon="el-icon-picture"></el-step>
                    <el-step title="步骤 3" icon="el-icon-picture"></el-step>
                    <el-step title="步骤 3" icon="el-icon-picture"></el-step>
                </el-steps>
            </div>
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
                <el-col :span="12">
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
                            <el-col :span="5"><el-input v-model="from_data.price" placeholder="请输入内容"></el-input></el-col>
                            <el-col :span="5"><el-input v-model="from_data.vip_price" placeholder="请输入内容"></el-input></el-col>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="6">
                    <div class="input-item">
                        <label class="title">活动详情</label>
                        <div class="input-right">
                            <el-input v-model="from_data.total_stock" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="5">
                <el-col :span="15">
                    <div class="input-item">
                        <label class="title">活动详情</label>
                        <div class="input-right">
                            <el-col :span="6">
                                <el-select v-model="from_data.postage" clearable placeholder="请选择" @change="selectPostage">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="6" v-show="is_show">
                                <el-input v-model="from_data.total_stock" placeholder="请输入内容"></el-input>
                            </el-col>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <div class="input-item">
                        <label class="title">活动详情</label>
                        <div class="input-right">
                            <el-input v-model="from_data.total_stock" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <div class="input-item">
                        <label class="title">活动详情</label>
                        <div class="input-right">
                            <el-input type="textarea" :rows="4" v-model="from_data.descriptioins"></el-input>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <div class="input-item">
                        <label class="title">活动详情</label>
                        <div class="input-right">
                            <el-input type="textarea" :rows="4" v-model="from_data.descriptioins"></el-input>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
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
            <div class="input-item submit">
                <el-button type="danger">危险按钮</el-button>
                <el-button>默认按钮</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Price",
        data() {
            return {
                is_show:false,
                from_data: {
                    name: '',
                    price: 0,
                    vip_price: 0,
                    total_stock: 0,
                    postage: 0,
                    descriptioins: '',
                    cover: ''
                },
                options: [{
                    value: '0',
                    label: '黄金糕'
                }, {
                    value: '1',
                    label: '双皮奶'
                }, {
                    value: '2',
                    label: '蚵仔煎'
                }],
            }
        },
        methods: {
            selectPostage(data) {
                if(data == 1) {
                    this.is_show = true;
                } else {
                    this.is_show = false;
                }
            },
            handleAvatarSuccess(res, file) {
                this.from_data.cover = URL.createObjectURL(file.raw);
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