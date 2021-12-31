<template>
  <el-container class="home-container">
    <el-aside width="auto">
      <Aside/>
    </el-aside>
    <el-container>
      <el-header>
        <CommonHeader :user="user"/>
      </el-header>
      <CommonTag/>
      <el-main>
        <router-view :user="user"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Aside from '../components/main/Aside'
  import CommonHeader from '../components/main/CommonHeader'
  import CommonTag from '../components/main/CommonTag'
  import axios from 'axios'
  export default {
      name: 'Main',
      components: {Aside,CommonHeader,CommonTag},
      data() {
        return {
          user: {}
        }
      },
      beforeCreate() {
        axios.get('http://localhost:8200/admin/getAdminOfLogin',{headers: {'token':sessionStorage.getItem('token')}}).then(
            response => {
                this.user = response.data.data
                console.log(this.user)
            },
            error => {
                console.log(error.message)
            }
        )
    }
  }
</script>

<style scoped>
  .home-container{
    height: 100%;
  }
  .el-header{
    background-color: #333;
  }
  .el-main{
    padding-top: 0;
  }
</style>