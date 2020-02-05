/**
 * 获取分类数据
 * @type {string}
 */
const $category_api = '/mall/category/get-select-list';

/**
 *
 * @param context
 * @param params
 */
function categoryData(context, params = {}) {
    context.$post($category_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        if(!params.one_id && !params.two_id) {
            context.one_data = response.data;
        } else if(params.one_id) {
            context.two = true;
            context.two_data = response.data;
        } else if(params.two_id) {
            if(response.data.length > 0){
                context.three = true;
                context.three_data = response.data;
            }
        }
    });
}


/**
 * 全部品牌数据
 * @type {string}
 */
const $brand_api = '/mall/brand/select-data';

/**
 *
 * @param context
 * @param params
 */
function allBrandData(context, params = {}) {
    context.$post($brand_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.allBrand = response.data;
    });
}

export {
    categoryData, allBrandData
}