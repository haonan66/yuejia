<template>
  <el-container class="home-container">
    <el-aside width="auto">
      <Aside/>
    </el-aside>
    <el-container>
      <el-header>
        <CommonHeader/>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Aside from '../components/main/Aside'
  import CommonHeader from '../components/main/CommonHeader'
  export default {
      name: 'Main',
      components: {Aside,CommonHeader}
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