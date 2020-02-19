/**
 * 订单列表
 * @type {string}
 */
const $order_list_api = '/order/list';


/**
 *
 * @param context
 * @param params
 */
function orderListData(context, params = {}) {
    context.$post($order_list_api, params).then((response) => {
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
        context.orderData = response.data;
        context.count = response.count;
    });
}


/**
 * 订单详情
 * @type {string}
 */
const $order_detail_api = '/order/detail';

/**
 *
 * @param context
 * @param params
 */
function orderDetail(context, params = {}) {
    context.$post($order_detail_api, params).then((response) => {
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
        let peogress = 0, text = '暂未未付款';
        if(response.data.order) {
            switch (response.data.order.status) {
                case 0:
                    peogress = 18;
                    text = '暂未付款';
                    break;
                case 1:
                    peogress = 40;
                    text = '暂未发货';
                    break;
                case 2:
                    peogress = 60;
                    text = '暂未收货';
                    break;
                case 4:
                    peogress = 85;
                    text = '暂未评价';
                    break;
                case 6:
                    peogress = 100;
                    text = '暂未评价';
                    break;
                case 3:
                    peogress = 18;
                    text = '暂未付款';
                    break;
                default:
                    peogress = 100;
                    text = '暂未评价';
                    break;
            }
            context.peogress = peogress;
            context.text = text;
        }
        context.orderData = response.data;
    });
}


export {
    orderListData, orderDetail
}