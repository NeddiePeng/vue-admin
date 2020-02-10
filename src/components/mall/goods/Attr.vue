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
                <el-steps :active="3" simple>
                    <el-step title="步骤 1" icon="el-icon-edit"></el-step>
                    <el-step title="步骤 2" icon="el-icon-upload"></el-step>
                    <el-step title="步骤 3" icon="el-icon-picture"></el-step>
                    <el-step title="步骤 3" icon="el-icon-picture"></el-step>
                    <el-step title="步骤 3" icon="el-icon-picture"></el-step>
                </el-steps>
            </div>
            <el-row :gutter="10" v-if="attrKey" v-for="(item, index) in attrKey" :key="index">
                <el-col :span="24">
                    <div class="input-item">
                        <label class="title">{{item.attr_name}}</label>
                        <div class="input-right">
                            <el-col style="padding-bottom: 5px" :span="3" :md="5" v-for="(list, index_i) in item.children" :key="index_i">
                                <el-upload
                                        class="avatar-uploader"
                                        :action="domain"
                                        :show-file-list="false"
                                        :data="qiniuData"
                                        :on-success="(response, file, fileList) => handleAvatarSuccess(response, file, fileList, index, index_i)"
                                        :before-upload="beforeAvatarUpload">
                                    <img v-if="list.img" :src="list.img" class="avatar">
                                    <i  v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <el-input v-model="list.name" placeholder="输入内容">
                                    <el-button slot="append" icon="el-icon-delete" @click="delKey(index, index_i)"></el-button>
                                </el-input>
                            </el-col>
                            <el-col :span="3" :md="5" style="padding-bottom: 5px"><el-button @click="addAttrKey(index)" type="primary" icon="el-icon-plus">添加{{item.attr_name}}</el-button></el-col>
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
    import {attrKeyData, addAttrValue, } from "../../../request/mall/add";
    import {getUploadToken} from "../../../request/common";

    export default {
        name: "Attr",
        data() {
            return {
                from_data: {
                    name: ''
                },
                attrKey: [],
                images_url: 'http://mall.img.aiweimeng.top/',
                domain: 'https://upload.qiniup.com',
                qiniuData: {
                    token : "",
                    key : ""
                }
            }
        },
        methods: {
            onSubmitData() {
                let submit_data = [], symbol = 1;
                for (let i = 0; i < this.attrKey.length; i++) {
                    for (let j = 0; j < this.attrKey[i].children.length; j++) {
                        symbol++;
                        submit_data.push({
                            key_id: this.attrKey[i]['id'],
                            symbol: symbol,
                            attr_value: this.attrKey[i].children[j].name,
                            image: this.attrKey[i].children[j].img
                        });
                    }
                }
                let goods_id = localStorage.getItem('product_id');
                addAttrValue(this, {
                    goods_id: goods_id,
                    attr_list: submit_data
                });
            },
            addAttrKey(index) {
                this.attrKey[index].children.push({'name': '', 'img': ''});
            },
            delKey(index, index_i) {
                if(this.attrKey[index].children.length == 1) {
                    return;
                }
                this.attrKey[index].children.splice(index_i,1);
            },
            handleAvatarSuccess(response, file, fileList, index, index_i) {
                if(response) {
                    this.attrKey[index].children[index_i].img = this.images_url + response.key;
                    console.log( this.attrKey);
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
            getToken() {
                getUploadToken(this, {
                    type: 'mall'
                });
            },
        },
        mounted() {
            let goods_id = localStorage.getItem('product_id');
            attrKeyData(this, {
                goods_id: goods_id
            })
        },
        created(){
            this.getToken();
        },
    }
</script>

<style>
    /*.attr-load .avatar-uploader-icon{
        width: 202px!important;
    }*/
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
        width: 202px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    .avatar {
        width: 202px;
        height: 100px;
        display: block;
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
</style>