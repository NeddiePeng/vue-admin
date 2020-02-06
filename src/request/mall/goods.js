/**
 * 商品数据
 * @type {string}
 */
const $list_api = '/goods/list-data';

/**
 *
 * @param context
 * @param params
 */
function listData(context, params = {}) {
    context.$post($list_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.listDataList = response.data;
        context.total = response.count;
    });
}

/**
 * 修改商品状态
 * @type {string}
 */
const $update_status_api = '/goods/update-status';

/**
 *
 * @param context
 * @param params
 * @param index
 */
function updateGoodsStatus(context, params = {}, index = 0) {
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
        context.listDataList[index].status = params.status;
    });
}

export {
    listData, updateGoodsStatus
}