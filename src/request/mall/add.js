/**
 * 添加商品基本信息
 * @type {string}
 */
const $add_basic_api = '/goods/create-one';

/**
 *
 * @param context
 * @param params
 */
function addBasic(context, params = {}) {
    context.$post($add_basic_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        localStorage.setItem('product_id', response.data.id);
        context.$router.push({path:'/price'});
    });
}

/**
 * 商品价格信息提交
 * @type {string}
 */
const $add_price_api = '/goods/create-two';

/**
 *
 * @param context
 * @param params
 */
function addGoodsPrice(context, params = {}) {
    context.$post($add_price_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
            return;
        }
        context.$router.push({path:'/attr'});
    });
}

/**
 * 获取属性
 * @type {string}
 */
const $attr_key_api = '/mall/attr/list-data';

/**
 *
 * @param context
 * @param params
 */
function attrKeyData(context, params = {}) {
    context.$post($attr_key_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
            return;
        }
        for (let i = 0; i < response.data.length; i++) {
            response.data[i].children = [{"name": '', 'img': ''}];
        }
        context.attrKey = response.data;
    });
}


/**
 * 添加属性的值
 * @type {string}
 */
const $add_attr_api = '/goods/create-three';

/**
 *
 * @param context
 * @param params
 */
function addAttrValue(context, params = {}) {
    context.$post($add_attr_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
            return;
        }
        context.$router.push({path:'/combination'});
    });
}


/**
 * 属性值组合
 * @type {string}
 */
const $attr_com_api = '/mall/attr/attr-combination';

/**
 *
 * @param context
 * @param params
 */
function attrComData(context, params = {}) {
    context.$post($attr_com_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
            return;
        }
        for (let i = 0; i < response.data.length; i++) {
            response.data[i].price = 0;
            response.data[i].vip_price = 0;
            response.data[i].stock = 0;
        }
        context.comData = response.data;
    });
}


/**
 * 添加商品属性组合
 * @type {string}
 */
const $add_com_api = '/goods/create-four';

/**
 *
 * @param context
 * @param params
 */
function addComData(context, params = {}) {
    context.$post($add_com_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
            return;
        }
        context.$router.push({path:'/detail'});
    });
}

/**
 * 增加商品详情
 * @type {string}
 */
const $add_detail = '/goods/create-five';

/**
 *
 * @param context
 * @param params
 */
function addGoodsDetail(context, params = {}) {
    context.$post($add_detail, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
            return;
        }
        context.$router.push({path:'/activityGoods'});
    });
}


/**
 * 商品活动
 * @type {string}
 */
const $activity_api = '/mall/activity/mall-activity';

/**
 *
 * @param context
 * @param params
 */
function activityData(context, params = {}) {
    context.$post($activity_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
            return;
        }
        context.activityDataList = response.data;
    });
}


/**
 * 增加商品活动
 * @type {string}
 */
const $add_goods_activity_api = '/goods/create-goods-activity';

/**
 *
 * @param context
 * @param params
 */
function addGoodsActivity(context, params = {}) {
    context.$post($add_goods_activity_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
            return;
        }
        context.$router.push({path:'/goods-list'});
    });
}

export {
    addBasic, addGoodsPrice, attrKeyData, addAttrValue, attrComData,
    addComData, addGoodsDetail, activityData, addGoodsActivity
}