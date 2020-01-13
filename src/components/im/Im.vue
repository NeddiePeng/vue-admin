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
                        <el-input
                                type="textarea"
                                :autosize="{ minRows: 5, maxRows: 6}"
                                placeholder="请输入内容"
                                v-model="from_data.content">
                        </el-input>
                        <div class="send-button">
                            <el-button type="danger" size="small">危险按钮</el-button>
                        </div>
                    </el-footer>
                </el-container>
            </el-container>
        </el-col>
        <el-col :span="4"></el-col>
    </el-row>
</template>

<script>
    export default {
        name: "Im",
        data() {
            return {
                from_data: {
                    content: ''
                }
            }
        }
    }
</script>

<style>
    .send-button{
        padding-top: 5px;
        text-align: right;
        padding-right: 10px;
    }
    .content{
        height: 372px;
    }
    .send-content{
        padding: 0;
        height: 158px!important;
        border-bottom: 1px solid #DCDFE6;
    }
    .active-item{
        background-color: #F56C6C;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        color: #1a1a1a!important;
    }
    .im-header{
        width: 100%;
        height: 70px!important;
        background-color: #F56C6C;
        line-height: 70px;
        padding: 0 20px!important;
    }
    .im-staff{
        width: 200px!important;
        background-color: #303133!important;
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
        color: white;
    }
    .staff-item *, .im-header *{
        vertical-align: middle;
    }
    .staff-name{
        padding-left: 5px;
    }
</style>