<template>
  <el-row class="home" :gutter="20">
      <el-col :span="8" style="margin-top: 20px">
          <el-card shadow="hover" class="admin">
              <div class="user">
                  <img :src="user.iconPath">
                  <div class="userInfo">
                      <p class="name">ZhangZ</p>
                      <p class="access">{{user.name}}</p>
                  </div>
              </div>
              <div class="login-info">
                  <p>上次登录时间：<span>{{user.loginTime}}</span></p>
                  <p>上次登录地点：<span>石家庄</span></p>
              </div>
          </el-card>
          <el-card shadow="hover" style="height: 470px; margin-top: 20px;">
              <el-table :data="tableData">
                  <el-table-column 
                    show-overflow-tooltip
                    v-for="(val,index) in tableLabel"
                    :key="index"
                    :prop="index"
                    :label="val">

                  </el-table-column>
              </el-table>
          </el-card>
      </el-col>
      <el-col :span="16" style="margin-top: 20px">
          <div class="right-card-wrapper clearfix">
              <el-card 
                shadow="hover" 
                v-for="(item,index) in countData" 
                :key="index"
                :body-style="{display: 'flex',padding: 0}"
                class="right-card">
                <i 
                    class="icon" 
                    :class="`el-icon-${item.icon}`" 
                    :style="{background: item.color}">
                </i>
                <div class="detail">
                    <p>{{item.value}}</p>
                    <p>{{item.name}}</p>
                </div>
              </el-card>
          </div>
          <el-card shadow="hover" style="margin-top: 20px;height: 280px">

          </el-card>
          <div class="graph">
              <el-card shadow="hover" style="margin-right: 5px;width: 50%;height: 280px"></el-card>
              <el-card shadow="hover" style="width: 50%;height: 280px"></el-card>
          </div>
      </el-col>
  </el-row>
</template>

<script>

  export default {
      
    data() {
        return {
            tableData: [
                {
                    name: 'oppo',
                    todayBuy: 100,
                    monthBuy: 300,
                    totalBuy: 800
                }
            ],
            tableLabel: {
                name: '封禁用户',
                todayBuy: '今日购买',
                monthBuy: '本月购买',
                totalBuy: '总购买'
            },
            countData: [
                {
                    name: '今日注册用户',
                    value: 1234,
                    icon: 'success',
                    color: '#2ec7c9'
                },
                {
                    name: '今日发布文章',
                    value: 210,
                    icon: 'star-on',
                    color: '#ffb980'
                },
                {
                    name: '今日点击量',
                    value: 1234,
                    icon: 's-goods',
                    color: '#5ab1ef'
                },
                {
                    name: '今日注册用户',
                    value: 1234,
                    icon: 'success',
                    color: '#2ec7c9'
                },
                {
                    name: '今日发布文章',
                    value: 210,
                    icon: 'star-on',
                    color: '#ffb980'
                },
                {
                    name: '今日点击量',
                    value: 1234,
                    icon: 's-goods',
                    color: '#5ab1ef'
                }
            ]
        }
    },
    props: ['user']
  }
</script>

<style scoped>
  .admin{
      width: 300px;
      height: 300px;
  }
  .user{
      display: flex;
      align-items: center;
      justify-content: space-between;
  }
  .user img{
      width: 150px;
      height: 150px;
      border-radius: 50%;
  }
  .user .name{
      font-size: 25px;
  }
  .user .access{
      margin-top: -10px;
      font-size: 16px;
      color: #999;
  }

  .login-info{
      margin-top: 20px;
      width: 260px;
      height: 100px;
      border-top: 1px solid #ccc;
      font-size: 14px;
  }
  .login-info p{
      color: #999;
  }
  .login-info p span{
      margin-left: 20px;
      color: #888;
  }

  
  .clearfix::before,.clearfix::after{
      display: table;
      content: '';
      clear: both;
  }
  .right-card{
      float: left;
      width: 250px;
      height: 100px;
      margin-right: 30px;
  }
  i{
      width: 100px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      font-size: 30px;
      color: white;
  }

  .graph{
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
  }

</style>