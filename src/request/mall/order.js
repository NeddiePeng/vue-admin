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


export {
    orderListData
}