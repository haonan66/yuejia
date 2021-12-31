<template>
  <div class="app-container">
    <el-form :model="user" ref="user" :rules="rules" label-width="120px" status-icon>
      <el-form-item 
        label="用户名" 
        prop="username"
      >
        <el-input v-model="user.username"/>
      </el-form-item>
      <el-form-item 
        label="密码"
        prop="password"
      >
        <el-input v-model="user.password" type="password" show-password/>
      </el-form-item>
      <el-form-item 
        label="昵称"
        prop="name"
      >
        <el-input v-model="user.name"/>
      </el-form-item>
      <el-form-item 
        label="性别"
        prop="sex"
      >
        <template>
          <el-radio v-model="user.sex" :label="1">男</el-radio>
          <el-radio v-model="user.sex" :label="0">女</el-radio>
        </template>
      </el-form-item>
      <el-form-item 
       label="手机号"
       prop="phone"
      >
        <el-input v-model.number="user.phone"/>
      </el-form-item>
      <el-form-item 
       label="邮箱（可不填）"
       prop="email"
      >
        <el-input v-model="user.email"/>
      </el-form-item>
      <el-form-item label="地址（可不填）">
        <el-input v-model="user.address"/>
      </el-form-item>
      <el-form-item label="上传头像图片（可不填）">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8201/admin/user/userManager/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <div v-show="user.iconPath">
            <img :src="user.iconPath" class="avatar">
          </div>
          <div v-show="!user.iconPath">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('user')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import axios from 'axios'
    export default {
      name: 'Add',
      data() {
        return {
          user: {},
          imageUrl: '',
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
            //  校验昵称
            name: [
              {
                validator: (rule, value, callback) => {
                  if(!value) {
                    return callback(new Error('昵称不能为空'))
                  } else {
                    if (value.trim() === '') {
                      return callback(new Error('昵称不能为空'))
                    } else {
                      callback()
                    }
                  }
                },
                trigger: 'blur'
              }
            ],
            //  校验手机号
            phone: [
              {
                validator: (rule, value, callback) => {
                  if(!value) {
                    return callback(new Error('手机号不能为空'))
                  } else {
                    var uPattern = /^1[3456789]\d{9}$/
                    if (uPattern.test(value)) {
                      callback()
                    } else {
                      return callback(new Error('手机号格式错误'))
                    }
                  }
                },
                trigger: 'blur'
              }
            ],
            //  校验邮箱
            email: [
              {
                validator: (rule, value, callback) => {
                  if(!value) {
                    callback()
                  } else {
                    var uPattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
                    if (uPattern.test(value)) {
                      callback()
                    } else {
                      return callback(new Error('邮箱格式错误'))
                    }
                  }
                },
                trigger: 'blur'
              } 
            ],
            //  校验地址（暂且不做校验）
            //  校验头像（暂且不做校验）
          }
        }
      },
      created() {
        //  获取路由 id 值
        //  调用接口得到用户设置信息
        if (this.$route.params && this.$route.params.id) {
          const id = this.$route.params.id
          this.getUserById(id)

        } else {
          //  表单数据清空
          this.user = {}
        }
      },
      methods: {
        //  上传头像
        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw)
          const splicePaths = file.response.data.split('\\')
          this.user.iconPath = 'http://localhost:8201/userIcons/' + splicePaths[splicePaths.length - 1]
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg'
          const isLt2M = file.size / 1024 / 1024 < 2

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!')
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!')
          }
          return isJPG && isLt2M
        },
        // 根据 id 查询
        getUserById(id) {
          axios.get(`http://localhost:8201/admin/user/userManager/getUser/${id}`).then(
            response => {
              this.user = response.data.data
            },
            error => {
              console.log(error.message)
            }
          )
        },
        // 添加
        save() {
          axios.post(`http://localhost:8201/admin/user/userManager/saveUser`,this.user).then(
            // eslint-disable-next-line no-unused-vars
            response => {
              //  提示
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
              //  跳转到列表页面，使用路由跳转
              this.$router.push({ path: '/user/list' })
            })
            },
            //  修改
            update() {
              axios.post(`http://localhost:8201/admin/user/userManager/updateUser`,this.user).then(
                  // eslint-disable-next-line no-unused-vars
                  response => {
                  //  提示
                  this.$message({
                    type: 'success',
                    message: '修改成功!'
                  })
                  //  跳转到列表页面，使用路由跳转
                  this.$router.push({ path: '/user/list' })
                }
              )
            },
            saveUser() {
              //  判断是添加还是修改
              if (!this.user.userId) {
                  this.save()
              } else {
                  // this.imageUrl
                  this.update()
              }
            },
            //  提交表单时进行，即判断是否每个 validator 都被满足了
            submitForm(formName) {
              //  判断是添加还是修改
              if (!this.user.userId) {
                    this.$refs[formName].validate((valid) => {
                    if (valid) {
                      this.save()
                    } else {
                      this.$message.error('添加失败！')
                      return false
                    }
                  })
              } else {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                      this.update()
                    } else {
                      this.$message.error('修改失败！')
                      return false
                    }
                  })
              }
          },
        },
        
      }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>