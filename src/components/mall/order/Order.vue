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
                <div class="order-item">
                    <p class="order-num">
                        <span class="am-margin-right-lg"> 2018-08-02 17:43:39</span>
                        <span class="am-margin-right-lg">订单号：2018080298545157</span>
                    </p>
                    <el-row>
                        <el-col :span="7">
                            <div class="goods-info">
                                <el-row>
                                    <el-col :span="6">
                                        <el-image style="width: 72px; height: 72px" src="http://static.yoshop.xany6.com/2018071718294208f086786.jpg" fit="cover"></el-image>
                                    </el-col>
                                    <el-col :span="18">
                                        <div class="goods-name-sku">
                                            <p class="goods-name">荣耀 V10全网通 标配版 4GB+64GB 魅丽红 移动联通电信4G全面屏手机荣耀 V10全网通 标配版 4GB+64GB 魅丽红 移动联通电信4G全面屏手机 </p>
                                            <p class="goods-sku">颜色:炫影蓝; 版本:4+64G;</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="order-goods-num">
                                <p>￥1899.00</p>
                                <p>×1</p>
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div class="order-goods-num">
                                <p>￥1899.00</p>
                                <p>(含运费：￥0.00)</p>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="order-goods-num">
                                <p>下***己</p>
                                <p>(用户id：10226)</p>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="order-goods-num" style="line-height: 90px;text-align: center">
                                <el-tag size="mini" type="success" effect="dark">微信支付</el-tag>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="order-goods-num" style="line-height: 90px;text-align: center">
                                <el-tag size="mini" type="success" effect="dark">快递配送</el-tag>
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div class="order-goods-num order-status">
                                <p>付款状态：<el-tag size="mini" type="success" effect="dark">已付款</el-tag></p>
                                <p>发货状态：<el-tag size="mini" type="success" effect="dark">已付款</el-tag></p>
                                <p>收货状态：<el-tag size="mini" type="success" effect="dark">已付款</el-tag></p>
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div class="order-handle" style="line-height: 90px;text-align: center">
                                <el-button size="small">订单详情</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="order-item">
                    <p class="order-num">
                        <span class="am-margin-right-lg"> 2018-08-02 17:43:39</span>
                        <span class="am-margin-right-lg">订单号：2018080298545157</span>
                    </p>
                    <el-row>
                        <el-col :span="7">
                            <div class="goods-info">
                                <el-row>
                                    <el-col :span="6">
                                        <el-image style="width: 72px; height: 72px" src="http://static.yoshop.xany6.com/2018071718294208f086786.jpg" fit="cover"></el-image>
                                    </el-col>
                                    <el-col :span="18">
                                        <div class="goods-name-sku">
                                            <p class="goods-name">荣耀 V10全网通 标配版 4GB+64GB 魅丽红 移动联通电信4G全面屏手机荣耀 V10全网通 标配版 4GB+64GB 魅丽红 移动联通电信4G全面屏手机 </p>
                                            <p class="goods-sku">颜色:炫影蓝; 版本:4+64G;</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="goods-info">
                                <el-row>
                                    <el-col :span="6">
                                        <el-image style="width: 72px; height: 72px" src="http://static.yoshop.xany6.com/2018071718294208f086786.jpg" fit="cover"></el-image>
                                    </el-col>
                                    <el-col :span="18">
                                        <div class="goods-name-sku">
                                            <p class="goods-name">荣耀 V10全网通 标配版 4GB+64GB 魅丽红 移动联通电信4G全面屏手机荣耀 V10全网通 标配版 4GB+64GB 魅丽红 移动联通电信4G全面屏手机 </p>
                                            <p class="goods-sku">颜色:炫影蓝; 版本:4+64G;</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="order-goods-num">
                                <p>￥1899.00</p>
                                <p>×1</p>
                            </div>
                            <div class="order-goods-num">
                                <p>￥1899.00</p>
                                <p>×1</p>
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div class="order-goods-num" :style="'height: '+ height * num +'px'">
                                <p style="padding-top: 60px">￥1899.00</p>
                                <p>(含运费：￥0.00)</p>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="order-goods-num" :style="'height: '+ height * num +'px'">
                                <p style="padding-top: 60px">下***己</p>
                                <p>(用户id：10226)</p>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="order-goods-num" :style="'height: '+ height * num +'px;text-align: center;line-height:'+ height * num +'px'">
                                <el-tag size="mini" type="success" effect="dark">微信支付</el-tag>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="order-goods-num" :style="'height: '+ height * num +'px;text-align: center;line-height:'+ height * num +'px'">
                                <el-tag size="mini" type="success" effect="dark">快递配送</el-tag>
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div class="order-goods-num order-status" :style="'height:'+ height * num + 'px'">
                                <p :style="'padding-top:'+ padding * num + 'px'">付款状态：<el-tag size="mini" type="success" effect="dark">已付款</el-tag></p>
                                <p>发货状态：<el-tag size="mini" type="success" effect="dark">已付款</el-tag></p>
                                <p>收货状态：<el-tag size="mini" type="success" effect="dark">已付款</el-tag></p>
                                <p>订单状态：<el-tag size="mini" type="success" effect="dark">已付款</el-tag></p>
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div class="order-handle" :style="'height: '+ height * num +'px;text-align: center;line-height:'+ height * num +'px'">
                                <el-button size="small">订单详情</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="order-item">
                    <p class="order-num">
                        <span class="am-margin-right-lg"> 2018-08-02 17:43:39</span>
                        <span class="am-margin-right-lg">订单号：2018080298545157</span>
                    </p>
                    <el-row>
                        <el-col :span="7">
                            <div class="goods-info">
                                <el-row>
                                    <el-col :span="6">
                                        <el-image style="width: 72px; height: 72px" src="http://static.yoshop.xany6.com/2018071718294208f086786.jpg" fit="cover"></el-image>
                                    </el-col>
                                    <el-col :span="18">
                                        <div class="goods-name-sku">
                                            <p class="goods-name">荣耀 V10全网通 标配版 4GB+64GB 魅丽红 移动联通电信4G全面屏手机荣耀 V10全网通 标配版 4GB+64GB 魅丽红 移动联通电信4G全面屏手机 </p>
                                            <p class="goods-sku">颜色:炫影蓝; 版本:4+64G;</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div class="goods-info">
                                <el-row>
                                    <el-col :span="6">
                                        <el-image style="width: 72px; height: 72px" src="http://static.yoshop.xany6.com/2018071718294208f086786.jpg" fit="cover"></el-image>
                                    </el-col>
                                    <el-col :span="18">
                                        <div class="goods-name-sku">
                                            <p class="goods-name">荣耀 V10全网通 标配版 4GB+64GB 魅丽红 移动联通电信4G全面屏手机荣耀 V10全网通 标配版 4GB+64GB 魅丽红 移动联通电信4G全面屏手机 </p>
                                            <p class="goods-sku">颜色:炫影蓝; 版本:4+64G;</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="order-goods-num">
                                <p>￥1899.00</p>
                                <p>×1</p>
                            </div>
                            <div class="order-goods-num">
                                <p>￥1899.00</p>
                                <p>×1</p>
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div class="order-goods-num" :style="'height: '+ height * num +'px'">
                                <p style="padding-top: 60px">￥1899.00</p>
                                <p>(含运费：￥0.00)</p>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="order-goods-num" :style="'height: '+ height * num +'px'">
                                <p style="padding-top: 60px">下***己</p>
                                <p>(用户id：10226)</p>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="order-goods-num" :style="'height: '+ height * num +'px;text-align: center;line-height:'+ height * num +'px'">
                                <el-tag size="mini" type="success" effect="dark">微信支付</el-tag>
                            </div>
                        </el-col>
                        <el-col :span="2">
                            <div class="order-goods-num" :style="'height: '+ height * num +'px;text-align: center;line-height:'+ height * num +'px'">
                                <el-tag size="mini" type="success" effect="dark">快递配送</el-tag>
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div class="order-goods-num order-status" :style="'height:'+ height * num + 'px'">
                                <p :style="'padding-top:'+ padding * num + 'px'">付款状态：<el-tag size="mini" type="success" effect="dark">已付款</el-tag></p>
                                <p>发货状态：<el-tag size="mini" type="success" effect="dark">已付款</el-tag></p>
                                <p>收货状态：<el-tag size="mini" type="success" effect="dark">已付款</el-tag></p>
                                <p>订单状态：<el-tag size="mini" type="success" effect="dark">已付款</el-tag></p>
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div class="order-handle" :style="'height: '+ height * num +'px;text-align: center;line-height:'+ height * num +'px'">
                                <el-button size="small">订单详情</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="pagination">
                <el-pagination
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
                currentPage4:4,
                input: '',
                dialogVisible: false,
                height: 90,
                num: 2,
                padding: 20
            }
        },
        methods: {
            handleClose() {

            }
        },
        mounted() {
            orderListData(this, {
                page: 1,
                limit: 15
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
    .order-status > p{
        padding-top: 5px;
    }
    .order-status > p:first-child{
        padding-top: 10px;
    }
</style>