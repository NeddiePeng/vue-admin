/**
 * 用户列表
 * @type {string}
 */
const $user_list_api = '/user/list';

/**
 *
 * @param context
 * @param params
 */
function userData(context, params = {}) {
    context.$post($user_list_api, params).then((response) => {
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
        context.list = response.data;
        context.total = response.count;
    });
}


export {
    userData
}