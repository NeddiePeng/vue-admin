<template>
    <div class="container-node-list">
        <el-dialog
                title="添加秒杀商品"
                :visible.sync="dialogTableVisible"
                width="35%"
                :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="商品ID">
                    <el-input v-model="form.goods_id"></el-input>
                    <p class="input-tip">可在 <el-link type="primary" :underline="false">商品管理 - 商品列表</el-link> 中查看</p>
                </el-form-item>
                <el-form-item label="选择活动">
                    <el-select v-model="form.limit_id" placeholder="请选择">
                        <el-option
                                v-for="(item, index) in activityDataList.limit_time"
                                :key="index"
                                :label="item.cycle_start +'~'+ item.cycle_end"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogTableVisible = false">取 消</el-button>
    <el-button type="primary" @click="onSubmitAdd">确 定</el-button>
  </span>
        </el-dialog>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>应用中心</el-breadcrumb-item>
            <el-breadcrumb-item>整点秒杀</el-breadcrumb-item>
            <el-breadcrumb-item>秒杀商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <div>
            <el-row>
                <el-col :span="6">
                    <el-button type="success" size="small" @click="add"><i class="el-icon-plus"></i>新增</el-button>
                </el-col>
                <el-col :span="12">&nbsp;</el-col>
                <el-col :span="6">
                    <el-input placeholder="请输入商品名称" v-model="input" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
            </el-row>
        </div>
        <div class="content-node" style="padding-top: 20px">
            <el-table :data="list" stripe style="width: 100%">
                <el-table-column prop="goods_id" label="秒杀商品ID" width="100"></el-table-column>
                <el-table-column prop="address" label="商品信息" width="350">
                    <template slot-scope="scope">
                        <div class="goods-info activity-goods-data">
                            <el-row>
                                <el-col :span="6">
                                    <el-image style="width: 72px; height: 72px" :src="scope.row.goods.cover" fit="cover"></el-image>
                                </el-col>
                                <el-col :span="18">
                                    <div class="goods-name-sku">
                                        <p class="goods-name" style="padding-top: 15px">{{scope.row.goods.name}}</p>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="surplus_stock" label="累计销量" width="90"></el-table-column>
                <el-table-column prop="goods.total_stock" label="库存总量" width="90"></el-table-column>
                <el-table-column prop="id" label="排序" width="90"></el-table-column>
                <el-table-column prop="num" label="状态" width="100">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.status == 0">正常上架</el-tag>
                        <el-tag type="warning" v-else>已下架</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="create_time" label="创建时间" width="150"></el-table-column>
                <el-table-column prop="address" label="操作" width="120" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini" plain type="danger" icon="el-icon-delete" @click="del(scope.row.id, scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[15, 20, 30, 40]"
                        :page-size="limit"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {limitGoodsData, addLimitGoods, delGroupGoods} from "../../../request/blog/activity";

    import {activityData} from "../../../request/mall/add";

    export default {
        name: "LimitGoods",
        data() {
            return {
                form: {
                    goods_id: '',
                    limit_id: ''
                },
                textarea: '',
                dialogTableVisible: false,
                total: 0,
                currentPage: 1,
                limit: 15,
                input: '',
                list: [],
                activityDataList: []
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.currentPage = val;
                limitGoodsData(this, {
                    page: this.currentPage,
                    limit: this.limit
                });
            },
            handleSizeChange(val) {
                this.limit = val;
                limitGoodsData(this, {
                    page: this.currentPage,
                    limit: this.limit
                });
            },
            handleClose() {
                this.dialogTableVisible = false;
            },
            replayComment() {
                if(this.dialogTableVisible) {
                    this.dialogTableVisible = false;
                } else {
                    this.dialogTableVisible = true;
                }
            },
            add() {
                activityData(this);
                this.dialogTableVisible = true;
            },
            onSubmitAdd() {
                addLimitGoods(this, {
                    goods_ids: [this.form.goods_id],
                    limit_id: this.form.limit_id
                });
            },
            del(id, index) {
                delGroupGoods(this, {
                    id: id
                }, index);
            }
        },
        mounted() {
            limitGoodsData(this, {
                page: this.currentPage,
                limit: this.limit
            });
        }
    }
</script>

<style scoped>
    .input-tip{
        height: 30px;
        line-height: 30px;
        font-size: 12px;
    }
    .pagination {
        padding-top: 20px;
        text-align: right;
    }

    .content-node {
        padding-top: 70px;
    }

    .container-node-list {
        padding: 20px 10px;
    }
    .goods-info.activity-goods-data {
        height: 90px;
        font-size: 12px;
    }
    .goods-name-sku{
        padding: 0 10px 10px 0;
        margin-top: 10px;
    }
    .goods-info.activity-goods-data .el-image{
        margin-top: 10px;
    }
    .goods-name{
        font-size: 14px;
        max-height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-align: left !important;
        white-space: normal;
    }
    .goods-sku{
        padding-top: 10px;
    }
</style>