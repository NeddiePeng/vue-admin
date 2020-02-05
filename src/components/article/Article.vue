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
                <el-button type="primary"  icon="el-icon-search">搜索</el-button>
                <el-button type="success"  icon="el-icon-circle-plus-outline">创建帖子</el-button>
            </div>
        </div>
        <div class="article-content">
            <el-table :data="article_data" style="width: 100%" :stripe="true" :border="true" :highlight-current-row="true">
                <el-table-column fixed prop="id" label="ID" width="60"></el-table-column>
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="tags" label="标签"></el-table-column>
                <el-table-column label="封面图">
                    <template slot-scope="scope">
                        <el-image lazy v-if="scope.row.type == 'images'" style="width: 100px; height: 50px" :src="scope.row.images.url" fit="cover"></el-image>
                        <el-image lazy v-if="scope.row.type == 'video'" style="width: 100px; height: 50px" :src="scope.row.video.cover" fit="cover"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="帖子类型"></el-table-column>
                <el-table-column prop="user_info.nickname" label="发布用户"></el-table-column>
                <el-table-column label="状态" width="100">
                    <template slot-scope="scope">
                        <el-link type="success" v-if="scope.row.status == 1 && scope.row.is_delete == 2">正常</el-link>
                        <el-link type="warning" v-if="scope.row.status == 0 && scope.row.is_delete == 2">待审核</el-link>
                        <el-link type="danger" v-if="scope.row.status == 2 && scope.row.is_delete == 2">已拒绝</el-link>
                        <el-link type="danger" v-if="scope.row.is_delete == 1">已删除</el-link>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" type="success" icon="el-icon-edit">编辑</el-button>
                        <el-button size="mini" icon="el-icon-s-promotion" v-if="scope.row.status == 0 && scope.row.is_delete == 2" @click="handleReview(scope.row.id, 1, scope.$index)">通过</el-button>
                        <el-button size="mini" icon="el-icon-s-promotion" v-if="scope.row.status == 0 && scope.row.is_delete == 2" @click="handleReview(scope.row.id, 2, scope.$index)">拒绝通过</el-button>
                        <el-button size="mini" icon="el-icon-s-promotion" v-if="scope.row.status == 1 && scope.row.is_delete == 2" @click="delete_data(scope.row.id, 1, scope.$index)">不显示</el-button>
                        <el-button size="mini" icon="el-icon-s-promotion" v-if="scope.row.is_delete == 1" @click="delete_data(scope.row.id, 2,scope.$index)">显示</el-button>
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
                        :total="article_count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {list, updateStatus, delete_article} from '../../request/blog/article'
    export default {
        name: "Article",
        data() {
            return {
                article_data:[],
                article_count: 0,
                currentPage: 1,
                input: '',
                tableHeight: window.innerHeight - 240
            }
        },
        mounted() {
            list(this, {
                page: 1
            });
        },
        methods: {
            handleReview(id, status, index) {
                updateStatus(this, {
                    article_id: id,
                    status: status
                }, index);
            },
            handleSizeChange(val) {
                list(this, {
                    page: this.currentPage,
                    limit: val
                });
            },
            handleCurrentChange(val) {
                list(this, {
                    page: val
                });
            },
            delete_data(id, status, index) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delete_article(this, {
                        article_id: id,
                        status: status
                    }, index);
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
    .article-content{
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