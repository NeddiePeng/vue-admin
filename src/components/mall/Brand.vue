<template>
    <div class="container-node-list">
        <div>
            <el-dialog title="修改品牌" :visible.sync="dialogFormVisible" width="40%">
                <el-form label-width="80px">
                    <el-form-item label="品牌名称">
                        <el-input v-model="form.name" style="max-width: 220px"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌图片">
                        <el-upload
                                class="avatar_uploader"
                                :action="domain"
                                :show-file-list="false"
                                :data="qiniuData"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="form.cover" :src="form.cover" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="品牌描述">
                        <el-input type="textarea" :rows="4" v-model="form.descriptions" style="max-width: 350px"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="onSubmitData">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="search">
            <div class="item">
                <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <div class="item">
                <el-select v-model="input" placeholder="请选择"></el-select>
            </div>
            <div class="item">
                <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <div class="item submit-search">
                <el-button type="primary"  icon="el-icon-search">搜索</el-button>
                <el-button type="success" icon="el-icon-circle-plus-outline" @click="add">创建分类</el-button>
            </div>
        </div>
        <div class="content-node">
            <el-table
                    :data="activity_data"
                    style="width: 100%"
                    :stripe="true"
                    :highlight-current-row="true">
                <el-table-column fixed prop="id" label="ID" width="80"></el-table-column>
                <el-table-column prop="name" label="品牌名称" width="150"></el-table-column>
                <el-table-column label="品牌封面" width="120">
                    <template slot-scope="scope">
                        <el-image style="width: 100px; height: 50px" :src="scope.row.cover" fit="contain"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="pid" label="品牌描述">
                    <template slot-scope="scope">
                        <div v-html="scope.row.descriptions">{{scope.row.descriptions}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="100">
                    <template slot-scope="scope">
                        <el-link type="success" v-if="scope.row.status == 0">正常</el-link>
                        <el-link type="warning" v-if="scope.row.status == 1">不显示</el-link>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button size="mini" type="success" icon="el-icon-edit" @click="detail(scope.row.id)">编辑</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" @click="updateStatus(scope.row.id, 2, scope.$index)" v-if="scope.row.status == 0">隐藏</el-button>
                        <el-button size="mini" type="primary" icon="el-icon-success" @click="updateStatus(scope.row.id, 1, scope.$index)" v-if="scope.row.status == 1">显示</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[15, 20, 30, 50]"
                        :page-size="limit"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="activity_count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {brandData, brandDataDetail, addBrand, updateBrand} from "../../request/mall/category";
    import {getUploadToken} from "../../request/common";

    export default {
        name: "Brand",
        data() {
            return {
                qiniuData: {
                    token : "",
                    key : ""
                },
                images_url: 'http://mall.img.aiweimeng.top/',
                domain: 'https://upload.qiniup.com',
                dialogTableVisible: false,
                dialogFormVisible: false,
                formLabelWidth: '120px',
                currentPage: 1,
                input: '',
                tableHeight: window.innerHeight - 240,
                activity_data: [],
                activity_count: 0,
                limit: 15,
                form: {
                    id: 0,
                    name: '',
                    cover: '',
                    descriptions: ''
                },
                one_data: [],
                init: 0,
                type: 'add'
            }
        },
        mounted() {
            brandData(this, {
                page: 1,
                limit: this.limit
            });
            categoryData(this, {
                one_id: 0,
                two_id: 0
            });
        },
        methods: {
            onSubmitData() {
                if(this.type == 'add') {
                    addBrand(this, this.form);
                } else {
                    updateBrand(this, this.form);
                }
            },
            add() {
                this.type = 'add';
                this.dialogFormVisible = true;
                this.getToken();
            },
            updateStatus(id, status, index) {

            },
            detail(id) {
                this.type = 'update';
                this.dialogFormVisible = true;
                this.getToken();
                brandDataDetail(this, {
                    id: id
                });
            },
            handleSizeChange(val) {
                this.limit = val;
                this.currentPage = 1;
                mallList(this, {
                    page: 1,
                    limit: val
                });
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                mallList(this, {
                    page: val,
                    limit: this.limit
                });
            },
            handleAvatarSuccess(response) {
                if(response) {
                    this.form.cover = this.images_url + response.key;
                }
            },
            beforeAvatarUpload() {
                this.qiniuData.key = this.guid();
            },
            S4(){
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            },
            guid() {
                return (this.S4()+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+this.S4()+this.S4());
            },
            getToken() {
                getUploadToken(this, {
                    type: 'mall'
                });
            },
        }
    }
</script>


<style scoped>
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }
    .avatar_uploader > div {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar_uploader > div:hover {
        border-color: #409EFF;
    }



    .pagination{
        padding-top: 20px;
        text-align: right;
    }
    .content-node{
        padding-top: 70px;
    }
    .submit-search{
        padding-left: 20px;
    }
    .item{
        float: left;
        padding-right: 5px;
    }
    .container-node-list{
        padding: 20px 10px;
    }
</style>