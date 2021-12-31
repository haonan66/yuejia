<template>
 <div class="login">
  <el-row>
    <el-col :span="8" :offset="8">
        <div class="login-text-wrapper">
            <h1>悦家后台管理系统</h1>
        </div>
        <el-form 
            :model="admin"
            label-width="80px" 
            :rules="rules"
            ref="admin"
        >
            <el-form-item prop="username">
                <el-input 
                    placeholder="请输入用户名" 
                    v-model="admin.username"
                    autofocus
                    prefix-icon="el-icon-user"
                >
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input 
                    placeholder="请输入密码" 
                    v-model="admin.password" 
                    show-password
                    prefix-icon="el-icon-key"    
                >
                </el-input>
            </el-form-item>
            <!-- 验证码先不做，等学完 redis 等知识再进行开发 -->
            <!-- <el-form-item>
                <el-input
                    class="input-yzm"
                    placeholder="请输入验证码" 
                    v-model="admin.yzm"
                    maxlength="5"
                    prefix-icon="el-icon-platform-eleme">
                </el-input>
            </el-form-item> -->
            <el-form-item>
                <el-button 
                    class="btn-login"
                    type="primary"
                    @click="submitForm('admin')">
                登录
                </el-button>
            </el-form-item>
        </el-form>
    </el-col>
  </el-row>
 </div>
  
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    export default {
        name: 'Login',
        data() {
            return {
                admin: {
                    username: '',
                    password: '',
                },
                yzm: '',
                rules: {
                    //  校验用户名
                    username: [
                    { 
                        validator: (rule, value, callback) => {
                        if(!value) {
                            return callback(new Error('用户名不能为空'))
                        } else {
                            var uPattern = /^[a-zA-Z0-9_-]{4,16}$/
                            
                            if (uPattern.test(value)) {
                                callback()
                            } else {
                                return callback(new Error('用户名输入不合法，格式为4到16位（字母，数字，下划线，减号）'))
                            }
                        }
                        },
                        trigger: 'blur' 
                    }
                    ],
                    //  校验密码
                    password: [
                    {
                        validator: (rule, value, callback) => {
                        if(!value) {
                            return callback(new Error('密码不能为空'))
                        } else {
                            var uPattern = /^.{6,}$/
                            if (uPattern.test(value)) {
                                callback()
                            } else {
                                return callback(new Error('密码长度必须大于等于6位'))
                            }
                        }
                        },
                        trigger: 'blur'
                    }
                    ],
                }
            }
        },
        methods: {
            login(){
                var data = {
                    username: this.admin.username,
                    password: this.admin.password,
                }
                axios.post('http://localhost:8200/admin/login',qs.stringify(data)).then(
                    response => {
                        console.log(response.data)
                        
                        if (response.data.ok) {
                            //  存储 token
                            sessionStorage.setItem('token',response.data.data)
                            //  跳转到首页
                            this.$router.push({name: 'main'})
                        } else {
                            this.$message.error('登录失败，用户名或密码错误！')
                        }
                    },
                    error => {console.log(error.message)}
                )
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                      this.login()
                    } else {
                      this.$message.error('登录失败，请检查用户名或密码输入是否合法！')
                      return false
                    }
                  })
            },
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
  /* 登录按钮样式 */
  .btn-login{
      width: 100%;
  }

  .input-yzm{
      width: 250px;
  }

</style>