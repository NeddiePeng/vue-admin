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
            </div>
            <div style="clear: both"></div>
        </div>
        <div class="search" style="margin-top: 10px;">
            <div class="item">
                <el-date-picker
                        v-model="from_data.start"
                        type="datetime"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
            </div>
            <div class="item">
                <el-date-picker
                        v-model="from_data.end"
                        type="datetime"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
            </div>
            <div class="item submit-search">
                <el-button type="success" icon="el-icon-circle-plus-outline" @click="add">创建限时购</el-button>
            </div>
        </div>
        <div class="content-node">
            <el-table
                    :data="activity_data"
                    style="width: 100%"
                    :stripe="true"
                    :highlight-current-row="true">
                <el-table-column fixed prop="id" label="ID" width="80"></el-table-column>
                <el-table-column prop="cycle_start" label="开始时间">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.cycle_start }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="cycle_end" label="结束时间">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.cycle_end }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="100">
                    <template slot-scope="scope">
                        <el-link type="success" v-if="scope.row.status == 1">已开启</el-link>
                        <el-link type="warning" v-if="scope.row.status == 0">已关闭</el-link>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" type="success" icon="el-icon-plus" @click="seeGroupGoods(scope.row.id)">商品列表</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" @click="updateStatus(scope.row.id, 0, scope.$index)" v-if="scope.row.status == 1">关闭</el-button>
                        <el-button size="mini" type="primary" icon="el-icon-success" @click="updateStatus(scope.row.id, 1, scope.$index)" v-if="scope.row.status == 0">开启</el-button>
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
    import {limitGroupData, addGroup, updateGroupStatus} from "../../../request/blog/activity";

    export default {
        name: "List",
        data() {
            return {
                currentPage: 1,
                input: '',
                tableHeight: window.innerHeight - 240,
                activity_data: [],
                activity_count: 0,
                limit: 15,
                from_data: {
                    start: '',
                    end: ''
                }
            }
        },
        mounted() {
            limitGroupData(this, {
                page: 1,
                limit: this.limit
            });
        },
        methods: {
            updateStatus(id, status, index) {
                updateGroupStatus(this, {
                    id: id,
                    status: status
                }, index);
            },
            seeGroupGoods(id) {
                this.$router.push({path: '/add-group-goods',query:{id: id}});
            },
            detail(id) {
                this.$router.push({path: '/add-activity',query:{id: id}});
            },
            add() {
                addGroup(this, this.from_data)
            },
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
            }
        },
    }
</script>


<style scoped>
    .pagination{
        padding-top: 20px;
        text-align: right;
    }
    .content-node{
        padding-top: 70px;
    }
    .submit-search{
        padding-left: 20px;
    }
    .item{
        float: left;
        padding-right: 5px;
    }
    .container-node-list{
        padding: 20px 10px;
    }
</style>