<template>
    <div class="container-node-list">
        <el-dialog
                title="添加/修改优惠券"
                :visible.sync="dialogVisible"
                width="35%"
                :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="优惠券名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="减免金额">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="最低消费金额">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="有效天数">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="发放总数量">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">营销管理</el-breadcrumb-item>
            <el-breadcrumb-item>优惠券</el-breadcrumb-item>
            <el-breadcrumb-item>优惠券列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="tip"><p>注：优惠券只能抵扣商品金额，最多优惠到0.01元，不能抵扣运费</p></div>
        <el-button type="success" size="small" @click="add"><i class="el-icon-plus"></i>新增</el-button>
        <div class="content-node" style="padding-top: 20px">
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="id" label="优惠券ID" width="100"></el-table-column>
                <el-table-column prop="address" label="优惠券名称" width="180">
                    <template slot-scope="scope">
                        <div class="goods-name">{{ scope.row.address }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="num" label="最低消费金额" width="120"></el-table-column>
                <el-table-column prop="name" label="优惠方式" width="120"></el-table-column>
                <el-table-column prop="address" label="有效期" width="120">
                    <template slot-scope="scope">
                        <div class="goods-name">领取 7 天内有效</div>
                    </template>
                </el-table-column>
                <el-table-column prop="num" label="发放总数量" width="100"></el-table-column>
                <el-table-column prop="num" label="已领取数量" width="100"></el-table-column>
                <el-table-column prop="date" label="添加时间" width="180"></el-table-column>
                <el-table-column prop="address" label="操作" width="200" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini" plain type="success" icon="el-icon-edit" @click="replayComment">编辑</el-button>
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
        name: "Coupon",
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
                    name: '立减 30.00 元',
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
    .pagination {
        padding-top: 20px;
        text-align: right;
    }

    .content-node {
        padding-top: 70px;
    }

    .submit-search {
        padding-left: 20px;
    }

    .item {
        float: left;
        padding-right: 5px;
    }

    .container-node-list {
        padding: 20px 10px;
    }
    .tip {
        padding: 8px 16px;
        background-color: #ecf8ff;
        border-radius: 4px;
        border-left: 5px solid #50bfff;
        margin: 20px 0 20px;
    }
    .tip p {
        font-size: 14px;
        color: #5e6d82;
        line-height: 1.5em;
        padding: 10px 0;
    }

</style>