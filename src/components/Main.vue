<template>
    <el-container>
        <el-header>
            <div class="logo" :style="'background-position:'+ logoPosition + ';width:'+AsideWidth+'px'"></div>
            <div class="show-hide-aside" @click="hideAside">
                <i class="el-icon-s-fold"></i>
            </div>
            <el-menu
                    :default-active="activeNav"
                    class="el-menu-demo"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#1d1e23"
                    text-color="#f6ca9d"
                    :collapse-transition="true"
                    active-text-color="#ffd04b">
                <el-menu-item index="blog">博客管理</el-menu-item>
                <el-menu-item index="mall">商店管理</el-menu-item>
            </el-menu>
        </el-header>
        <el-container>
            <el-aside :style="'width:'+ AsideWidth +'px'">
                <!-- /*:default-active="$route.path"*/-->
                <el-menu class="el-menu-vertical-demo" router @open="handleOpen" @close="handleClose" :collapse="isCollapse"  background-color="#1d1e23" text-color="#fff"  active-text-color="#ffd04b">
                    <el-menu-item index="/">
                        <i class="el-icon-menu"></i>
                        <span slot="title">控制台</span>
                    </el-menu-item>
                    <el-submenu index="/activity" v-show="activeNav == 'blog' ? true : false">
                        <template slot="title">
                            <i class="el-icon-s-ticket"></i>
                            <span slot="title">活动管理</span>
                        </template>
                        <el-menu-item index="/activity">活动列表</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="/soup" v-show="activeNav == 'blog' ? true : false">
                        <i class="el-icon-tableware"></i>
                        <span slot="title">鸡汤管理</span>
                    </el-menu-item>
                    <el-submenu index="/article" v-show="activeNav == 'blog' ? true : false">
                        <template slot="title">
                            <i class="el-icon-s-order"></i>
                            <span slot="title">帖子管理</span>
                        </template>
                        <el-menu-item index="/article">帖子列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="/article-comment" v-show="activeNav == 'blog' ? true : false">
                        <template slot="title">
                            <i class="el-icon-s-comment"></i>
                            <span slot="title">评论管理</span>
                        </template>
                        <el-menu-item index="/article-comment">帖子评论</el-menu-item>
                        <el-menu-item index="1-1">鸡汤评论</el-menu-item>
                    </el-submenu>
                    <el-submenu index="/2" v-show="activeNav == 'blog' ? true : false">
                        <template slot="title">
                            <i class="el-icon-video-camera-solid"></i>
                            <span slot="title">媒体管理</span>
                        </template>
                        <el-menu-item index="1-1">图片列表</el-menu-item>
                        <el-menu-item index="1-1">视频列表</el-menu-item>
                        <el-menu-item index="1-1">音频列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="/user" v-show="activeNav == 'blog' ? true : false">
                        <template slot="title">
                            <i class="el-icon-s-custom"></i>
                            <span slot="title">用户管理</span>
                        </template>
                        <el-menu-item index="1-1">用户列表</el-menu-item>
                        <el-menu-item index="1-1">达人列表</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="/table" v-show="activeNav == 'blog' ? true : false">
                        <i class="el-icon-warning"></i>
                        <span slot="title">举报管理</span>
                    </el-menu-item>
                    <el-menu-item index="/table" v-show="activeNav == 'blog' ? true : false">
                        <i class="el-icon-s-help"></i>
                        <span slot="title">反馈管理</span>
                    </el-menu-item>
                    <el-submenu index="/goods" v-show="activeNav != 'blog' ? true : false">
                        <template slot="title">
                            <i class="el-icon-s-goods"></i>
                            <span slot="title">商品管理</span>
                        </template>
                        <el-menu-item index="/goods-list">商品列表</el-menu-item>
                        <el-menu-item index="/mall-comment">商品评论</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="/mall-category" v-show="activeNav != 'blog' ? true : false">
                        <i class="el-icon-s-grid"></i>
                        <span slot="title">分类管理</span>
                    </el-menu-item>
                    <el-menu-item index="/brand-list" v-show="activeNav != 'blog' ? true : false">
                        <i class="el-icon-postcard"></i>
                        <span slot="title">品牌管理</span>
                    </el-menu-item>
                    <el-submenu index="/mall-activity-manager" v-show="activeNav != 'blog' ? true : false">
                        <template slot="title">
                            <i class="el-icon-s-ticket"></i>
                            <span slot="title">营销管理</span>
                        </template>
                        <el-submenu index="1-4">
                            <span slot="title">活动管理</span>
                            <el-menu-item index="/activity-goods">活动商品</el-menu-item>
                            <el-menu-item index="/mall-activity">活动列表</el-menu-item>
                        </el-submenu>
                        <el-submenu index="1-4-1">
                            <span slot="title">优惠券</span>
                            <el-menu-item index="/mall-coupon">优惠券列表</el-menu-item>
                            <el-menu-item index="/get-mall-coupon">领取记录</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-submenu index="/order" v-show="activeNav != 'blog' ? true : false">
                        <template slot="title">
                            <i class="el-icon-s-order"></i>
                            <span slot="title">订单管理</span>
                        </template>
                        <el-menu-item index="/order">全部订单</el-menu-item>
                        <el-menu-item index="/order">待发货</el-menu-item>
                        <el-menu-item index="/order">待收货</el-menu-item>
                        <el-menu-item index="/order">待付款</el-menu-item>
                        <el-menu-item index="/order">已完成</el-menu-item>
                        <el-menu-item index="/order">已取消</el-menu-item>
                        <el-menu-item index="/order">已退款</el-menu-item>
                    </el-submenu>
                    <el-submenu index="/application" v-show="activeNav != 'blog' ? true : false">
                        <template slot="title">
                            <i class="el-icon-s-grid"></i>
                            <span slot="title">应用中心</span>
                        </template>
                        <el-submenu index="1-5">
                            <span slot="title">整点秒杀</span>
                            <el-menu-item index="/limit-goods">秒杀商品</el-menu-item>
                            <el-menu-item index="/limit-buy">活动会场</el-menu-item>
                        </el-submenu>
                        <el-submenu index="1-5-1">
                            <span slot="title">免费小礼物</span>
                            <el-menu-item index="/mall-coupon">礼物列表</el-menu-item>
                            <el-menu-item index="/limit-buy">活动周期</el-menu-item>
                        </el-submenu>
                    </el-submenu>
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
                activeNav: 'blog',
                AsideWidth: 180,
                logoPosition: 'center'
            }
        },
        methods: {
            hideAside() {
                if(this.isCollapse) {
                    this.isCollapse = false;
                    this.AsideWidth = 180;
                    this.logoPosition = 'center';
                } else {
                    this.isCollapse = true;
                    this.AsideWidth = 64;
                    this.logoPosition = '134px center';
                }
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(key, keyPath) {
                this.activeNav = key;
                localStorage.setItem('navIndex', key);
            }
        },
        mounted() {
            this.activeNav = localStorage.getItem('navIndex') ? localStorage.getItem('navIndex') : 'blog';
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
        -webkit-transition: all .3s,background-color .3s,color .3s;
        transition: all .3s,background-color .3s,color .3s;
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
        background-color: #1d1e23;
    }
    .show-hide-aside > i{
        font-size: 20px;
        color: #f6ca9d;
    }
    .logo{
        height: 50px;
        margin-top: 5px;
        text-align: center;
        position: relative;
        background-image: url("./../assets/logo.png");
        background-size: cover;
        -webkit-transition: all .3s,background-color .3s,color .3s;
        transition: all .3s,background-color .3s,color .3s;
    }
</style>