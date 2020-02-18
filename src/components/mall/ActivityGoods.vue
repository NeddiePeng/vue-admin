<template>
    <div class="container-node-list">
        <el-dialog
                title="添加活动商品"
                :visible.sync="dialogVisible"
                width="35%"
                :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="商品ID">
                    <el-input v-model="form.name"></el-input>
                    <p class="input-tip">可在 <el-link type="primary" :underline="false">商品管理 - 商品列表</el-link> 中查看</p>
                </el-form-item>
                <el-form-item label="选择活动">
                    <el-select v-model="form.name" placeholder="请选择"></el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">营销管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动商品列表</el-breadcrumb-item>
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
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="id" label="活动商品ID" width="100"></el-table-column>
                <el-table-column prop="address" label="商品信息" width="350">
                    <template slot-scope="scope">
                        <div class="goods-info activity-goods-data">
                            <el-row>
                                <el-col :span="6">
                                    <el-image style="width: 72px; height: 72px" src="http://static.yoshop.xany6.com/2018071718294208f086786.jpg" fit="cover"></el-image>
                                </el-col>
                                <el-col :span="18">
                                    <div class="goods-name-sku">
                                        <p class="goods-name">荣耀 V10全网通 标配版 4GB+64GB 魅丽红 移动联通电信4G全面屏手机荣耀 V10全网通 标配版 4GB+64GB 魅丽红 移动联通电信4G全面屏手机 </p>
                                        <p class="goods-sku">颜色:炫影蓝; 版本:4+64G;</p>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="num" label="累计销量" width="90"></el-table-column>
                <el-table-column prop="num" label="库存总量" width="90"></el-table-column>
                <el-table-column prop="num" label="排序" width="90"></el-table-column>
                <el-table-column prop="num" label="状态" width="100">
                    <template slot-scope="scope">
                        <div class="goods-name">{{ scope.row.name }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="创建时间" width="150"></el-table-column>
                <el-table-column prop="address" label="操作" width="120" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini" plain type="danger" icon="el-icon-delete">删除</el-button>
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
    export default {
        name: "ActivityGoods",
        data() {
            return {
                form: {
                    name: ''
                },
                textarea: '',
                dialogVisible: false,
                total: 0,
                currentPage: 1,
                limit: 15,
                input: '',
                tableData: [{
                    id: 1,
                    date: '2016-05-02 10:00:00',
                    name: '已售罄',
                    address: '上海市普陀区金沙',
                    url: 'http://static.yoshop.xany6.com/2018071718294208f086786.jpg',
                    num: 10,
                    status: 1
                }]
            }
        },
        methods: {
            handleCurrentChange() {

            },
            handleSizeChange() {

            },
            handleClose() {

            },
            replayComment() {
                if(this.dialogVisible) {
                    this.dialogVisible = false;
                } else {
                    this.dialogVisible = true;
                }
            },
            add() {
                this.dialogVisible = true;
            }
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