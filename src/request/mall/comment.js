/**
 * 商品评论
 * @type {string}
 */
const $comment_list_api = '/mall/comment/mall';

/**
 *
 * @param context
 * @param params
 */
function commentData(context, params = {}) {
    context.$post($comment_list_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.total = response.count;
        context.list = response.data;
    });
}


/**
 * 添加回复
 * @type {string}
 */
const $replay_api = '/mall/comment/replay';

/**
 *
 * @param context
 * @param params
 * @param index
 */
function addReplayComment(context, params= {}, index) {
    context.$post($replay_api, params).then((response) => {
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
        context.list[index].is_be_replay = 1;
    });
}


/**
 * 删除评论
 * @type {string}
 */
const $del_api = '/mall/comment/del';

/**
 *
 * @param context
 * @param params
 * @param index
 */
function delCommentData(context, params = {}, index) {
    context.$post($del_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.list[index].status = 0;
    });
}


export {
    commentData, addReplayComment, delCommentData
}