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
                <el-menu-item index="1">处理中心</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">我的工作台</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                    <el-submenu index="2-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="2-4-1">选项1</el-menu-item>
                        <el-menu-item index="2-4-2">选项2</el-menu-item>
                        <el-menu-item index="2-4-3">选项3</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="3">消息中心</el-menu-item>
                <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
            </el-menu>
        </el-header>
        <el-container>
            <el-aside>
                <el-menu class="el-menu-vertical-demo" :default-active="$route.path" router @open="handleOpen" @close="handleClose" :collapse="isCollapse"  background-color="#1d1e23" text-color="#fff"  active-text-color="#ffd04b">
                    <el-submenu index="/">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">首页</span>
                        </template>
                        <el-menu-item-group>
                            <span slot="title">分组一</span>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                            <span slot="title">选项4</span>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="/table">
                        <i class="el-icon-menu"></i>
                        <span slot="title">介绍</span>
                    </el-menu-item>
                    <el-menu-item index="/im">
                        <i class="el-icon-document"></i>
                        <span slot="title">安装</span>
                    </el-menu-item>
                    <el-menu-item index="/table">
                        <i class="el-icon-setting"></i>
                        <span slot="title">跟新日志</span>
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