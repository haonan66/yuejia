<template>
  <el-row :gutter="20">
    <el-col :span="16" :offset="4" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="admin-info-wrapper">
          <div class="left-admin-info">
            <div class="left-top-admin-info">
              <img :src="admin.iconPath" />
              <h3 class="left-admin-name-info">{{ admin.name }}</h3>
              <p class="last-login-time">最后登录时间：{{ admin.loginTime }}</p>
              <el-upload
                class="avatar-uploader"
                action="/admin/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <el-button icon="el-icon-user" type="primary" round
                  >修改头像</el-button
                >
              </el-upload>
            </div>
            <div class="left-middle-admin-info">
              <h4>信息绑定</h4>
              <div class="admin-phone-info">
                <p class="admin-phone">手机：{{ admin.phone }}</p>
                <el-button
                  icon="el-icon-phone"
                  class="update-phone"
                  type="success"
                  round
                  @click="dialogPhoneFormVisible = true"
                  >修改手机
                </el-button>
                <el-dialog
                  title="修改手机"
                  :visible.sync="dialogPhoneFormVisible"
                >
                  <el-form
                    :model="ruleFormForPhone"
                    status-icon
                    :rules="rulesForPhone"
                    ref="ruleFormForPhone"
                  >
                    <el-form-item
                      label="手机号"
                      :label-width="formLabelWidth"
                      prop="phone"
                    >
                      <el-input
                        v-model.number="ruleFormForPhone.phone"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogPhoneFormVisible = false"
                      >取 消</el-button
                    >
                    <el-button
                      type="primary"
                      @click="changePhone('ruleFormForPhone')"
                      >确 定</el-button
                    >
                  </div>
                </el-dialog>
              </div>
            </div>
            <div class="left-bottom-info">
              <el-button
                icon="el-icon-lock"
                type="danger"
                round
                @click="dialogPasswordFormVisible = true"
                >修改密码</el-button
              >
              <el-dialog
                title="修改密码"
                :visible.sync="dialogPasswordFormVisible"
              >
                <el-form
                  :model="ruleFormForPassword"
                  status-icon
                  :rules="rulesForPassword"
                  ref="ruleFormForPassword"
                >
                  <el-form-item
                    label="原密码"
                    :label-width="formLabelWidth"
                    prop="originPassword"
                  >
                    <el-input
                      type="password"
                      v-model="ruleFormForPassword.originPassword"
                      autocomplete="off"
                      show-password
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="新密码"
                    :label-width="formLabelWidth"
                    prop="newPassword"
                  >
                    <el-input
                      type="password"
                      v-model="ruleFormForPassword.newPassword"
                      autocomplete="off"
                      show-password
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="确认密码"
                    :label-width="formLabelWidth"
                    prop="checkPassword"
                  >
                    <el-input
                      type="password"
                      v-model="ruleFormForPassword.checkPassword"
                      autocomplete="off"
                      show-password
                    ></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogPasswordFormVisible = false"
                    >取 消</el-button
                  >
                  <el-button
                    type="primary"
                    @click="changePassword('ruleFormForPassword')"
                    >确 定</el-button
                  >
                </div>
              </el-dialog>
            </div>
          </div>
          <div class="right-info">
            <h3>个人信息</h3>
            <el-form
              :model="ruleFormForName"
              ref="ruleFormForName"
              label-width="120px"
              :rules="rulesForName"
              status-icon
            >
              <el-form-item label="用户名">
                {{ admin.username }}
              </el-form-item>
              <el-form-item label="昵称" prop="name">
                <el-input v-model="ruleFormForName.name" />
              </el-form-item>
            </el-form>

            <el-button
              round
              type="primary"
              @click="updateName('ruleFormForName')"
              >保存</el-button
            >
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";
import qs from "qs";
import { mapState } from "vuex";
export default {
  name: "PersonalCenter",
  data() {
    return {
      dialogPhoneFormVisible: false,
      dialogPasswordFormVisible: false,
      formLabelWidth: "120px",
      ruleFormForPhone: {
        phone: "",
      },
      ruleFormForPassword: {
        originPassword: "",
        newPassword: "",
        checkPassword: "",
      },
      ruleFormForName: {
        name: "",
      },
      rulesForPhone: {
        phone: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("手机号不能为空"));
              } else {
                var uPattern = /^1[3456789]\d{9}$/;
                if (uPattern.test(value)) {
                  callback();
                } else {
                  return callback(new Error("手机号格式错误"));
                }
              }
            },
            trigger: "blur",
          },
        ],
      },
      rulesForPassword: {
        originPassword: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("密码不能为空！"));
              } else {
                //  与原密码进行比较
                if (value === this.admin.password) {
                  callback();
                } else {
                  return callback(new Error("密码输入错误！"));
                }
              }
            },
            trigger: "blur",
          },
        ],
        newPassword: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("密码不能为空！"));
              } else {
                var uPattern = /^.{6,}$/;
                if (uPattern.test(value)) {
                  callback();
                } else {
                  return callback(new Error("密码长度必须大于等于6位"));
                }
              }
            },
            trigger: "blur",
          },
        ],
        checkPassword: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("密码不能为空！"));
              } else if (value !== this.ruleFormForPassword.newPassword) {
                callback(new Error("两次输入密码不一致!"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
      rulesForName: {
        name: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("昵称不能为空！"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState(["admin"]),
  },
  methods: {
    //  上传头像
    handleAvatarSuccess(res, file) {
      const splicePaths = file.response.data.split("\\");
      this.admin.iconPath =
        "/admin/adminIcons/" + splicePaths[splicePaths.length - 1];
      const data = {
        username: this.admin.username,
        iconPath: this.admin.iconPath,
      };
      axios
        .post("/admin/updateIcon", qs.stringify(data), {
          headers: { token: sessionStorage.getItem("token") },
        })
        .then(
          (response) => {
            if (response.data.ok) {
              this.admin.iconPath = response.data.data.iconPath;
              //  提示 state 修改管理员信息
              this.$store.commit("UPDATE_ADMIN", this.admin);
              this.$message({
                message: "修改头像成功！",
                type: "success",
              });
            } else {
              this.$message.error("修改头像失败！");
            }
          },
          (error) => {
            console.log(error.message);
          }
        );
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //  修改手机号
    changePhone(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //  提示 state 修改管理员信息
          this.admin.phone = this.ruleFormForPhone.phone;
          this.$store.commit("UPDATE_ADMIN", this.admin);
          const data = {
            username: this.admin.username,
            phone: this.admin.phone,
          };
          //  服务器修改数据
          axios
            .post("/admin/updatePhone", qs.stringify(data), {
              headers: { token: sessionStorage.getItem("token") },
            })
            .then(
              (response) => {
                if (response.data.ok) {
                  this.$message({
                    message: "修改手机号成功！",
                    type: "success",
                  });
                } else {
                  this.$message.error("修改手机号失败！");
                }
              },
              (error) => {
                console.log(error.message);
              }
            );
          this.dialogPhoneFormVisible = false;
        } else {
          this.$message.error("手机号输入有误！");
          return false;
        }
      });
    },
    //  修改密码
    changePassword(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //  提示 state 修改管理员信息
          this.admin.password = this.ruleFormForPassword.checkPassword;
          this.$store.commit("UPDATE_ADMIN", this.admin);
          const data = {
            username: this.admin.username,
            password: this.admin.password,
          };
          //  服务器修改数据
          axios
            .post("/admin/updatePassword", qs.stringify(data), {
              headers: { token: sessionStorage.getItem("token") },
            })
            .then(
              (response) => {
                if (response.data.ok) {
                  this.$message({
                    message: "修改密码成功！",
                    type: "success",
                  });
                } else {
                  this.$message.error("修改密码失败！");
                }
              },
              (error) => {
                console.log(error.message);
              }
            );
          this.dialogPasswordFormVisible = false;
        } else {
          this.$message.error("请检查密码输入！");
          return false;
        }
      });
    },
    //  修改昵称
    updateName(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //  提示 state 修改管理员信息
          this.admin.name = this.ruleFormForName.name;
          this.$store.commit("UPDATE_ADMIN", this.admin);
          const data = {
            username: this.admin.username,
            name: this.admin.name,
          };
          //  服务器修改数据
          axios
            .post("/admin/updateName", qs.stringify(data), {
              headers: { token: sessionStorage.getItem("token") },
            })
            .then(
              (response) => {
                if (response.data.ok) {
                  this.$message({
                    message: "修改昵称成功！",
                    type: "success",
                  });
                } else {
                  this.$message.error("修改昵称失败！");
                }
              },
              (error) => {
                console.log(error.message);
              }
            );
          this.dialogPasswordFormVisible = false;
        } else {
          this.$message.error("请检查昵称输入！");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.admin-info-wrapper {
  display: flex;
  flex-direction: row;
  align-items: stretch;
}

.left-admin-info {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-right: 1px solid #ddd;
}
.left-admin-info img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

.left-top-admin-info {
  text-align: center;
}

.left-bottom-info .el-button {
  width: 100%;
}

.left-middle-admin-info h4 {
  text-align: center;
  border-top: 1px solid #ddd;
}
.admin-phone-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.admin-phone-info .admin-phone {
  display: inline;
}

.right-info {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.right-info h3 {
  text-align: center;
}
.right-info .el-button {
  width: 100%;
}
</style>
