/**
 * 帖子列表
 * @type {string}
 */
const $article_api = '/article/list';

/**
 * 帖子列表
 * @param context
 * @param params
 */
function list(context, params = {}) {
    context.$post($article_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.article_data = response.data;
        context.article_count = response.count;
    });
}

export {
    list
}