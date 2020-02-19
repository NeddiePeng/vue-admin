/**
 * 博客活动
 * @type {string}
 */
const $activity_api = '/activity/list';

/**
 * 活动列表
 * @param context
 * @param params
 */
function list(context, params = {}) {
    context.$post($activity_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.activity_data = response.data;
        context.activity_count = response.count;
    });
}


/**
 * 位置请求
 * @type {string}
 */
const $mask_api = '/activity/positions';

/**
 * 位置请求
 * @param context
 * @param params
 */
function mask(context, params = {}) {
    context.$post($mask_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.activity_mask = response.data;
    });
}


/**
 * 创建活动
 * @type {string}
 */
const $create_api = '/activity/create';

/**
 * 创建活动
 * @param context
 * @param params
 */
function create(context, params = {}) {
    context.$post($create_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.$message({
            showClose: true,
            message: '创建成功',
            type: 'success',
            offset: 100,
            center: true
        });
        let _this = context;
        setTimeout(function () {
            _this.$router.go(-1);
        }, 200);
    });
}


/**
 * 活动详情
 * @type {string}
 */
const $detail_api = '/activity/detail';

/**
 * 活动详情
 * @param context
 * @param params
 */
function detail(context, params = {}) {
    context.$post($detail_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.from_data = response.data;
    });
}

/**
 * 修改内容
 * @type {string}
 */
const $update_api = '/activity/update';


function update(context, params = {}) {
    context.$post($update_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.$message({
            showClose: true,
            message: '修改成功',
            type: 'success',
            offset: 100,
            center: true
        });
        let _this = context;
        setTimeout(function () {
            _this.$router.go(-1);
        }, 200);
    });
}

/**
 * 修改状态
 * @type {string}
 */
const $update_status_api = '/activity/update-status';


function updateStatus(context, params = {}, index) {
    context.$post($update_status_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.activity_data[index].status = params.status;
    });
}


/**
 * 商城限时购
 * @type {string}
 */
const $mall_limit_group_api = '/mall_activity/group-buy';

/**
 *
 * @param context
 * @param params
 */
function limitGroupData(context, params = {}) {
    context.$post($mall_limit_group_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.activity_data = response.data;
        context.activity_count = response.count;
    });
}

/**
 * 创建新的限时购
 * @type {string}
 */
const $add_group_api = '/mall_activity/add-group';


function addGroup(context, params = {}) {
    context.$post($add_group_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
    });
}


/**
 * 修改限时购状态
 * @type {string}
 */
const $group_status_api = '/mall_activity/update-group-status';


function updateGroupStatus(context, params = {}, index = 0) {
    context.$post($group_status_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.activity_data[index].status = params.status;
    });
}


/**
 * 增加限时购商品
 * @type {string}
 */
const $add_limit_goods_api = '/mall/activity/add-limit-goods';


function addLimitGoods(context, params = {}) {
    context.$post($add_limit_goods_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.this.dialogTableVisible = false;
        context.multipleSelection = [];
    });
}


/**
 * 添加活动商品
 * @type {string}
 */
const $add_activity_goods_api = '/mall/activity/add-activity-goods';

/**
 *
 * @param context
 * @param params
 */
function addActivityGoods(context, params = {}) {
    context.$post($add_activity_goods_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.dialogActivityVisible = false;
        context.multipleSelection = [];
    });
}

/**
 * 添加会员小礼物
 * @type {string}
 */
const $add_gift_goods_api = '/mall/activity/add-gift-goods';

/**
 *
 * @param context
 * @param params
 */
function addGiftGoods(context, params = {}) {
    context.$post($add_gift_goods_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.multipleSelection = [];
    });
}


/**
 * 增加口碑排行商品
 * @type {string}
 */
const $add_comment_goods_api = '/mall/activity/add-comment-goods';

/**
 *
 * @param context
 * @param params
 */
function addCommentGoods(context, params = {}) {
    context.$post($add_comment_goods_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.multipleSelection = [];
    });
}

/**
 * 增加新品
 * @type {string}
 */
const $add_new_api = '/mall/activity/add-new-goods';

/**
 *
 * @param context
 * @param params
 */
function addNewGoods(context, params = {}) {
    context.$post($add_new_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.multipleSelection = [];
    });
}


/**
 * 活动商品
 * @type {string}
 */
const $activity_goods_api = '/mall/activity/activity-goods';

/**
 *
 * @param context
 * @param params
 */
function activityGoods(context, params = {}) {
    context.$post($activity_goods_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.list = response.data;
        context.count = response.count;
    });
}


/**
 * 删除活动商品
 * @type {string}
 */
const $del_goods_api = '/mall/activity/del-goods';

/**
 *
 * @param context
 * @param params
 * @param index
 */
function delGoods(context, params = {}, index) {
    context.$post($del_goods_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.list.splice(index, 1);
    });
}


/**
 * 礼券列表
 * @type {string}
 */
const $coupon_list_api = '/mall/activity/voucher-list';

/**
 *
 * @param context
 * @param params
 */
function couponListData(context, params = {}) {
    context.$post($coupon_list_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.list = response.data;
        context.count = response.count;
    });
}


/**
 * 添加优惠券
 * @type {string}
 */
const $add_coupon_api = '/mall/activity/add-voucher';

/**
 *
 * @param context
 * @param params
 */
function addCouponData(context, params = {}) {
    context.$post($add_coupon_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.dialogVisible = false;
    });
}


/**
 * 优惠券详情
 * @type {string}
 */
const $coupon_detail_api = '/mall/activity/coupon-detail';

/**
 *
 * @param context
 * @param params
 */
function couponDetail(context, params = {}) {
    context.$post($coupon_detail_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.form = response.data;
        context.dialogVisible = true;
    });
}


/**
 * 修改优惠券
 * @type {string}
 */
const $update_coupon_api = '/mall/activity/update-coupon';

/**
 *
 * @param context
 * @param params
 */
function updateCoupon(context, params = {}) {
    context.$post($update_coupon_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.dialogVisible = false;
    });
}


/**
 * 修改优惠券状态
 * @type {string}
 */
const $update_coupon_status = '/mall/activity/update-status';

/**
 *
 * @param context
 * @param params
 * @param index
 */
function updateVoucherStatus(context, params = {}, index) {
    context.$post($update_coupon_status, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.list[index].status = params.status;
    });
}


/**
 * 领取记录
 * @type {string}
 */
const $draw_list_api = '/mall/activity/draw-voucher';

/**
 *
 * @param context
 * @param params
 */
function drawListData(context, params = {}) {
    context.$post($draw_list_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.list = response.data;
        context.total = response.count;
    });
}

export {
    list, mask, create, detail, update, updateStatus,
    limitGroupData, addGroup, updateGroupStatus, addLimitGoods,
    addActivityGoods, addGiftGoods, addCommentGoods, addNewGoods,
    activityGoods, delGoods, couponListData, addCouponData, couponDetail,
    updateCoupon, updateVoucherStatus, drawListData
}