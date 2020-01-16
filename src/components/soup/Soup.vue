<template>
    <div class="container-node">
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
            <div class="item submit">
                <el-button type="primary"  icon="el-icon-search">主要按钮</el-button>
                <el-button type="success"  icon="el-icon-search">主要按钮</el-button>
            </div>
        </div>
        <div class="content">
            <el-table
                    :data="soupDataList"
                    style="width: 100%"
                    :stripe="true"
                    :border="true"
                    :highlight-current-row="true">
                <el-table-column fixed prop="id" label="ID" width="60"></el-table-column>
                <el-table-column prop="user_info.nickname" label="发布用户" width="150"></el-table-column>
                <el-table-column prop="content" label="鸡汤内容"></el-table-column>
                <el-table-column prop="comment_num" label="评论数量" width="100"></el-table-column>
                <el-table-column prop="like_num" label="点赞数量" width="100"></el-table-column>
                <el-table-column prop="status" label="状态" width="100">
                    <template slot-scope="scope">
                        <el-link type="success" v-if="scope.row.status == 0">正常</el-link>
                        <el-link type="warning" v-if="scope.row.status == 1">不显示</el-link>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="success" icon="el-icon-edit">编辑</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-error" v-if="scope.row.status == 0" @click="handleUpdateStatus(scope.row.id, 1, scope.$index)">隐藏</el-button>
                        <el-button size="mini" type="primary" icon="el-icon-success" v-if="scope.row.status == 1" @click="handleUpdateStatus(scope.row.id, 0, scope.$index)">显示</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[15, 20, 30, 50]"
                        :page-size="15"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {soupData, updateSoupStatus} from "../../request/blog/article";

    export default {
        name: "Soup",
        data() {
            return {
                currentPage:1,
                input: '',
                tableHeight: window.innerHeight - 240,
                soupDataList: [],
                count: 0
            }
        },
        mounted() {
            soupData(this, {
                page: 1
            });
        },
        methods: {
            handleSizeChange(val) {
                this.currentPage = 1;
                soupData(this, {
                    page: this.currentPage,
                    limit: val
                });
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                soupData(this, {
                    page: val
                });
            },
            handleUpdateStatus(id, status, index) {
                updateSoupStatus(this, {
                    id: id,
                    status: status
                }, index);
            },
            open() {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
    }
</script>


<style scoped>
    .pagination{
        padding-top: 20px;
        text-align: right;
    }
    .content{
        padding-top: 70px;
    }
    .submit{
        padding-left: 20px;
    }
    .item{
        float: left;
        padding-right: 5px;
    }
    .container-node{
        padding: 20px 10px;
    }
</style>