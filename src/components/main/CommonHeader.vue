<template>
  <header>
      <div class="l-content">
          <el-button 
            plain icon="el-icon-menu" 
            size="mini"
            @click="changeAsideState">
          </el-button>
          <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item 
              :to="currentMenu.path"
              v-if="currentMenu">
                {{currentMenu.label}}
            </el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <div class="r-content">
          <el-dropdown trigger="click" size="mini">
              <span class="el-dropdown-link">
                  <img :src="user.iconPath" class="user">
              </span>
               <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
               </el-dropdown-menu>
          </el-dropdown>
      </div>
  </header>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
      name: 'CommonHeader',
      methods:{
          changeAsideState(){
              this.$store.commit('CHANGE_STATE')
          }
      },
      computed: {
          ...mapState(['currentMenu'])
      },
      props: ['user']
  }
</script>

<style scoped>
  header{
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: space-between;
  }
  
  .l-content{
      display: flex;
      align-items: center;
  }
  .el-button{
      margin-right: 20px;
  }

  .r-content .user{
      width: 40px;
      height: 40px;
      border-radius: 50%;
  }
</style>

<style scoped>
 .el-breadcrumb__item .el-breadcrumb__inner{
      color: #666;
      font-weight: normal;  
  }

  .el-breadcrumb__item:last-child .el-breadcrumb__inner{
      color: white;
  }
</style>