<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.title" placeholder="文章标题" />
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
      :data="articleList"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" prop="date" label="序号" width="50" />
      <el-table-column prop="articleId" label="文章编号" />
      <el-table-column prop="userId" label="发布者昵称">
        <template slot-scope="scope">
          {{ getNameById(scope.row.userId) }}
        </template>
      </el-table-column>
      <el-table-column prop="userId" label="发布者头像">
        <template slot-scope="scope">
          <img :src="getIconById(scope.row.userId)" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center" />
      <el-table-column prop="content" width="460" label="内容" align="center" />
      <el-table-column
        prop="location"
        label="发布位置"
        align="center"
        width="120"
      />
      <el-table-column prop="starNum" label="收藏数" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.articleId)"
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
  name: "Article",
  data() {
    return {
      current: 1,
      limit: 5,
      searchObj: {},
      userIdList: [],
      articleList: [],
      usersInfo: [],
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
    //  获取文章信息
    getList(page = 1) {
      this.current = page;
      axios
        .post(
          `/publish/getAllPublish/${this.current}/${this.limit}`,
          this.searchObj
        )
        .then(
          (response) => {
            this.articleList = response.data.data.records;
            this.total = response.data.data.total;
            //  得到该页中每个文章的发布者 id
            this.getIdList();
            //  根据发布者 id 获取该页发布者信息
            this.getUserInfos();
          },
          (error) => {
            console.log(error);
          }
        );
    },
    //  得到该页文章所有的用户信息
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
      for (var i = 0; i < this.articleList.length; i++) {
        //  数组去重
        if (idList.indexOf(this.articleList[i].userId) === -1) {
          idList.push(this.articleList[i].userId);
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
    //  根据文章 id 删除文章信息（不是逻辑删除）
    removeDataById(articleId) {
      this.$confirm("此操作将永久删除该文章信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(
        () => {
          axios.delete(`/publish/${articleId}`).then(
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
      this.$confirm("此操作将删除文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(
        () => {
          const idList = [];
          //  遍历得到每个选中的 id 值
          for (let i = 0; i < this.multipleSelection.length; i++) {
            idList.push(this.multipleSelection[i].articleId);
          }
          axios
            .delete(`/publish/batchRemove`, {
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
