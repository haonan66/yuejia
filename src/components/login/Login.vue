<template>

  <el-row>
    <el-col :span="8" :offset="8">
        <div class="login-text-wrapper">
            <h1>Login</h1>
        </div>
        <el-form label-width="80px">
            <el-form-item label="用户名">
                <el-input 
                    class="input-username"
                    placeholder="请输入用户名" 
                    v-model="username"
                    autofocus>
                </el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input 
                    class="input-password"
                    placeholder="请输入密码" 
                    v-model="password" 
                    show-password>
                </el-input>
            </el-form-item>
            <el-form-item label="验证码">
                <el-input
                    class="input-yzm"
                    placeholder="请输入验证码" 
                    v-model="yzm"
                    maxlength="5">
                </el-input>
            </el-form-item>
            <el-button 
                class="btn-login"
                type="primary"
                @click="login">
                登录
            </el-button>
        </el-form>
    </el-col>
  </el-row>
</template>

<script>
    // import axios from 'axios'
    export default {
        name: 'Login',
        data() {
            return {
                username: '',
                password: '',
                yzm: ''
            }
        },
        methods: {
            login(){
                // axios.post('/admin/login').then(
                //     response => {console.log(response.data)},
                //     error => {console.log(error.message)}
                // )
            }
        }
    }
</script>

<style scoped> 
  /* elementUI 组件样式 */
  .el-row{
    margin-bottom: 20px;
    margin-top: 150px;
  }
  .el-col{
    border-radius: 4px;
  }

  

  
  /* 设置顶部字体样式 */
  .login-text-wrapper{
      text-align: center;
  }
  /* 设置输入框的长度 */
  .el-input{
      width: 350px;
  }
  /* 验证码输入框长度 */
  .input-yzm{
      width: 200px;
  }
  /* 登录按钮样式 */
  .btn-login{
      width: 100%;
  }
</style>