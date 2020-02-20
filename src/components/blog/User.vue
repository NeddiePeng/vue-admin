<template>
    <div class="container-node-list">
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
                <el-table-column prop="id" label="用户ID" width="100"></el-table-column>
                <el-table-column label="用户头像" width="90">
                    <template slot-scope="scope">
                        <el-image style="width: 62px;height: 62px" fit="cover" :src="scope.row.avatar"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="nickname" label="用户昵称" width="130"></el-table-column>
                <el-table-column label="达人类型">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.type">{{scope.row.type}}</el-tag>
                        <span v-else>未认证</span>
                    </template>
                </el-table-column>
                <el-table-column prop="consume_price" label="实际消费金额" width="130"></el-table-column>
                <el-table-column prop="article_num" label="帖子数量"></el-table-column>
                <el-table-column prop="fans_num" label="粉丝数量"></el-table-column>
                <el-table-column prop="create_time" label="注册时间" width="150"></el-table-column>
                <el-table-column label="操作" width="250" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini" plain type="danger" icon="el-icon-delete">删除</el-button>
                        <el-button size="mini" plain  icon="el-icon-user-solid">会员类型</el-button>
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
    import {userData} from "../../request/blog/user";

    export default {
        name: "User",
        data() {
          return {
              currentPage: 1,
              limit: 15,
              total:1,
              input: '',
              list: []
          }
        },
        methods: {
            add() {

            },
            handleSizeChange(val) {
                this.limit = val;
                userData(this, {
                    page: this.currentPage,
                    limit: this.limit
                });
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                userData(this, {
                    page: this.currentPage,
                    limit: this.limit
                });
            }
        },
        mounted() {
            userData(this, {
                page: this.currentPage,
                limit: this.limit
            });
        }
    }
</script>

<style scoped>
    .container-node-list {
        padding: 20px 10px;
    }
    .pagination {
        padding-top: 20px;
        text-align: right;
    }
</style>