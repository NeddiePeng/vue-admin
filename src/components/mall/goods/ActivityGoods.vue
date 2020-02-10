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
                <el-steps :active="6" simple>
                    <el-step title="步骤 1" icon="el-icon-edit"></el-step>
                    <el-step title="步骤 2" icon="el-icon-upload"></el-step>
                    <el-step title="步骤 3" icon="el-icon-picture"></el-step>
                    <el-step title="步骤 3" icon="el-icon-picture"></el-step>
                    <el-step title="步骤 3" icon="el-icon-picture"></el-step>
                    <el-step title="步骤 3" icon="el-icon-picture"></el-step>
                </el-steps>
            </div>
            <el-row :gutter="10" v-if="activityDataList.limit_time.length > 0">
                <el-col :span="24">
                    <div class="input-item">
                        <label class="title">限时购</label>
                        <div class="input-right">
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"
                                         @change="handleCheckAllChange">全选
                            </el-checkbox>
                            <div style="margin: 15px 0;"></div>
                            <el-checkbox-group v-model="from_data.limit_ids" @change="handleCheckedCitiesChange">
                                <el-checkbox v-for="(item, index) in activityDataList.limit_time" :label="item.id"
                                             :key="index">{{item.cycle_start + '-' + item.cycle_end}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10" v-if="activityDataList.mall_activity.length > 0">
                <el-col :span="24">
                    <div class="input-item">
                        <label class="title">广告活动</label>
                        <div class="input-right">
                            <el-checkbox :indeterminate="isIndeterminateAc" v-model="checkAllActivity"
                                         @change="handleCheckAllChangeActivity">全选
                            </el-checkbox>
                            <div style="margin: 15px 0;"></div>
                            <el-checkbox-group v-model="from_data.activity_ids" @change="handleCheckedCitiesChangeAc">
                                <el-checkbox v-for="(item, index) in activityDataList.mall_activity" :label="item.id"
                                             :key="index">{{item.title}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="10" v-if="activityDataList.is_exist_gift.length > 0">
                <el-col :span="24">
                    <div class="input-item">
                        <label class="title">免费小礼物</label>
                        <div class="input-right switch">
                            <el-switch
                                    style="display: block"
                                    v-model="gift_id"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    active-text="是"
                                    inactive-text="否"
                                    @change="changeSwitch">
                            </el-switch>
                        </div>
                        <div class="input-right" v-show="show">
                            <el-row :gutter="10">
                                <el-col :span="5">
                                    <el-input :disabled="true"
                                              v-model="activityDataList.is_exist_gift.cycle_time"></el-input>
                                </el-col>
                                <el-col :span="6">
                                    <el-input v-model="from_data.gift.stock" placeholder="请输入商品数量"></el-input>
                                </el-col>
                            </el-row>
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
    import {activityData, addGoodsActivity} from "../../../request/mall/add";

    export default {
        name: "ActivityGoods",
        data() {
            return {
                from_data: {
                    activity_ids: [],
                    gift: {
                        cycle: '',
                        stock: 0
                    },
                    limit_ids: [],
                    group: []
                },
                checkAll: false,
                checkAllActivity: false,
                isIndeterminate: false,
                activityDataList: [],
                isIndeterminateAc: false,
                gift_id: 0,
                show: false
            }
        },
        methods: {
            changeSwitch(val) {
                if (val) {
                    this.show = true;
                    this.from_data.gift.cycle = this.activityDataList && this.activityDataList['is_exist_gift'] ? this.activityDataList['is_exist_gift']['cycle_time'] : '';
                } else {
                    this.show = false;
                }
            },
            onSubmitData() {
                let group = [], activity = [];
                for (let i = 0; i < this.from_data.limit_ids.length; i++) {
                    group.push({
                        id: this.from_data.limit_ids[i],
                        stock: 10
                    });
                }
                for (let j = 0; j < this.from_data.activity_ids.length; j++) {
                    activity.push({
                        id: this.from_data.activity_ids[j],
                        stock: 10
                    });
                }
                let goods_id = localStorage.getItem('product_id');
                let data = {
                    group: group,
                    activity: activity,
                    gift: this.activityDataList.is_exist_gift.length > 0 ? this.from_data.gift : [],
                    goods_id: goods_id
                };
                addGoodsActivity(this, data);
            },
            handleCheckAllChangeActivity(val) {
                let ids = [];
                for (let i = 0; i < this.activityDataList['mall_activity'].length; i++) {
                    ids.push(this.activityDataList['mall_activity'][i].id);
                }
                this.from_data.activity_ids = val ? ids : [];
                this.isIndeterminateAc = false;
            },
            handleCheckAllChange(val) {
                let ids = [];
                for (let i = 0; i < this.activityDataList['limit_time'].length; i++) {
                    ids.push(this.activityDataList['limit_time'][i].id);
                }
                this.from_data.limit_ids = val ? ids : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.activityDataList['limit_time'].length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.activityDataList['limit_time'].length;
            },
            handleCheckedCitiesChangeAc(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.activityDataList['mall_activity'].length;
                this.isIndeterminateAc = checkedCount > 0 && checkedCount < this.activityDataList['mall_activity'].length;
            }
        },
        mounted() {
            activityData(this);
        }
    }
</script>

<style>
    .switch {
        height: 40px;
        line-height: 40px;
    }

    .el-switch {
        padding-top: 10px;
    }

    .steps {
        padding-bottom: 50px;
        margin: 0 auto;
    }

    .submit {
        margin-top: 20px;
        padding-left: 120px;
    }

    .container-node {
        padding: 20px 10px;
    }

    .content {
        padding-top: 70px;
        width: 80%;
        margin: 0 auto;
    }

    .title {
        padding-bottom: 15px;
        float: left;
        width: 100px;
        text-align: right;
        line-height: 40px;
    }

    .input-item {
        padding-bottom: 20px;
    }

    .input-right {
        margin-left: 120px;
    }
</style>