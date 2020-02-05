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
                    <el-step title="基本信息" icon="el-icon-edit"></el-step>
                    <el-step title="商品价格" icon="el-icon-upload"></el-step>
                    <el-step title="步骤 3" icon="el-icon-picture"></el-step>
                    <el-step title="步骤 3" icon="el-icon-picture"></el-step>
                    <el-step title="步骤 3" icon="el-icon-picture"></el-step>
                </el-steps>
            </div>
            <el-row :gutter="10">
                <el-col :span="10" :md="15">
                    <div class="input-item">
                        <label class="title">商品名称</label>
                        <div class="input-right">
                            <el-input v-model="from_data.name" placeholder="请输入商品名称"></el-input>
                            <p class="error-message">
                                <i class="el-icon-warning-outline"></i>
                                <span class="content-message">商品名称最大100个字</span>
                            </p>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12">
                    <div class="input-item">
                        <label class="title">商品封面图</label>
                        <div class="input-right">
                            <el-upload
                                    class="avatar-uploader"
                                    :action="domain"
                                    :show-file-list="false"
                                    :data="qiniuData"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                <img v-if="from_data.cover" :src="from_data.cover" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <p class="error-message">
                                <i class="el-icon-warning-outline"></i>
                                <span class="content-message">建议图片大小不超过500kb</span>
                            </p>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="15" :md="20">
                    <div class="input-item">
                        <label class="title">商品价格</label>
                        <div class="input-right">
                            <el-row :gutter="5">
                                <el-col :span="5"><el-input v-model="from_data.price" placeholder="商品原价"></el-input></el-col>
                                <el-col :span="5"><el-input v-model="from_data.vip_price" placeholder="会员价"></el-input></el-col>
                            </el-row>
                            <p class="error-message" style="padding-top: 0;">
                                <i class="el-icon-warning-outline"></i>
                                <span class="content-message">默认会员价是原价的<span>{{price_scale}}</span></span>
                            </p>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="6" :md="10">
                    <div class="input-item">
                        <label class="title">商品总库存</label>
                        <div class="input-right">
                            <el-input v-model="from_data.total_stock" placeholder="商品库存"></el-input>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="5">
                <el-col :span="15">
                    <div class="input-item">
                        <label class="title">商品邮费</label>
                        <div class="input-right">
                            <el-col :span="6" :md="8">
                                <el-select v-model="from_data.postage_select" clearable placeholder="请选择" @change="selectPostage">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="6" :md="8" v-show="is_show">
                                <el-input v-model="from_data.postage" placeholder="请输入邮费"></el-input>
                            </el-col>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12" :md="20">
                    <div class="input-item">
                        <label class="title">seo关键字</label>
                        <div class="input-right">
                            <el-input v-model="from_data.seo" placeholder="输入seo关键字"></el-input>
                            <p class="error-message">
                                <i class="el-icon-warning-outline"></i>
                                <span class="content-message">
                                    seo关键字利于用户在搜索商品时更好的得到搜索的结果<br/>
                                    每个关键词之间用逗号隔开
                                </span>
                            </p>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12" :md="20">
                    <div class="input-item">
                        <label class="title">商品属性</label>
                        <div class="input-right">
                            <el-input type="textarea" :rows="4" v-model="attr_value" placeholder="商品属性"></el-input>
                            <p class="error-message">
                                <i class="el-icon-warning-outline"></i>
                                <span class="content-message">填写商品属性时每行只能有一个属性</span>
                            </p>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12" :md="20">
                    <div class="input-item">
                        <label class="title">商品简单描述</label>
                        <div class="input-right">
                            <el-input type="textarea" :rows="4" v-model="from_data.desc" placeholder="商品描述"></el-input>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="12" :md="24">
                    <div class="input-item">
                        <label class="title">商品图册</label>
                        <div class="input-right list-images">
                            <el-upload
                                    :action="domain"
                                    list-type="picture-card"
                                    multiple
                                    accept="image/*"
                                    :data="qiniuData"
                                    :before-upload="beforeUploadGetToken"
                                    :on-preview="handlePictureCardPreview"
                                    :on-success="handleSuccess">
                                <i class="el-icon-plus"></i>
                            </el-upload>
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
    import {getUploadToken} from "../../../request/common";
    import {addGoodsPrice} from "../../../request/mall/add";

    export default {
        name: "Price",
        data() {
            return {
                price_scale: '80%',
                is_show:false,
                images_url: 'http://mall.img.aiweimeng.top/',
                domain: 'https://upload.qiniup.com',
                dialogImageUrl:'',
                dialogVisible: false,
                uploadSuccessList: [],
                qiniuData: {
                    token : "",
                    key : ""
                },
                attr_value: '',
                from_data: {
                    goods_id: 0,
                    name: '',
                    price: '',
                    vip_price: '',
                    total_stock: '',
                    postage: 0,
                    desc: '',
                    cover: '',
                    seo: '',
                    attr: [],
                    images: [],
                    postage_select: ''
                },
                options: [{
                    value: '0',
                    label: '包邮'
                }, {
                    value: '1',
                    label: '不包邮'
                }],
            }
        },
        methods: {
            onSubmitData() {
                this.from_data.goods_id = localStorage.getItem('product_id');
                this.from_data.images = this.uploadSuccessList;
                this.from_data.attr =  this.attr_value.split("\n");
                addGoodsPrice(this, this.from_data);
            },
            selectPostage(data) {
                if(data == 1) {
                    this.is_show = true;
                } else {
                    this.is_show = false;
                }
            },
            handleAvatarSuccess(response, file) {
                if(response) {
                    this.from_data.cover = this.images_url + response.key;
                    console.log(this.from_data.cover);
                }
            },
            beforeAvatarUpload() {
                this.qiniuData.key = this.guid();
            },
            S4(){
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            },
            guid() {
                return (this.S4()+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+this.S4()+this.S4());
            },
            beforeUploadGetToken() {
                this.qiniuData.key = this.guid();
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            getToken() {
                getUploadToken(this, {
                    type: 'mall'
                });
            },
            handleSuccess(response, file, fileList) {
                if(response) {
                    const url = this.images_url + response.key;
                    let count = this.uploadSuccessList.length;
                    this.uploadSuccessList.push({url: url, level: count});
                }
            }
        },
        created(){
            this.getToken();
        },
    }
</script>

<style>
    .input-right.list-images li, .input-right.list-images > div > div{
        width: 100px!important;
        height: 100px!important;
    }
    .input-right.list-images > div > div{
        line-height: 100px!important;
    }
    .error-message{
        color: #F56C6C;
        font-size: 12px;
        padding-top: 5px;
    }
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
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>