<template>
    <el-row>
        <el-col :span="4">
            <div style="width: 100%;height: 1px"></div>
        </el-col>
        <el-col :span="16">
            <el-container>
                <el-aside class="im-staff">
                    <ul>
                        <li class="staff-item active-item">
                            <el-avatar size="medium" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
                            <span class="staff-name">刘晓涛</span>
                            <el-badge class="mark" :value="12" />
                        </li>
                        <li class="staff-item">
                            <el-avatar size="medium" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
                            <span class="staff-name">刘晓涛</span>
                            <el-badge class="mark" :value="12" />
                        </li>
                        <li class="staff-item">
                            <el-avatar size="medium" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
                            <span class="staff-name">刘晓涛</span>
                            <el-badge class="mark" :value="12" />
                        </li>
                        <li class="staff-item">
                            <el-avatar size="medium" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
                            <span class="staff-name">刘晓涛</span>
                            <el-badge class="mark" :value="12" />
                        </li>
                    </ul>
                </el-aside>
                <el-container>
                    <el-header class="im-header">
                        <el-avatar size="medium" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
                        <span class="staff-name">刘晓涛</span>
                    </el-header>
                    <el-main class="content">

                    </el-main>
                    <el-footer class="send-content">

                    </el-footer>
                </el-container>
            </el-container>
        </el-col>
        <el-col :span="4"></el-col>
    </el-row>
</template>

<script>
    export default {
        name: "Im"
    }
</script>

<style>
    .content{
        height: 372px;
    }
    .send-content{
        padding: 0;
        height: 158px!important;
        border-top: 1px solid #F1F1F1;
    }
    .active-item{
        background-color: white;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
    }
    .im-header{
        width: 100%;
        height: 70px!important;
        background-color: #F56C6C;
        line-height: 70px;
        padding: 0 20px!important;
    }
    .im-header > .el-avatar{
        margin-top: 15px;
    }
    .im-staff{
        width: 200px;
        background-color: #D9D9D9!important;
        padding: 5px;
        height: 600px;
    }
    .staff-item{
        height: 50px;
        text-align: left;
        padding: 0 15px;
        line-height: 50px;
        overflow: hidden;
        margin-bottom: 5px;
        cursor: pointer;
    }
    .staff-item *{
        vertical-align: middle;
    }
    .staff-name{
        padding-left: 5px;
    }
</style>