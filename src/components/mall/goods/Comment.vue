<template>
    <div class="container-node-list">
        <el-dialog title="请填写回复内容" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
            <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="from_data.context"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitReplay">确 定</el-button>
            </span>
        </el-dialog>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>评价列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="content-node" style="padding-top: 20px">
            <el-table :data="list" stripe style="width: 100%">
                <el-table-column prop="id" label="ID" width="50"></el-table-column>
                <el-table-column prop="name" label="商品图片" width="80">
                    <template slot-scope="scope">
                        <el-image style="width: 50px; height: 50px" :src="scope.row.goods.cover" fit="cover"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="商品名称" width="300">
                    <template slot-scope="scope">
                        <div class="goods-name">{{ scope.row.goods.name }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="user_name" label="用户" width="100"></el-table-column>
                <el-table-column prop="star_num" label="评分" width="80"></el-table-column>
                <el-table-column prop="name" label="是否已回复" width="100">
                    <template slot-scope="scope">
                        <div class="goods-name" v-if="scope.row.is_be_replay == 1">已回复</div>
                        <div class="goods-name" v-else>未回复</div>
                    </template>
                </el-table-column>
                <el-table-column prop="context" label="评价内容" width="300"></el-table-column>
                <el-table-column label="是否有图片" width="100">
                    <template slot-scope="scope">
                        <div class="goods-name" v-if="scope.row.is_image == 1">是</div>
                        <div class="goods-name" v-else>否</div>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="显示状态" width="100">
                    <template slot-scope="scope">
                        <div class="goods-name" v-if="scope.row.status == 1">显示</div>
                        <div class="goods-name" v-else>不显示</div>
                    </template>
                </el-table-column>
                <el-table-column prop="create_time" label="评价时间" width="180"></el-table-column>
                <el-table-column prop="address" label="操作" width="200" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini" plain type="success" icon="el-icon-edit" v-if="scope.row.is_be_replay == 0" @click="replayComment(scope.row.id, scope.$index)">回复</el-button>
                        <el-button size="mini" plain type="danger" icon="el-icon-delete" v-show="scope.row.status == 1" @click="delComment(scope.row.id, scope.$index, 0)">不显示</el-button>
                        <el-button size="mini" plain icon="el-icon-check" v-show="scope.row.status == 0" @click="delComment(scope.row.id, scope.$index, 1)">显示</el-button>
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
    import {commentData, addReplayComment, delCommentData} from "../../../request/mall/comment";

    export default {
        name: "Comment",
        data() {
            return {
                textarea: '',
                dialogVisible: false,
                total: 0,
                currentPage: 1,
                limit: 15,
                input: '',
                list: [],
                from_data: {
                    comment_id: 0,
                    context: ''
                },
                index: 0
            }
        },
        methods: {
            handleCurrentChange() {

            },
            handleSizeChange() {

            },
            delComment(id, index, status) {
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delCommentData(this, {
                        comment_id: id,
                        status: status
                    }, index);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleClose() {
                this.dialogVisible = false;
            },
            submitReplay() {
                addReplayComment(this, this.from_data, this.index);
            },
            replayComment(id, index) {
                this.index = index;
                this.from_data.comment_id = id;
                if(this.dialogVisible) {
                    this.dialogVisible = false;
                } else {
                    this.dialogVisible = true;
                }
            }
        },
        mounted() {
            commentData(this, {
                page: this.currentPage,
                limit: this.limit
            });
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
</style>