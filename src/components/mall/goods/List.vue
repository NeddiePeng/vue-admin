<template>
    <div class="container-node-list">
        <el-dialog title="加入限时购" :visible.sync="dialogTableVisible">
            <el-radio-group v-model="checkList.limit_id" v-if="activityDataList">
                <el-radio v-if="activityDataList" v-for="(item, index) in activityDataList.limit_time" v-model="item.id" :key="index" :label="item.id" border>{{item.cycle_start + '-' + item.cycle_end}}</el-radio>
            </el-radio-group>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="addActivityData">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="加入活动" :visible.sync="dialogActivityVisible">
            <el-radio-group v-model="checkList.activity_id" v-if="activityDataList">
                <el-radio v-if="activityDataList" v-for="(item, index) in activityDataList.mall_activity" v-model="item.id" :key="index" :label="item.id" border>{{item.title}}</el-radio>
            </el-radio-group>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogActivityVisible = false">取 消</el-button>
                <el-button type="primary" @click="addActivityListData">确 定</el-button>
            </div>
        </el-dialog>
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
            <div style="clear: both"></div>
        </div>
        <div class="all-add">
            <el-button @click="addLimit" size="mini" type="success" icon="el-icon-plus">加入限时购</el-button>
            <el-button @click="addActivity" size="mini" type="success" icon="el-icon-plus">加入活动</el-button>
            <el-button @click="addGiftGoods" size="mini" type="success" icon="el-icon-plus">加入小礼物</el-button>
        </div>
        <div class="goods-content-node">
            <el-table
                    tooltip-effect="dark"
                    @selection-change="handleSelectionChange"
                    :data="listDataList"
                    style="width: 100%"
                    :stripe="true"
                    :border="true"
                    :highlight-current-row="true">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column fixed prop="id" label="ID"></el-table-column>
                <el-table-column label="分类">
                    <template slot-scope="scope">
                        <span>{{ scope.row.category.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="品牌">
                    <template slot-scope="scope">
                        <span>{{ scope.row.brand.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="商品名称"></el-table-column>
                <el-table-column prop="cover" label="商品封面" width="100">
                    <template slot-scope="scope">
                        <el-image style="width: 80px; height: 50px" :src="scope.row.cover" fit="cover"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="原价格"></el-table-column>
                <el-table-column prop="vip_price" label="会员价"></el-table-column>
                <el-table-column prop="buy_num" label="已售数量" width="100"></el-table-column>
                <el-table-column prop="create_time" width="160" label="创建时间"></el-table-column>
                <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 0">待审核</span>
                        <span v-else-if="scope.row.status == 1">已上架</span>
                        <span v-else-if="scope.row.status == 2">已下架</span>
                        <span v-else-if="scope.row.status == 3">已售罄</span>
                        <span v-else>已拒绝</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="300" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini" type="success" icon="el-icon-edit">编辑</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
                        <el-button size="mini" @click="updateStatus(scope.row.id, 1, scope.$index)" v-if="scope.row.status == 0 || scope.row.status == 2" icon="el-icon-s-promotion">上架</el-button>
                        <el-button size="mini" @click="updateStatus(scope.row.id, 2, scope.$index)" v-if="scope.row.status == 1" icon="el-icon-s-promotion">下架</el-button>
                        <el-button size="mini" v-if="scope.row.status == 3" icon="el-icon-s-promotion">修改商品库存</el-button>
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
    import {listData, updateGoodsStatus} from "../../../request/mall/goods";
    import {activityData} from "../../../request/mall/add";
    import {addLimitGoods, addActivityGoods, addGiftGoods} from "../../../request/blog/activity";

    export default {
        name: "List",
        data() {
            return {
                listDataList: [],
                currentPage: 1,
                input: '',
                tableHeight: window.innerHeight - 240,
                limit: 15,
                total: 0,
                dialogTableVisible: false,
                dialogActivityVisible: false,
                activityDataList: [],
                multipleSelection: [],
                checkList: {
                    limit_id: 0,
                    activity_id: 0
                }
            }
        },
        methods: {
            addGiftGoods() {
                addGiftGoods(this, {
                    goods_ids: this.multipleSelection
                });
            },
            handleSelectionChange(val) {
                for (let i = 0; i < val.length; i++) {
                    this.multipleSelection.push(val[i].id);
                }
            },
            addActivityListData() {
                addActivityGoods(this, {
                    activity_id: this.checkList.activity_id,
                    goods_ids: this.multipleSelection
                });
            },
            addActivityData() {
                addLimitGoods(this, {
                    limit_id: this.checkList.limit_id,
                    goods_ids: this.multipleSelection
                });
            },
            addActivity() {
                this.dialogActivityVisible = true;
            },
            addLimit() {
                this.dialogTableVisible = true;
            },
            updateStatus(goods_id, status, index) {
                updateGoodsStatus(this, {
                    goods_id: goods_id,
                    status: status
                }, index);
            },
            handleSizeChange(val) {
                this.limit = val;
                listData(this, {
                    page: this.currentPage,
                    limit: val
                });
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                listData(this, {
                    page: this.currentPage,
                    limit: this.limit
                });
            },
            add() {
                this.$router.push({path:'/basic'})
            }
        },
        mounted() {
            listData(this, {
                page: this.currentPage,
                limit: this.limit
            });
            activityData(this);
        }
    }
</script>

<style scoped>
    .all-add{
        padding-top: 15px;
    }
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
        padding-top: 20px;
    }
</style>