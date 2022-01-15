<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.realName" placeholder="真实姓名" />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()"
        >查询</el-button
      >
    </el-form>
    <el-table :data="identityList" style="width: 100%">
      <el-table-column prop="userId" label="昵称">
        <template slot-scope="scope">
          {{ getNameById(scope.row.userId) }}
        </template>
      </el-table-column>
      <el-table-column prop="userId" label="头像">
        <template slot-scope="scope">
          <img :src="getIconById(scope.row.userId)" />
        </template>
      </el-table-column>
      <el-table-column prop="userId" label="性别">
        <template slot-scope="scope">
          {{ getSexById(scope.row.userId) === 1 ? "男" : "女" }}
        </template>
      </el-table-column>
      <el-table-column prop="userId" label="手机号">
        <template slot-scope="scope">
          {{ getPhoneById(scope.row.userId) }}
        </template>
      </el-table-column>
      <el-table-column prop="realName" label="真实姓名"> </el-table-column>
      <el-table-column prop="idcard" label="身份证号"> </el-table-column>
      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            icon="el-icon-success"
            @click="identity(scope.row.id, scope.row.userId, 2)"
            >同意认证</el-button
          >
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="identity(scope.row.id, scope.row.userId, 0)"
            >拒绝认证</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--    分页-->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      background
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Identity",
  data() {
    return {
      current: 1,
      limit: 5,
      searchObj: {},
      userIdList: [],
      identityList: [],
      usersInfo: [],
      total: 0,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //  获取认证者信息
    getList(page = 1) {
      this.current = page;
      axios
        .post(
          `/user/userManager/findPageIdentity/${this.current}/${this.limit}`,
          this.searchObj
        )
        .then(
          (response) => {
            this.identityList = response.data.data.records;
            this.total = response.data.data.total;
            //  得到该页中每个认证的发布者 id
            this.getIdList();
            //  根据发布者 id 获取该页发布者信息
            this.getUserInfos();
          },
          (error) => {
            console.log(error);
          }
        );
    },
    //  得到该页认证的所有的用户信息
    getUserInfos() {
      axios
        .post(`/user/userManager/getUserSByIdList`, this.userIdList, {
          headers: { "content-type": "application/json" },
        })
        .then(
          (response) => {
            if (response.data.data) {
              this.usersInfo = response.data.data;
            }
          },
          (error) => {
            console.log(error);
          }
        );
    },
    //  得到所有的用户 id
    getIdList() {
      const idList = [];
      for (var i = 0; i < this.identityList.length; i++) {
        //  数组去重
        if (idList.indexOf(this.identityList[i].userId) === -1) {
          idList.push(this.identityList[i].userId);
        }
      }
      this.userIdList = idList;
    },
    //  根据 id 获取用户昵称
    getNameById(id) {
      for (var i = 0; i < this.usersInfo.length; i++) {
        if (this.usersInfo[i].userId == id) {
          return this.usersInfo[i].name;
        }
      }
    },
    //  根据 id 获取用户头像
    getIconById(id) {
      for (var i = 0; i < this.usersInfo.length; i++) {
        if (this.usersInfo[i].userId == id) {
          return this.usersInfo[i].iconPath;
        }
      }
    },
    //  根据 id 获取性别
    getSexById(id) {
      for (var i = 0; i < this.usersInfo.length; i++) {
        if (this.usersInfo[i].userId == id) {
          return this.usersInfo[i].sex;
        }
      }
    },
    //  根据 id 获取手机号
    getPhoneById(id) {
      for (var i = 0; i < this.usersInfo.length; i++) {
        if (this.usersInfo[i].userId == id) {
          return this.usersInfo[i].phone;
        }
      }
    },
    //  同意认证
    identity(tid, id, status) {
      let userInfo = {};
      let tig = "";
      let message = "";
      let type = "";
      if (status === 2) {
        tig = "同意";
        message = "认证成功!";
        type = "success";
      } else {
        tig = "拒绝";
        message = "认证失败!";
        type = "error";
      }

      for (var i = 0; i < this.usersInfo.length; i++) {
        if (this.usersInfo[i].userId == id) {
          if (status === 2) {
            // 同意认证 identityStatus = 2
            this.usersInfo[i].identityStatus = 2;
            this.usersInfo[i].identity = 1;
          } else {
            // 拒绝认证 identityStatus = 0
            this.usersInfo[i].identityStatus = 0;
          }
          userInfo = this.usersInfo[i];
        }
      }
      this.$confirm("此操作将" + tig + "认证，是否继续操作？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(
        () => {
          axios.post(`/user/userManager/updateUser`, userInfo).then(
            // eslint-disable-next-line no-unused-vars
            (response) => {
              //  提示
              this.$message({
                type: type,
                message: message,
              });
              if (status === 0) {
                axios
                  .delete(`/user/userManager/identity/${tid}`)
                  // eslint-disable-next-line no-unused-vars
                  .then((response) => {});
              }
              //  刷新页面
              this.getList(this.current);
            }
          );
        },
        (error) => {
          console.log(error.message);
        }
      );
    },
  },
};
</script>

<style scoped>
img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
