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
                <el-button type="success"  icon="el-icon-circle-plus-outline">创建活动</el-button>
            </div>
        </div>
        <div class="content">
            <el-table
                    :data="activity_data"
                    style="width: 100%"
                    :stripe="true"
                    :border="true"
                    :highlight-current-row="true">
                <el-table-column fixed prop="id" label="ID" width="80"></el-table-column>
                <el-table-column prop="title" label="活动名称"></el-table-column>
                <el-table-column label="类型">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type == 'article'"><el-tag type="warning">帖子</el-tag></span>
                        <span v-else-if="scope.row.type == 'link'"><el-tag>外部链接</el-tag></span>
                        <span v-else><el-tag type="info">文字内容</el-tag></span>
                    </template>
                </el-table-column>
                <el-table-column label="封面">
                    <template slot-scope="scope">
                        <el-image style="width: 100px; height: 50px" :src="scope.row.cover" fit="cover"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="place.mask_title" label="显示位置"></el-table-column>
                <el-table-column label="状态" width="100">
                    <template slot-scope="scope">
                        <el-link type="success" v-if="scope.row.status == 1">正常</el-link>
                        <el-link type="warning" v-if="scope.row.status == 2">隐藏</el-link>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" type="success" icon="el-icon-edit">编辑</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" @click="open" v-if="scope.row.status == 1">隐藏</el-button>
                        <el-button size="mini" type="primary" icon="el-icon-success" @click="open" v-if="scope.row.status == 2">显示</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[15, 20, 30, 50]"
                        :page-size="limit"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="activity_count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {list} from '../../request/blog/activity';

    export default {
        name: "Blog",
        data() {
            return {
                currentPage: 1,
                input: '',
                tableHeight: window.innerHeight - 240,
                activity_data: [],
                activity_count: 0,
                limit: 15
            }
        },
        mounted() {
            list(this, {
                page: 1
            });
        },
        methods: {
            handleSizeChange(val) {
                this.limit = val;
                this.currentPage = 1;
                list(this, {
                    page: 1,
                    limit: val
                });
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                list(this, {
                    page: val,
                    limit: this.limit
                });
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