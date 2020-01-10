<template>
    <div id="login">
        <!--<transition-group name="flip-list" tag="ul">
            <li v-for="curImg in currImgs" v-bind:key="curImg" class="list-item">
                <img :src="curImg">
            </li>
        </transition-group>-->
        <div class="login-parent">
            <div class="item">
                <h2>layuiAdmin</h2>
                <p>layui 官方出品的单页面后台管理模板系统</p>
            </div>
            <div class="item">
                <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="from.username"></el-input>
            </div>
            <div class="item">
                <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="from.username"></el-input>
            </div>
            <div class="item">
                <el-link type="primary">主要链接</el-link>
            </div>
            <div class="item">
                <el-button type="success" class="submit">成功按钮</el-button>
            </div>
        </div>
        <video loop="loop" id="video" autoplay="autoplay">
            <source  src="./../../assets/media/spring.mp4" type="video/mp4">
        </video>
    </div>
</template>
<script>
    export default {
        name: "Login",
        data() {
            return {
                from: {
                    username:''
                },
                currImgs: [],
                imgs: [
                    'https://img11.360buyimg.com/da/jfs/t4000/107/2234194410/85271/6c24d985/58a50cafNb60886c9.jpg',
                    'https://img20.360buyimg.com/da/jfs/t3154/175/5917485830/129679/f123634c/5897e6a2N83837dd2.jpg',
                    'https://img1.360buyimg.com/da/jfs/t3133/89/5984232745/66970/beaf615c/589ac9bcNe544a72e.jpg',
                    'https://img20.360buyimg.com/da/jfs/t3157/165/6117849901/102894/88bf53b8/589d67b6Ne8986a9e.jpg'
                ],
                index: 0
            }
        },
        mounted: function () {
            this.currImgs = [this.imgs[0]];
            this.startChange();
        },
        methods: {
            startChange: function () {
                var _this = this;
                setInterval(function () {
                    if (_this.index < _this.imgs.length - 1) {
                        _this.index++
                    } else {
                        _this.index = 0
                    }
                    _this.currImgs.splice(0, 1, _this.imgs[_this.index]);
                }, 2000);
            }
        }
    }
</script>

<style type="text/css">
    #video{
        position: fixed;
        right: 0px;
        bottom: 0px;
        min-width: 100%;
        min-height: 100%;
        height: auto;
        width: auto;
    }
    source{
        min-width: 100%;
        min-height: 100%;
        height: auto;
        width: auto;
    }
    #login,#login li,#login li img {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    #login li {
        position: absolute;
        top: 0;
        left: 0;
    }
    #login{
        position: relative;
    }
    .login-parent{
        width: 350px;
        height: 300px;
        background-color: rgba(255, 255, 255, .8);
        position: absolute;
        top:50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        z-index: 999;
        padding: 10px 20px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
    }
    .item{
        margin-bottom: 15px;
    }
    .submit{
        width: 100%;
    }
    .item h2, .item p{
        text-align: center;
        margin-bottom: 10px;
    }
    .item h2{
        font-weight: 300;
        font-size: 30px;
        color: #000;
    }
    .item p{
        font-weight: 300;
        color: #999;
    }
</style>