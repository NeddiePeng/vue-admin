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
                    <el-step title="步骤 1" icon="el-icon-edit"></el-step>
                    <el-step title="步骤 2" icon="el-icon-upload"></el-step>
                    <el-step title="步骤 3" icon="el-icon-picture"></el-step>
                    <el-step title="步骤 3" icon="el-icon-picture"></el-step>
                    <el-step title="步骤 3" icon="el-icon-picture"></el-step>
                </el-steps>
            </div>
            <div class="input-item">
                <h4 class="title">活动详情</h4>
                <el-row :gutter="10">
                    <el-col :span="3">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>卡片名称<i class="el-icon-arrow-right"></i></span>
                            </div>
                            <el-radio-group v-model="from_data.one_category" @change="selectCategory">
                                <div v-for="o in 4" :key="o" class="text item">
                                    <el-radio :label="o">{{'列表内容 ' + o }}</el-radio>
                                </div>
                            </el-radio-group>
                        </el-card>
                    </el-col>
                    <el-col :span="3" v-show="two">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>卡片名称<i class="el-icon-arrow-right"></i></span>
                            </div>
                            <el-radio-group v-model="from_data.two_category" @change="selectCategoryTwo">
                                <div v-for="o in 4" :key="o" class="text item">
                                    <el-radio :label="o">{{'列表内容 ' + o }}</el-radio>
                                </div>
                            </el-radio-group>
                        </el-card>
                    </el-col>
                    <el-col :span="3" v-show="three">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>卡片名称</span>
                            </div>
                            <el-radio-group v-model="from_data.three_category">
                                <div v-for="o in 4" :key="o" class="text item">
                                    <el-radio :label="o">{{'列表内容 ' + o }}</el-radio>
                                </div>
                            </el-radio-group>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
            <div class="input-item">
                <h4 class="title">活动详情</h4>
                <el-row :gutter="10">
                    <el-col :span="8">
                        <el-card class="box-card brand">
                            <el-radio-group v-model="from_data.brand_id">
                                <div v-for="o in 4" :key="o" class="text item">
                                    <el-radio :label="o">
                                        <el-image class="brand-img" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="cover"></el-image>
                                        {{'列表内容 ' + o }}
                                    </el-radio>
                                </div>
                            </el-radio-group>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
            <div class="input-item">
                <h4 class="title">活动详情：</h4>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
                    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="input-item">
                <h4 class="title">活动详情：</h4>
                <div class="brand-data">
                    <el-image class="brand-img" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="cover"></el-image>
                    列表内容
                </div>
            </div>
            <div class="input-item submit">
                <el-button type="danger">危险按钮</el-button>
                <el-button>默认按钮</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Basic",
        data() {
            return {
                two:false,
                three: false,
                from_data:{
                    one_category: 1,
                    two_category: 2,
                    three_category: 3,
                    brand_id: 0
                }
            }
        },
        methods: {
            selectCategory(data) {
                this.two = true;
            },
            selectCategoryTwo(data) {
                this.three = true;
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