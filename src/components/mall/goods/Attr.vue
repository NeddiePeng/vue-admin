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
            <el-row :gutter="10">
                <el-col :span="24">
                    <div class="input-item">
                        <label class="title">活动详情</label>
                        <div class="input-right">
                            <el-col :span="3">
                                <el-input v-model="from_data.name" placeholder="请输入内容"></el-input>
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="from_data.name" placeholder="请输入内容"></el-input>
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="from_data.name" placeholder="请输入内容"></el-input>
                            </el-col>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="24">
                    <div class="input-item">
                        <label class="title">活动详情</label>
                        <div class="input-right">
                            <el-col :span="3">
                                <el-input v-model="from_data.name" placeholder="请输入内容"></el-input>
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="from_data.name" placeholder="请输入内容"></el-input>
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="from_data.name" placeholder="请输入内容"></el-input>
                            </el-col>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="24">
                    <div class="input-item">
                        <label class="title">活动详情</label>
                        <div class="input-right">
                            <el-col :span="3">
                                <el-input v-model="from_data.name" placeholder="请输入内容"></el-input>
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="from_data.name" placeholder="请输入内容"></el-input>
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="from_data.name" placeholder="请输入内容"></el-input>
                            </el-col>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="24">
                    <div class="input-item">
                        <label class="title">活动详情</label>
                        <div class="input-right">
                            <el-col :span="3">
                                <el-input v-model="from_data.name" placeholder="请输入内容"></el-input>
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="from_data.name" placeholder="请输入内容"></el-input>
                            </el-col>
                            <el-col :span="3">
                                <el-input v-model="from_data.name" placeholder="请输入内容"></el-input>
                            </el-col>
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
        name: "Attr",
        data() {
            return {
                from_data: {
                    name: ''
                }
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
</style>