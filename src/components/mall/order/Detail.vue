<template>
    <div class="container-node detail-node">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="order-content" v-if="orderData.order">
            <el-progress :text-inside="true" :show-text="false" :stroke-width="28" :percentage="peogress"></el-progress>
            <div class="order-time-line">
                <el-row>
                    <el-col :span="4">
                        <p>下单时间</p>
                        <p>{{orderData.order.create_time}}</p>
                    </el-col>
                    <el-col :span="5">
                        <p>付款</p>
                        <p v-if="orderData.order.status != 0 && orderData.order.status != 3">付款于 {{orderData.order.pay_time}}</p>
                        <p v-else>{{text}}</p>
                    </el-col>
                    <el-col :span="6">
                        <p>发货</p>
                        <p v-if="orderData.order.status != 0 && orderData.order.status != 3 && orderData.order.status != 2">发货于 {{orderData.order.send_time}}</p>
                        <p v-else>{{text}}</p>
                    </el-col>
                    <el-col :span="5">
                        <p>收货</p>
                        <p v-if="orderData.order.status != 0 && orderData.order.status != 3 && orderData.order.status == 4">收货于 {{orderData.order.receive_time}}</p>
                        <p v-else>{{text}}</p>
                    </el-col>
                    <el-col :span="4">
                        <p>完成</p>
                        <p v-if="orderData.order.status != 0 && orderData.order.status != 3 && orderData.order.status == 6">完成于 {{orderData.order.receive_time}}</p>
                        <p v-else>{{text}}</p>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="item">
            <p class="order-title">
                <span class="title-line"></span>
                <span>基本信息</span>
            </p>
            <el-divider></el-divider>
            <el-table border v-if="orderData.order" :data="[orderData.order]" style="width: 100%">
                <el-table-column prop="order_no" label="订单号" width="220"></el-table-column>
                <el-table-column label="买家" width="180">
                    <template slot-scope="scope">
                        <p>{{scope.row.nickname}}</p>
                        <p>(用户id：{{scope.row.user_id}})</p>
                    </template>
                </el-table-column>
                <el-table-column label="订单金额">
                    <template slot-scope="scope">
                        <p>运费金额: ￥{{scope.row.postage}}</p>
                        <p>实付款金额: <span style="color: #F56C6C">￥{{scope.row.total_price}}</span></p>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="支付方式">
                    <template slot-scope="scope">
                        <el-tag size="mini" type="success" effect="dark" v-if="scope.row.method == 'WECHAT_H5'">微信H5支付</el-tag>
                        <el-tag size="mini" type="success" effect="dark" v-if="scope.row.method == 'WECHAT_APP'">微信APP支付</el-tag>
                        <el-tag size="mini" effect="dark" v-if="scope.row.method == 'ALIPAY_APP' || scope.row.method == 'ALIPAY_H5'">支付宝支付</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="配送方式">
                    <template slot-scope="scope">
                        <el-tag effect="dark" type="success" size="mini">快递配送</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="交易状态">
                    <template slot-scope="scope">
                        <p>
                            付款状态：
                            <el-tag size="mini" effect="dark" v-if="scope.row.status == 0 || scope.row.status == 3">待付款</el-tag>
                            <el-tag size="mini" type="success" effect="dark" v-else>已付款</el-tag>
                        </p>
                        <p v-if="scope.row.status != 0 && scope.row.status != 3">发货状态：
                            <el-tag size="mini" type="warning" effect="dark" v-if="scope.row.status == 1">待发货</el-tag>
                            <el-tag size="mini" type="success" effect="dark" v-else>已发货</el-tag>
                        </p>
                        <p v-if="scope.row.status != 0 && scope.row.status != 3 && (scope.row.status == 2 || scope.row.status == 4)">收货状态：
                            <el-tag size="mini" type="success" effect="dark" v-if="scope.row.status == 2">待发货</el-tag>
                            <el-tag size="mini" type="success" effect="dark" v-else>已收货</el-tag>
                        </p>
                        <p>订单状态：
                            <el-tag size="mini" effect="dark" v-if="scope.row.status == 0">待付款</el-tag>
                            <el-tag size="mini" type="warning" effect="dark" v-if="scope.row.status == 1">待发货</el-tag>
                            <el-tag size="mini" type="info" effect="dark" v-if="scope.row.status == 2">待收货</el-tag>
                            <el-tag size="mini" type="info" effect="dark" v-if="scope.row.status == 3">已取消</el-tag>
                            <el-tag size="mini" effect="dark" v-if="scope.row.status == 4">待评价</el-tag>
                            <el-tag size="mini" type="danger" effect="dark" v-if="scope.row.status == 5">已退款</el-tag>
                            <el-tag size="mini" type="success" effect="dark" v-if="scope.row.status == 6">已完成</el-tag>
                            <el-tag size="mini" type="danger" effect="dark" v-if="scope.row.status == -1">退款处理</el-tag>
                        </p>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="item">
            <p class="order-title">
                <span class="title-line"></span>
                <span>商品信息</span>
            </p>
            <el-divider></el-divider>
            <el-table border v-if="orderData.goods" :data="orderData.goods" style="width: 100%">
                <el-table-column prop="order_no" label="商品名称" width="350">
                    <template slot-scope="scope">
                        <el-row>
                            <el-col :span="6">
                                <el-image style="width: 72px; height: 72px" :src="scope.row.goods.cover" fit="cover"></el-image>
                            </el-col>
                            <el-col :span="18">
                                <div class="goods-name-sku">
                                    <p class="goods-name">{{scope.row.goods.name}}</p>
                                    <p class="goods-sku" v-if="scope.row.sku" style="padding-top: 12px">
                                        <span v-for="(item, index) in scope.row.sku.value" :key="index">{{item.attr_value + '；'}}</span>
                                    </p>
                                </div>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="商品编码" width="180">
                    <template slot-scope="scope">
                        <p>----</p>
                    </template>
                </el-table-column>
                <el-table-column label="单价">
                    <template slot-scope="scope">
                        <p>￥{{scope.row.buy_price}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="num" label="购买数量">
                    <template slot-scope="scope">
                        ×{{scope.row.goods_num}}
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="商品总价">
                    <template slot-scope="scope">
                        <p>￥{{scope.row.goods_num * scope.row.buy_price }}</p>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="item">
            <p class="order-title">
                <span class="title-line"></span>
                <span>收货信息</span>
            </p>
            <el-divider></el-divider>
            <el-table border v-if="orderData.address" :data="[orderData.address]" style="width: 100%">
                <el-table-column prop="full_name" label="收货人" width="180"></el-table-column>
                <el-table-column prop="mobile" label="收货电话" width="200"></el-table-column>
                <el-table-column label="收货地址">
                    <template slot-scope="scope">
                        <span>{{scope.row.province}} {{scope.row.city}} {{scope.row.area}} {{scope.row.street}} | 邮编：{{scope.row.zip_code}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="item">
            <p class="order-title">
                <span class="title-line"></span>
                <span>付款信息</span>
            </p>
            <el-divider></el-divider>
            <el-table border v-if="orderData.order" :data="[orderData.order]" style="width: 100%">
                <el-table-column prop="total_price" label="应付款金额" width="220"></el-table-column>
                <el-table-column prop="name" label="支付方式" width="180">
                    <template slot-scope="scope">
                        <el-tag size="mini" type="success" effect="dark" v-if="scope.row.method == 'WECHAT_H5'">微信H5支付</el-tag>
                        <el-tag size="mini" type="success" effect="dark" v-if="scope.row.method == 'WECHAT_APP'">微信APP支付</el-tag>
                        <el-tag size="mini" effect="dark" v-if="scope.row.method == 'ALIPAY_APP' || scope.row.method == 'ALIPAY_H5'">支付宝支付</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="支付流水号">
                    <template slot-scope="scope">
                        ---
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="付款状态">
                    <template slot-scope="scope">
                        <el-tag size="mini" effect="dark" v-if="scope.row.status == 0">待付款</el-tag>
                        <el-tag size="mini" type="success" effect="dark" v-if="scope.row.status != 0">已付款</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="付款时间" label="配送方式">
                    <template slot-scope="scope">
                        <el-tag effect="dark" type="success" size="mini">快递配送</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="item">
            <p class="order-title">
                <span class="title-line"></span>
                <span>发货信息</span>
            </p>
            <el-divider></el-divider>
            <el-table
                    border
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="order_no"
                        label="物流公司"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="物流单号"
                        width="250">
                </el-table-column>
                <el-table-column prop="address" label="发货状态">
                    <template slot-scope="scope">
                        <el-tag effect="dark" size="mini">微信支付</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="发货时间">
                    <template slot-scope="scope">
                        <el-tag effect="dark" type="success" size="mini">快递配送</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="item">
            <p class="order-title">
                <span class="title-line"></span>
                <span>退款信息</span>
            </p>
            <el-divider></el-divider>
            <el-table v-if="orderData.refund" :data="orderData.refund" style="width: 100%">
                <el-table-column prop="order_no" label="商品名称" width="350">
                    <template slot-scope="scope">
                        <el-row>
                            <el-col :span="6">
                                <el-image style="width: 72px; height: 72px" :src="scope.row.goods.goods.cover" fit="cover"></el-image>
                            </el-col>
                            <el-col :span="18">
                                <div class="goods-name-sku">
                                    <p class="goods-name">{{scope.row.goods.goods.name}}</p>
                                    <p class="goods-sku" v-if="scope.row.goods.sku" style="padding-top: 20px">
                                        <span v-for="(list, index) in scope.row.goods.sku.value" :key="index">{{list.attr_value}}</span>
                                    </p>
                                </div>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column prop="refund_price" label="退款金额" width="180"></el-table-column>
                <el-table-column prop="status" label="退款状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 1">已退款</span>
                        <span v-if="scope.row.status == 0">退款处理中</span>
                        <span v-if="scope.row.status == 2">拒绝退款</span>
                    </template>
                </el-table-column>
                <el-table-column prop="create_time" label="退款时间"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {orderDetail} from "../../../request/mall/order";

    export default {
        name: "Detail",
        data() {
            return {
                tableData: [{
                        order_no: '2018080298545157',
                        name: '下一个自己',
                        num:10
                    }],
                orderData: [],
                peogress: 0,
                text: ''
            }
        },
        mounted() {
            orderDetail(this, {
                order_no: '202002161633011688857624'
            });
        }
    }
</script>

<style scoped>
    .item{
        margin-bottom: 50px;
    }
    .order-title{
        height: 15px;
        line-height: 15px;
    }
    .title-line{
        display: inline-block;
        height: 15px;
        width: 3px;
        background-color: #409EFF;
    }
    .order-title > span{
        font-size: 14px;
        vertical-align: middle;
    }
    .order-content{
        margin-top: 20px;
        padding-bottom: 90px;
        position: relative;
    }
    .detail-node{
        padding: 20px 25px;
    }
    .order-time-line{
        width: 100%;
        position: absolute;
        top: 5px;
    }
    .order-time-line p {
        font-size: 12px;
        text-align: center;
    }
    .order-time-line p:first-child{
        padding-bottom: 20px;
        color: white;
        font-size: 14px;
    }
    .goods-name {
        max-height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-align: left !important;
        white-space: normal;
        font-size: 12px;
    }
</style>