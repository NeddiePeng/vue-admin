<template>
    <div class="basic container-node">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="content">
            <div class="steps">
                <el-steps :active="1" simple>
                    <el-step title="基本信息" icon="el-icon-edit"></el-step>
                    <el-step title="商品价格" icon="el-icon-upload"></el-step>
                    <el-step title="步骤 3" icon="el-icon-picture"></el-step>
                    <el-step title="步骤 3" icon="el-icon-picture"></el-step>
                    <el-step title="步骤 3" icon="el-icon-picture"></el-step>
                </el-steps>
            </div>
            <div class="input-item">
                <h4 class="title">商品分类</h4>
                <el-row :gutter="10">
                    <el-col :span="3" :md="6">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>一级分类<i class="el-icon-arrow-right"></i></span>
                            </div>
                            <el-radio-group v-model="from_data.one_category" @change="selectCategory">
                                <div v-for="(item, index) in one_data" :key="index" class="text item">
                                    <el-radio :label="item.id">{{item.name}}</el-radio>
                                </div>
                            </el-radio-group>
                        </el-card>
                    </el-col>
                    <el-col :span="3" v-show="two" :md="6">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>二级分类<i class="el-icon-arrow-right"></i></span>
                            </div>
                            <el-radio-group v-model="from_data.two_category" @change="selectCategoryTwo">
                                <div v-for="(item, index) in two_data" :key="index" class="text item">
                                    <el-radio :label="item.id">{{item.name}}</el-radio>
                                </div>
                            </el-radio-group>
                        </el-card>
                    </el-col>
                    <el-col :span="3" v-show="three" :md="6">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>三级分类</span>
                            </div>
                            <el-radio-group v-model="from_data.three_category">
                                <div v-for="(item, index) in three_data" :key="index" class="text item">
                                    <el-radio :label="item.id">{{item.name}}</el-radio>
                                </div>
                            </el-radio-group>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
            <div class="input-item">
                <h4 class="title">商品品牌</h4>
                <el-row :gutter="10">
                    <el-col :span="8" :md="18">
                        <el-card class="box-card brand">
                            <el-radio-group v-model="from_data.brand_id" @change="selectBrand">
                                <div v-for="(item, index) in allBrand" :key="index" class="text item">
                                    <el-radio :label="item.id">
                                        <el-image class="brand-img" :src="item.cover" fit="cover"></el-image>
                                        {{item.name}}
                                    </el-radio>
                                </div>
                            </el-radio-group>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
            <div class="input-item">
                <h4 class="title">已选分类：</h4>
                <el-breadcrumb separator="/" v-if="selectSortData.length > 0">
                    <el-breadcrumb-item v-for="(item, index) in selectSortData" :key="index">{{item.name}}</el-breadcrumb-item>
                </el-breadcrumb>
                <el-breadcrumb separator="/" v-else>
                    <el-breadcrumb-item>
                        <span style="color:#F56C6C;"><i class="el-icon-warning"></i>请选择商品分类</span>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="input-item">
                <h4 class="title">已选品牌：</h4>
                <div class="brand-data" v-if="selectBrandData">
                    <el-image class="brand-img" :src="selectBrandData.cover" fit="cover"></el-image>
                    {{selectBrandData.name}}
                </div>
                <div v-else class="brand-data" style="color: #F56C6C"><i class="el-icon-warning"></i>请选择商品品牌</div>
            </div>
            <div class="input-item submit">
                <el-button type="danger" @click="submitData">立即提交</el-button>
                <el-button>返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {categoryData, allBrandData} from "../../../request/mall/category";
    import {addBasic} from "../../../request/mall/add";

    export default {
        name: "Basic",
        data() {
            return {
                two:false,
                three: false,
                from_data:{
                    one_category: 0,
                    two_category: 0,
                    three_category: 0,
                    brand_id: 0
                },
                one_data: [],
                two_data: [],
                three_data: [],
                brand_data: [],
                allBrand: [],
                selectBrandData: null,
                selectSortData: []
            }
        },
        methods: {
            submitData() {
                if(!this.from_data.brand_id) {
                    this.$message.error({'message':'错了哦，请先选择商品品牌', offset: '80'});
                    return;
                }
                if(!this.from_data.one_category) {
                    this.$message.error('错了哦，请先选择商品分类');
                    return;
                }
                if(this.two_data && !this.from_data.two_category) {
                    this.$message.error('错了哦，请先选择商品二级分类');
                    return;
                }
                addBasic(this, this.from_data);
            },
            selectBrand(data) {
                this.selectBrandData = null;
                for (let i = 0; i < this.allBrand.length; i++) {
                    if(this.allBrand[i].id == data) {
                        this.selectBrandData = this.allBrand[i];
                    }
                }
            },
            selectCategory(data) {
                if(!this.two_data) {
                    this.two = false;
                }
                this.selectSortData = [];
                this.from_data.two_category = 0;
                for (let i = 0; i < this.one_data.length; i++) {
                    if(this.one_data[i].id == data) {
                        this.selectSortData.push(this.one_data[i]);
                    }
                }
                categoryData(this, {
                    one_id: this.from_data.one_category,
                    two_id: this.from_data.two_category
                });
            },
            selectCategoryTwo(data) {
                if(!this.three_data) {
                    this.three = false;
                }
                if(this.selectSortData.length > 1) {
                    this.selectSortData.splice(1,1);
                }
                for (let i = 0; i < this.two_data.length; i++) {
                    if(this.two_data[i].id == data) {
                        this.selectSortData.push(this.two_data[i]);
                    }
                }
                categoryData(this, {
                    one_id: 0,
                    two_id: this.from_data.two_category
                });
            }
        },
        mounted() {
            categoryData(this, {
                one_id: this.from_data.one_category,
                two_id: this.from_data.two_category
            });
            allBrandData(this);
        }
    }
</script>

<style>
    .el-card__body{
        height: 150px;
        overflow-y: auto;
    }
    .steps{
        padding-bottom: 50px;
        margin: 0 auto;
    }
    .submit{
        margin-top: 20px;
    }
    .container-node{
        padding: 20px 10px;
    }
    .content{
        padding-top: 70px;
        width: 80%;
        margin: 0 auto;
    }
    .item{
        padding: 7px 0;
    }
    .title{
        padding-bottom: 15px;
    }
    .input-item{
        padding-bottom: 20px;
    }


    .el-radio *{
        vertical-align: middle;
    }
    .brand-img{
        width: 50px; height: 30px;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;
    }
    .brand .item{
        float: left;
        padding-right: 20px;
    }
    .brand-data *{
        vertical-align: middle;
    }
</style>