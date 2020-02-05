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
    import {attrKeyData, addAttrValue} from "../../../request/mall/add";

    export default {
        name: "Attr",
        data() {
            return {
                from_data: {
                    name: ''
                },
                attrKey: []
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
                            attr_value: this.attrKey[i].children[j].name
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
                this.attrKey[index].children.push({'name': ''});
            },
            delKey(index, index_i) {
                if(this.attrKey[index].children.length == 1) {
                    return;
                }
                this.attrKey[index].children.splice(index_i,1);
            }
        },
        mounted() {
            let goods_id = localStorage.getItem('product_id');
            attrKeyData(this, {
                goods_id: goods_id
            })
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