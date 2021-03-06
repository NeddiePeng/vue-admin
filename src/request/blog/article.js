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


/**
 * 修改帖子状态
 * @type {string}
 */
const $update_status_api = '/article/status';

/**
 * 修改帖子状态
 * @param context
 * @param params
 * @param index
 */
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
        context.article_data[index].status = params.status;
    });
}

/**
 * 删除
 * @type {string}
 */
const $del_api = '/article/delete';

/**
 * 删除
 * @param context
 * @param params
 * @param index
 */
function delete_article(context, params = {}, index) {
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
        context.article_data[index].is_delete = params.status;
    });
}


/**
 * 鸡汤列表
 * @type {string}
 */
const $soup_list_api = '/soup/list';

/**
 * 鸡汤列表
 * @param context
 * @param params
 */
function soupData(context, params = {}) {
    context.$post($soup_list_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.soupDataList = response.data;
        context.count = response.count;
    });
}

/**
 * 修改鸡汤状态
 * @type {string}
 */
const $update_soup_status = '/soup/update-status';


/**
 * 修改鸡汤状态
 * @param context
 * @param params
 * @param index
 */
function updateSoupStatus(context, params = {}, index) {
    context.$post($update_soup_status, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.soupDataList[index].status = params.status;
    });
}

export {
    list, updateStatus, delete_article, soupData, updateSoupStatus
}