<template>
  <header>
    <div class="l-content">
      <el-button
        plain
        icon="el-icon-menu"
        size="mini"
        @click="changeAsideState"
      >
      </el-button>
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="currentMenu.path" v-if="currentMenu">
          {{ currentMenu.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span class="el-dropdown-link">
          <img :src="admin.iconPath" class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="toPersonalCenter"
            >个人中心</el-dropdown-item
          >
          <el-dropdown-item @click.native="exitSystem">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "CommonHeader",
  methods: {
    changeAsideState() {
      this.$store.commit("CHANGE_STATE");
    },
    exitSystem() {
      axios
        .post(
          "/admin/exitSystem",
          {},
          {
            headers: { token: sessionStorage.getItem("token") },
          }
        )
        .then(
          (response) => {
            if (response.data.ok) {
              //  移除 token
              sessionStorage.removeItem("token");
              //  重定向到登录界面
              this.$router.push({ name: "login" });
              this.$message({
                message: "退出登录！",
                type: "warning",
              });
            }
          },
          (error) => {
            console.log(error.message);
          }
        );
    },
    toPersonalCenter() {
      this.$router.push({ name: "personalCenter" });
    },
  },
  computed: {
    ...mapState(["currentMenu", "admin"]),
  },
};
</script>

<style scoped>
header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}

.l-content {
  display: flex;
  align-items: center;
}
.el-button {
  margin-right: 20px;
}

.r-content .user {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>

<style scoped>
.el-breadcrumb__item .el-breadcrumb__inner {
  color: #666;
  font-weight: normal;
}

.el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: white;
}
</style>
