<template>
    <el-container>
        <el-header>
            <div class="logo">
                <img src="./../assets/logo.png" alt="">
            </div>
            <div class="show-hide-aside">
                <i class="el-icon-s-fold"></i>
            </div>
            <el-menu
                    :default-active="activeIndex2"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#1d1e23"
                    text-color="#f6ca9d"
                    active-text-color="#ffd04b">
                <el-menu-item index="blog">
                    博客管理
                </el-menu-item>
                <el-menu-item index="mall">
                    商店管理
                </el-menu-item>
            </el-menu>
        </el-header>
        <el-container>
            <el-aside>
                <!-- /*:default-active="$route.path"*/-->
                <el-menu class="el-menu-vertical-demo" router @open="handleOpen" @close="handleClose" :collapse="isCollapse"  background-color="#1d1e23" text-color="#fff"  active-text-color="#ffd04b">
                    <el-menu-item index="/" v-show="activeIndex2 == 'blog' ? true : false">
                        <i class="el-icon-menu"></i>
                        <span slot="title">控制台</span>
                    </el-menu-item>
                    <el-submenu index="/activity" v-show="activeIndex2 == 'blog' ? true : false">
                        <template slot="title">
                            <i class="el-icon-s-ticket"></i>
                            <span slot="title">活动管理</span>
                        </template>
                        <el-menu-item index="/activity">活动列表</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="/soup" v-show="activeIndex2 == 'blog' ? true : false">
                        <i class="el-icon-tableware"></i>
                        <span slot="title">鸡汤管理</span>
                    </el-menu-item>
                    <el-submenu index="/article" v-show="activeIndex2 == 'blog' ? true : false">
                        <template slot="title">
                            <i class="el-icon-s-order"></i>
                            <span slot="title">帖子管理</span>
                        </template>
                        <el-menu-item index="/article">帖子列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="/article-comment" v-show="activeIndex2 == 'blog' ? true : false">
                        <template slot="title">
                            <i class="el-icon-s-comment"></i>
                            <span slot="title">评论管理</span>
                        </template>
                        <el-menu-item index="/article-comment">帖子评论</el-menu-item>
                        <el-menu-item index="1-1">鸡汤评论</el-menu-item>
                    </el-submenu>
                    <el-submenu index="/2" v-show="activeIndex2 == 'blog' ? true : false">
                        <template slot="title">
                            <i class="el-icon-video-camera-solid"></i>
                            <span slot="title">媒体管理</span>
                        </template>
                        <el-menu-item index="1-1">图片列表</el-menu-item>
                        <el-menu-item index="1-1">视频列表</el-menu-item>
                        <el-menu-item index="1-1">音频列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="/user" v-show="activeIndex2 == 'blog' ? true : false">
                        <template slot="title">
                            <i class="el-icon-s-custom"></i>
                            <span slot="title">用户管理</span>
                        </template>
                        <el-menu-item index="1-1">用户列表</el-menu-item>
                        <el-menu-item index="1-1">达人列表</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="/table" v-show="activeIndex2 == 'blog' ? true : false">
                        <i class="el-icon-warning"></i>
                        <span slot="title">举报管理</span>
                    </el-menu-item>
                    <el-menu-item index="/table" v-show="activeIndex2 == 'blog' ? true : false">
                        <i class="el-icon-s-help"></i>
                        <span slot="title">反馈管理</span>
                    </el-menu-item>
                    <el-submenu index="/goods" v-show="activeIndex2 != 'blog' ? true : false">
                        <template slot="title">
                            <i class="el-icon-s-ticket"></i>
                            <span slot="title">商品管理</span>
                        </template>
                        <el-menu-item index="/goods-list">商品列表</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="/mall-category" v-show="activeIndex2 != 'blog' ? true : false">
                        <i class="el-icon-s-help"></i>
                        <span slot="title">分类管理</span>
                    </el-menu-item>
                    <el-menu-item index="/table" v-show="activeIndex2 != 'blog' ? true : false">
                        <i class="el-icon-s-help"></i>
                        <span slot="title">品牌管理</span>
                    </el-menu-item>
                    <el-submenu index="/order" v-show="activeIndex2 != 'blog' ? true : false">
                        <template slot="title">
                            <i class="el-icon-s-ticket"></i>
                            <span slot="title">订单管理</span>
                        </template>
                        <el-menu-item index="/order">商品列表</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="/limit-buy" v-show="activeIndex2 != 'blog' ? true : false">
                        <i class="el-icon-s-help"></i>
                        <span slot="title">限时购管理</span>
                    </el-menu-item>
                    <el-menu-item index="/table" v-show="activeIndex2 != 'blog' ? true : false">
                        <i class="el-icon-s-help"></i>
                        <span slot="title">会员小礼物</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "Main",
        data() {
            return {
                isCollapse: false,
                activeIndex: '1',
                activeIndex2: 'blog'
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(key, keyPath) {
                console.log(this.isCollapse);
                this.activeIndex2 = key;
            }
        }
    }
</script>

<style>
    .el-header{
        background-color:#1d1e23;
        color:#fff;
        display: flex;
        padding-left: 0!important;
    }
    .el-container{
        height: 100%;
    }
    .el-aside {
        background-color: #1d1e23;
        color: #333;
        text-align: center;
        height: 100%;
        width: 180px!important;
    }
    .el-aside::-webkit-scrollbar {
        width: 5px;
        height: 1px;
    }

    .el-aside::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #535353;
    }

    .el-aside::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 10px;
        background: #EDEDED;
    }
    .el-submenu, .el-menu-item{
        text-align: left;
    }
    .el-menu{
        border: 0;
    }
    .show-hide-aside{
        width: 50px;
        line-height: 65px;
        height: 60px;
        cursor: pointer;
    }
    .show-hide-aside > i{
        font-size: 20px;
        color: #f6ca9d;
    }
    .logo{
        width: 180px;
        height: 50px;
        margin-top: 5px;
        text-align: center;
    }
    .logo > img{
        height: 100%;
        object-fit: cover;
    }
</style>