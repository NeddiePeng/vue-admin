<template>
    <div class="container-node">
        <el-dialog title="发货" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <div class="search">
            <div class="item">
                <el-input size="small" v-model="input" placeholder="请输入订单号"></el-input>
            </div>
            <div class="item">
                <el-select size="small" v-model="input" placeholder="请选择订单状态"></el-select>
            </div>
            <div class="item">
                <el-date-picker size="small" v-model="input" type="date" placeholder="选择日期"></el-date-picker>
            </div>
            <div class="item">
                <el-date-picker size="small" v-model="input" type="date" placeholder="选择日期"></el-date-picker>
            </div>
            <div class="item submit">
                <el-button size="small" type="primary" icon="el-icon-download">订单导出</el-button>
                <el-button size="small" type="success"  icon="el-icon-upload2">批量发货</el-button>
            </div>
            <div style="clear: both"></div>
        </div>
        <div class="content-order" style="padding-top: 20px">
            <div class="order-nav">
                <el-row>
                    <el-col :span="7"><span>商品信息</span></el-col>
                    <el-col :span="2"><span>单价/数量</span></el-col>
                    <el-col :span="3"><span>实付款</span></el-col>
                    <el-col :span="2"><span>买家</span></el-col>
                    <el-col :span="2"><span>支付方式</span></el-col>
                    <el-col :span="2"><span>配送方式</span></el-col>
                    <el-col :span="3"><span>交易状态</span></el-col>
                    <el-col :span="3"><span>操作</span></el-col>
                </el-row>
            </div>
            <div class="content-order-list">
                <div class="order-item" v-if="orderData && orderData.length > 0" v-for="(item, index) in orderData" :key="index">
                    <p class="order-num">
                        <span class="am-margin-right-lg"> {{item.create_time}}</span>
                        <span class="am-margin-right-lg">订单号：{{item.order_no}}</span>
                    </p>
                    <el-row>
                        <el-col :span="7">
                            <div class="goods-info" v-for="(goods, i) in item.goods" :key="i">
                                <el-row>
                                    <el-col :span="6">
                                        <el-image style="width: 72px; height: 72px" :src="goods.goods.cover" fit="cover"></el-image>
                                    </el-col>
                                    <el-col :span="18">
                                        <div class="goods-name-sku">
                                            <p class="goods-name">{{goods.goods.name}}</p>
                                            <p class="goods-sku">
                                                <span v-for="(sku, m) in goods.sku.value" :key="m">{{sku.attr_value + '；'}}</span>
                                            </p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="order-goods-num" v-for="(goods, i) in item.goods" :key="i">
                                <p>￥{{goods.buy_price}}</p>
                                <p>×{{goods.goods_num}}</p>
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div class="order-goods-num" :style="'height: '+ height * item.count +'px'">
                                <p :style="'padding-top:'+ padding_two * item.count +'px'">￥{{item.total_price}}</p>
                                <p>(含运费：￥{{item.postage}})</p>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="order-goods-num" :style="'height: '+ height * item.count +'px'">
                                <p :style="'padding-top:'+ padding_two * item.count +'px'">{{item.user.nickname}}</p>
                                <p>(用户id：{{item.user_id}})</p>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="order-goods-num" :style="'height: '+ height * item.count +'px;text-align: center;line-height:'+ height * item.count +'px'">
                                <el-tag size="mini" type="success" effect="dark" v-if="item.method == 'WECHAT_H5'">微信H5支付</el-tag>
                                <el-tag size="mini" type="success" effect="dark" v-if="item.method == 'WECHAT_APP'">微信APP支付</el-tag>
                                <el-tag size="mini" effect="dark" v-if="item.method == 'ALIPAY_APP' || item.method == 'ALIPAY_H5'">支付宝支付</el-tag>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="order-goods-num" :style="'height: '+ height * item.count +'px;text-align: center;line-height:'+ height * item.count +'px'">
                                <el-tag size="mini" type="success" effect="dark">快递配送</el-tag>
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div class="order-goods-num order-status" :style="'height:'+ height * item.count + 'px'">
                                <div class="order-status-list">
                                    <p>
                                        付款状态：
                                        <el-tag size="mini" effect="dark" v-if="item.status == 0 || item.status == 3">待付款</el-tag>
                                        <el-tag size="mini" type="success" effect="dark" v-else>已付款</el-tag>
                                    </p>
                                    <p v-if="item.status != 0 && item.status != 3">发货状态：
                                        <el-tag size="mini" type="warning" effect="dark" v-if="item.status == 1">待发货</el-tag>
                                        <el-tag size="mini" type="success" effect="dark" v-else>已发货</el-tag>
                                    </p>
                                    <p v-if="item.status != 0 && item.status != 3 && (item.status == 2 || item.status == 4)">收货状态：
                                        <el-tag size="mini" type="success" effect="dark" v-if="item.status == 2">待发货</el-tag>
                                        <el-tag size="mini" type="success" effect="dark" v-else>已收货</el-tag>
                                    </p>
                                    <p>订单状态：
                                        <el-tag size="mini" effect="dark" v-if="item.status == 0">待付款</el-tag>
                                        <el-tag size="mini" type="warning" effect="dark" v-if="item.status == 1">待发货</el-tag>
                                        <el-tag size="mini" type="info" effect="dark" v-if="item.status == 2">待收货</el-tag>
                                        <el-tag size="mini" type="info" effect="dark" v-if="item.status == 3">已取消</el-tag>
                                        <el-tag size="mini" effect="dark" v-if="item.status == 4">待评价</el-tag>
                                        <el-tag size="mini" type="danger" effect="dark" v-if="item.status == 5">已退款</el-tag>
                                        <el-tag size="mini" type="success" effect="dark" v-if="item.status == 6">已完成</el-tag>
                                        <el-tag size="mini" type="danger" effect="dark" v-if="item.status == -1">退款处理</el-tag>
                                    </p>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div class="order-handle" :style="'height: '+ height * item.count +'px;text-align: center;line-height:'+ height * item.count +'px'">
                                <el-button size="small">订单详情</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="pagination">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-sizes="[15, 20, 30, 40]"
                        :page-size="limit"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>

    import {orderListData} from "../../../request/mall/order";

    export default {
        name: "Order",
        data() {
            return {
                limit:15,
                orderData: [],
                count: 0,
                currentPage4:1,
                input: '',
                dialogVisible: false,
                height: 90,
                num: 2,
                padding: 20,
                padding_two: 30
            }
        },
        methods: {
            handleSizeChange(val) {
                this.limit = val;
                orderListData(this, {
                    page: this.currentPage4,
                    limit: this.limit
                });
            },
            handleClose() {

            },
            handleCurrentChange(val) {
                this.currentPage4 = val;
                orderListData(this, {
                    page: this.currentPage4,
                    limit: this.limit
                });
            }
        },
        mounted() {
            orderListData(this, {
                page: this.currentPage4,
                limit: this.limit
            });
        }
    }
