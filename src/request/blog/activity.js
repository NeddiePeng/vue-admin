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


export {
    list
}