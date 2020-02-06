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


/**
 * 商城分类
 * @type {string}
 */
const $category_mall_api = '/category/mall-list';

/**
 *
 * @param context
 * @param params
 */
function mallList(context, params = {}) {
    context.$post($category_mall_api, params).then((response) => {
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


/**
 * 商城分类详情
 * @type {string}
 */
const $mall_category_api = '/category/mall-category-detail';


function mallCategoryData(context, params = {}) {
    context.$post($mall_category_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.form = response.data;
    });
}


/**
 * 修改分类
 * @type {string}
 */
const $update_category_api = '/mall/category/update-category';


function updateCategory(context, params = {}) {
    context.$post($update_category_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.dialogFormVisible = false;
        context.form = {
            id: 0,
            name: '',
            cover: '',
            pid: 0
        };
    });
}


/**
 * 增加商城分类
 * @type {string}
 */
const $add_category_api = '/mall/category/add-category';

/**
 *
 * @param context
 * @param params
 */
function addMallCategory(context, params = {}) {
    context.$post($add_category_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.dialogFormVisible = false;
        context.form = {
            id: 0,
            name: '',
            cover: '',
            pid: 0
        };
    });
}


/**
 * 品牌数据
 * @type {string}
 */
const $brand_list_api = '/mall/brand/brand-list';


/**
 *
 * @param context
 * @param params
 */
function brandData(context, params = {}) {
    context.$post($brand_list_api, params).then((response) => {
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


/**
 * 品牌详情
 * @type {string}
 */
const $brand_data_api = '/mall/brand/detail';

/**
 *
 * @param context
 * @param params
 */
function brandDataDetail(context, params = {}) {
    context.$post($brand_data_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.form = response.data;
    });
}


/**
 * 添加品牌
 * @type {string}
 */
const $add_brand_api = '/mall/brand/add-brand';

/**
 *
 * @param context
 * @param params
 */
function addBrand(context, params = {}) {
    context.$post($add_brand_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.dialogFormVisible = false;
        context.form = {id: 0, name: '', cover: '', descriptions: ''};
    });
}

/**
 * 修改品牌
 * @type {string}
 */
const $update_brand_api = '/mall/brand/update-brand';

/**
 *
 * @param context
 * @param params
 */
function updateBrand(context, params = {}) {
    context.$post($update_brand_api, params).then((response) => {
        if(response.code !== 200) {
            context.$message({
                showClose: true,
                message: response.message,
                type: 'error',
                offset: 100,
                center: true
            });
        }
        context.dialogFormVisible = false;
        context.form = {id: 0, name: '', cover: '', descriptions: ''};
    });
}

export {
    categoryData, allBrandData, mallList, mallCategoryData,
    updateCategory, addMallCategory, brandData, brandDataDetail,
    addBrand, updateBrand
}