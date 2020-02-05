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
                <el-steps :active="4" simple>
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
                        <label class="title">商品属性组合</label>
                        <div class="input-right">
                            <el-col :span="3" :md="5" class="attr-item"><div class="attr-title">属性组合</div></el-col>
                            <el-col :span="3" :md="5" class="attr-item"><div class="attr-title">原价</div></el-col>
                            <el-col :span="3" :md="5" class="attr-item"><div class="attr-title">会员价</div></el-col>
                            <el-col :span="3" :md="5" class="attr-item"><div class="attr-title">库存</div></el-col>
                        </div>
                    </div>
                </el-col>
                <el-col :span="24">
                    <div class="input-right" v-if="comData" v-for="(item, index) in comData" :key="index">
                        <el-col :span="3" :md="5" class="attr-item">
                            <el-input v-model="item.name" :disabled="true" placeholder="请输入内容"></el-input>
                        </el-col>
                        <el-col :span="3" :md="5" class="attr-item">
                            <el-input v-model="item.price" placeholder="请输入价格"></el-input>
                        </el-col>
                        <el-col :span="3" :md="5" class="attr-item">
                            <el-input v-model="item.vip_price" placeholder="请输入会员价"></el-input>
                        </el-col>
                        <el-col :span="3" :md="5" class="attr-item">
                            <el-input v-model="item.stock" placeholder="请输入库存"></el-input>
                        </el-col>
                        <el-col :span="3" class="attr-item">
                            <el-button type="danger" icon="el-icon-delete" @click="delAttr(index)">删除</el-button>
                        </el-col>
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
    import {attrComData, addComData} from "../../../request/mall/add";

    export default {
        name: "Combination",
        data() {
            return {
                from_data: {
                    name: ''
                },
                comData:[]
            }
        },
        methods: {
            onSubmitData() {
                let goods_id = localStorage.getItem('product_id');
                addComData(this, {
                    goods_id: goods_id,
                    sku_data: this.comData
                });
            },
            delAttr(index) {
                if(this.comData.length < 2) {
                    return;
                }
                this.comData.splice(index, 1);
            }
        },
        mounted() {
            let goods_id = localStorage.getItem('product_id');
            attrComData(this, {
                goods_id: goods_id
            })
        }
    }
</script>

<style>
    .attr-item{
        padding-bottom: 10px;
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