</script>

<style scoped>
    .pagination{
        padding-top: 20px;
        text-align: right;
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
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .order-nav{
        height: 40px;
        border: 1px solid #ddd;
        line-height: 40px;
        font-size: 14px;
        margin-bottom: 15px;
    }
    .order-nav .el-col {
        text-align: center;
    }
    .order-item{
        border: 1px solid #ddd;
        margin-top: 15px;
    }
    .order-num{
        height: 35px;
        line-height: 35px;
        padding: 0 10px;
        font-size: 12px;
    }
    .am-margin-right-lg{
        padding-right: 25px;
    }
    .goods-info{
        border-right: 1px solid #ddd;
        height: 90px;
        font-size: 12px;
        border-top: 1px solid #ddd;
    }
    .goods-name-sku{
        padding: 0 10px 10px 0;
        margin-top: 10px;
    }
    .goods-info .el-image{
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
    .order-goods-num{
        border-right: 1px solid #ddd;
        height: 90px;
        font-size: 12px;
        border-top: 1px solid #ddd;
    }
    .order-handle{
        border-top: 1px solid #ddd;
    }
    .order-goods-num > p{
        text-align: center;
    }
    .order-goods-num > p:first-child{
        padding-top: 30px;
    }
    .order-goods-num > p:last-child{
        padding-top: 5px;
    }
    .order-status {
        position: relative;
    }
    .order-status > div{
        width: 100%;
        position: absolute;
        top:50%;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        transform: translateY(-50%);
    }
    .order-status > div > p{
        padding-top: 5px;
        text-align: center;
    }
    
</style>