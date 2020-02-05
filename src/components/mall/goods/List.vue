<template>
    <div class="container-node-list">
        <div class="search">
            <div class="item">
                <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <div class="item">
                <el-select v-model="input" placeholder="请选择"></el-select>
            </div>
            <div class="item">
                <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <div class="item submit-search">
                <el-button type="primary"  icon="el-icon-search">搜索</el-button>
                <el-button type="success" icon="el-icon-circle-plus-outline" @click="add">新增商品</el-button>
            </div>
        </div>
        <div class="goods-content-node">
            <el-table
                    :data="listDataList"
                    style="width: 100%"
                    :stripe="true"
                    :border="true"
                    :highlight-current-row="true">
                <el-table-column fixed prop="id" label="ID" width="50"></el-table-column>
                <el-table-column label="分类">
                    <template slot-scope="scope">
                        <span>{{ scope.row.category.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="商品名称"></el-table-column>
                <el-table-column prop="price" label="原价格"></el-table-column>
                <el-table-column prop="vip_price" label="会员价"></el-table-column>
                <el-table-column prop="zip" label="品牌">
                    <template slot-scope="scope">
                        <span>{{ scope.row.brand.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="buy_num" label="已售数量" width="100"></el-table-column>
                <el-table-column prop="create_time" label="创建时间"></el-table-column>
                <el-table-column prop="status" label="状态"></el-table-column>
                <el-table-column label="操作" width="300">
                    <el-button size="mini" type="success" icon="el-icon-edit">编辑</el-button>
                    <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
                    <el-button size="mini" icon="el-icon-s-promotion">上架</el-button>
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
    import {listData} from "../../../request/mall/goods";

    export default {
        name: "List",
        data() {
            return {
                listDataList: [],
                currentPage: 1,
                input: '',
                tableHeight: window.innerHeight - 240,
                limit: 15,
                total: 0
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            add() {
                this.$router.push({path:'/basic'})
            }
        },
        mounted() {
            listData(this, {
                page: this.currentPage,
                limit: this.limit
            })
        }
    }
</script>

<style scoped>
    .pagination{
        padding-top: 20px;
        text-align: right;
    }
    .item{
        float: left;
        padding-right: 5px;
    }
    .container-node-list{
        padding: 20px 10px;
    }
    .submit-search{
        padding-left: 20px;
    }
    .goods-content-node{
        padding-top: 70px;
    }
</style>