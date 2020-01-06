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
                <el-menu-item index="1">
                    博客管理
                </el-menu-item>
                <el-menu-item index="3">
                    商店管理
                </el-menu-item>
            </el-menu>
        </el-header>
        <el-container>
            <el-aside>
                <!-- /*:default-active="$route.path"*/-->
                <el-menu class="el-menu-vertical-demo"  router @open="handleOpen" @close="handleClose" :collapse="isCollapse"  background-color="#1d1e23" text-color="#fff"  active-text-color="#ffd04b">
                    <el-menu-item index="/">
                        <i class="el-icon-menu"></i>
                        <span slot="title">控制台</span>
                    </el-menu-item>
                    <el-submenu index="/activity">
                        <template slot="title">
                            <i class="el-icon-s-ticket"></i>
                            <span slot="title">活动管理</span>
                        </template>
                        <el-menu-item index="1-1">活动列表</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="/table1">
                        <i class="el-icon-tableware"></i>
                        <span slot="title">鸡汤管理</span>
                    </el-menu-item>
                    <el-submenu index="/1">
                        <template slot="title">
                            <i class="el-icon-s-order"></i>
                            <span slot="title">帖子管理</span>
                        </template>
                        <el-menu-item index="1-1">帖子列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="/commit">
                        <template slot="title">
                            <i class="el-icon-s-comment"></i>
                            <span slot="title">评论管理</span>
                        </template>
                        <el-menu-item index="1-1">帖子评论</el-menu-item>
                        <el-menu-item index="1-1">鸡汤评论</el-menu-item>
                    </el-submenu>
                    <el-submenu index="/2">
                        <template slot="title">
                            <i class="el-icon-video-camera-solid"></i>
                            <span slot="title">媒体管理</span>
                        </template>
                        <el-menu-item index="1-1">图片列表</el-menu-item>
                        <el-menu-item index="1-1">视频列表</el-menu-item>
                        <el-menu-item index="1-1">音频列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="/user">
                        <template slot="title">
                            <i class="el-icon-s-custom"></i>
                            <span slot="title">用户管理</span>
                        </template>
                        <el-menu-item index="1-1">用户列表</el-menu-item>
                        <el-menu-item index="1-1">达人列表</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="/table">
                        <i class="el-icon-warning"></i>
                        <span slot="title">举报管理</span>
                    </el-menu-item>
                    <el-menu-item index="/table">
                        <i class="el-icon-s-help"></i>
                        <span slot="title">反馈管理</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <router-view/>
                </el-main>
                <el-footer>Footer</el-footer>
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
                activeIndex2: '1'
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
                console.log(key, keyPath);
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