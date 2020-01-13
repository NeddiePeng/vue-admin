/**
 * 获取上传token
 * @type {string}
 */
const $token_api = '/qiniu/token';

/**
 * 获取上传token
 * @param context
 * @param params
 */
function getUploadToken(context, params = {}) {
    context.$post($token_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.qiniuData.token = response.data.token;
    });
}

export {
    getUploadToken
}