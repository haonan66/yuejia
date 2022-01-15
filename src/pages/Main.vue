<template>
  <el-container class="home-container">
    <el-aside width="auto">
      <Aside />
    </el-aside>
    <el-container>
      <el-header>
        <CommonHeader />
      </el-header>
      <CommonTag />
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "../components/main/Aside";
import CommonHeader from "../components/main/CommonHeader";
import CommonTag from "../components/main/CommonTag";
import axios from "axios";
export default {
  name: "Main",
  components: { Aside, CommonHeader, CommonTag },
  beforeCreate() {
    axios
      .get("/admin/getAdminOfLogin", {
        headers: { token: sessionStorage.getItem("token") },
      })
      .then(
        (response) => {
          //  将 admin 信息保存到 vuex 中的 state 中
          this.$store.commit("UPDATE_ADMIN", response.data.data);
        },
        (error) => {
          console.log(error.message);
        }
      );
  },
};
</script>

<style scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #333;
}
.el-main {
  padding-top: 0;
}
</style>
