<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.name" placeholder="装修队名称" />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()"
        >查询</el-button
      >
      <el-button type="primary" icon="el-icon-search" @click="getNoAccredited()"
        >查询所有未授权装修队</el-button
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
      <el-table-column type="selection" />
      <el-table-column prop="tid" label="编号" width="60" />
      <el-table-column
        prop="icon"
        label="装修队图标"
        class="icon"
        align="center"
      >
        <template slot-scope="scope">
          <img :src="scope.row.icon" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="装修队名称" align="center" />
      <el-table-column prop="userId" label="负责人昵称">
        <template slot-scope="scope">
          {{ getNameById(scope.row.userId) }}
        </template>
      </el-table-column>
      <el-table-column prop="realName" label="真实姓名" />
      <el-table-column
        prop="idCard"
        label="负责人身份证"
        width="160"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="location"
        label="位置"
        width="160"
        align="center"
      ></el-table-column>
      <el-table-column prop="star" label="评分" align="center" width="160">
        <template slot-scope="scope">
          <el-rate v-model="scope.row.star" disabled text-color="#ff9900">
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column prop="isAccredited" label="授权信息" width="80">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isAccredited === 1" type="success"
            >已授权</el-tag
          >
          <el-tag v-if="scope.row.isAccredited === 0" type="danger"
            >未授权</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="240">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.isAccredited === 0"
            type="success"
            size="mini"
            icon="el-icon-edit"
            @click="accredited(scope.row)"
            >点击授权</el-button
          >
          <el-button
            v-if="scope.row.isAccredited === 1"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="accredited(scope.row)"
            >取消授权</el-button
          >
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.tid)"
            >删除</el-button
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
  name: "TeamList",
  data() {
    return {
      current: 1,
      limit: 5,
      searchObj: {},
      list: [],
      usersInfo: [],
      userIdList: [],
      total: 0,
      multipleSelection: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
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
    handleSelectionChange(selection) {
      this.multipleSelection = selection;
    },
    removeRows() {
      this.$confirm("此操作将永久删除装修队信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(
        () => {
          const idList = [];
          //  遍历得到每个选中的 id 值
          for (let i = 0; i < this.multipleSelection.length; i++) {
            idList.push(this.multipleSelection[i].tid);
          }
          console.log(idList);
          axios
            .delete(`/team/batchRemove`, {
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
    getList(page = 1) {
      this.current = page;
      axios
        .post(
          `/team/findPageTeam/${this.current}/${this.limit}`,
          this.searchObj
        )
        .then(
          (response) => {
            this.list = response.data.data.records;
            this.total = response.data.data.total;
            //   id
            this.getIdList();
            //  根据发布者 id 获取该页发布者信息
            this.getUserInfos();
          },
          (error) => {
            console.log(error.message);
          }
        );
    },
    //  得到所有的用户 id
    getIdList() {
      const idList = [];
      for (var i = 0; i < this.list.length; i++) {
        //  数组去重
        if (idList.indexOf(this.list[i].userId) === -1) {
          idList.push(this.list[i].userId);
        }
      }
      this.userIdList = idList;
    },
    removeDataById(id) {
      this.$confirm("此操作将永久删除该装修队信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(
        () => {
          axios.delete(`/team/${id}`).then(
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
    accredited(team) {
      let tip = "";
      tip = team.isAccredited === 1 ? "取消授权" : "授权";
      this.$confirm("是否要" + tip + "该装修队?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let message = "";
        if (team.isAccredited === 0) {
          //  如果isAccredited为0，代表未授权，如果是已经授权，那么则应该将用户的identity设为2.
          //  代表是装修队队长。
          const user = this.getUserById(team.userId);
          user.identity = 2;
          axios.post(`/user/userManager/updateUser`, user).then(
            (response) => {
              console.log(response.data);
            },
            (error) => {
              console.log(error.message);
            }
          );
        } else {
          //  否则既然该用户能够创建装修队那么该用户肯定也是装修队成员，防止重复操作
          const user = this.getUserById(team.userId);
          user.identity = 1;
          axios.post(`/user/userManager/updateUser`, user).then(
            (response) => {
              console.log(response.data);
            },
            (error) => {
              console.log(error.message);
            }
          );
        }
        team.isAccredited = team.isAccredited === 1 ? 0 : 1;
        message = team.isAccredited === 1 ? "授权成功！" : "取消授权成功!";

        axios.post("/team/updateTeam", team).then(
          (response) => {
            if (response.data.ok) {
              //  提示
              this.$message({
                type: "success",
                message: message,
              });
              //  刷新页面
              this.getList(this.current);
            }
          },
          (error) => {
            console.log(error.message);
          }
        );
      });
    },
    getNoAccredited() {
      this.searchObj.isAccredited = 0;
      this.getList();
    },
    //  根据 id 获取用户
    getUserById(id) {
      for (var i = 0; i < this.usersInfo.length; i++) {
        if (this.usersInfo[i].userId == id) {
          return this.usersInfo[i];
        }
      }
    },
    //  根据 id 获取用户昵称
    getNameById(id) {
      for (var i = 0; i < this.usersInfo.length; i++) {
        if (this.usersInfo[i].userId == id) {
          return this.usersInfo[i].name;
        }
      }
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
