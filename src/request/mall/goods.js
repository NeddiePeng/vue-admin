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

export {
    listData
}