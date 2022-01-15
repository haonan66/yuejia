<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.name" placeholder="用户昵称" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchObj.userCode" placeholder="用户编号" />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()"
        >查询</el-button
      >
    </el-form>
    <!--    工具条-->
    <div>
      <el-button type="danger" size="mini" @click="removeRows()"
        >批量删除</el-button
      >
    </div>
    <el-table
      :data="list"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" prop="date" label="序号" width="50" />
      <el-table-column prop="userCode" label="用户编号" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="name" label="昵称" />
      <el-table-column prop="sex" label="性别">
        <template slot-scope="scope">
          {{ scope.row.sex === 1 ? "男" : "女" }}
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="iconPath" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.iconPath" />
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? "可用" : "不可用" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.userId)"
            >删除</el-button
          >
          <el-button
            v-if="scope.row.status == 1"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="banUser(scope.row.userId, 0)"
            >封禁</el-button
          >
          <el-button
            v-if="scope.row.status == 0"
            type="primary"
            size="mini"
            icon="el-icon-delete"
            @click="banUser(scope.row.userId, 1)"
            >解封</el-button
          >
          <router-link :to="'/user/edit/' + scope.row.userId">
            <el-button type="primary" size="mini" icon="el-icon-edit" />
          </router-link>
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
  data() {
    return {
      current: 1,
      limit: 5,
      searchObj: {},
      list: [],
      total: 0,
      multipleSelection: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //  获取选择复选框的 id 值
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
    },
    banUser(id, status) {
      var ban = "";
      if (status === 1) {
        ban = "解封";
      } else {
        ban = "封禁";
      }
      this.$confirm("此操作将" + ban + "该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        axios.put(`/user/userManager/banUser/${id}/${status}`).then(
          // eslint-disable-next-line no-unused-vars
          (response) => {
            this.$message({
              type: "success",
              message: ban + "成功!",
            });
            this.getList(this.current);
          },
          (error) => {
            console.log(error.message);
          }
        );
      });
    },
    //  用户管理列表
    getList(page = 1) {
      this.current = page;
      axios
        .post(
          `/user/userManager/findPage/${this.current}/${this.limit}`,
          this.searchObj
        )
        .then(
          (response) => {
            this.list = response.data.data.records;
            this.total = response.data.data.total;
          },
          (error) => {
            console.log(error.message);
          }
        );
    },
    //  删除指定用户的方法
    removeDataById(id) {
      this.$confirm("此操作将永久删除该用户信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(
        () => {
          axios.delete(`/user/userManager/${id}`).then(
            // eslint-disable-next-line no-unused-vars
            (response) => {
              //  提示
              this.$message({
                type: "success",
                message: "删除成功!",
              });
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
    //  批量删除的方法
    removeRows() {
      this.$confirm("此操作将永久删除用户信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(
        () => {
          const idList = [];
          //  遍历得到每个选中的 id 值
          for (let i = 0; i < this.multipleSelection.length; i++) {
            idList.push(this.multipleSelection[i].userId);
          }
          axios
            .delete(`/user/userManager/batchRemove`, {
              data: idList,
            })
            .then(
              // eslint-disable-next-line no-unused-vars
              (response) => {
                //  提示
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
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
