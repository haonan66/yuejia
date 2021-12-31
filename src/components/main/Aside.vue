<template>
    <el-menu 
      class="el-menu-vertical-demo" 
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      >
    <h3>{{title}}</h3>
    <el-menu-item 
      :index="item.path+''" 
      v-for="item in noChildren"
      :key="item.path"
      @click="clickMenu(item)">
      <i :class="'el-icon-'+item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <el-submenu 
      :index="item.path+''" 
      v-for="item in hasChildren" 
      :key="item.path"
      @click="clickMenu(item)">
      <template slot="title">
        <i :class="'el-icon-'+item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="subItem.path+''"
          v-for="subItem in item.children" 
          :key="subItem.path"
          @click="clickMenu(subItem)">
          <i :class="'el-icon-'+subItem.icon"></i>
          <span slot="title">{{subItem.label}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    name: 'Aside',
    data() {
      return {
        menu: [
          {
            //  这里先将 path 设置为 / 完成登录以后再改为 home
            path: '/home',
            name: 'home',
            label: '首页',
            icon: 's-home',
            url: 'Home/Home'
          },
          {
            path: '/article',
            name: 'article',
            label: '文章管理',
            icon: 'video-play',
            url: 'Article/Article'
          },
          {
            label: '用户管理',
            icon: 'user',
            children: [
              {
                path: '/user/list',
                name: 'list',
                label: '用户管理列表',
                icon: 'setting',
                url: 'User/List' 
              },
              {
                path: '/user/add',
                name: 'add',
                label: '用户设置添加',
                icon: 'setting',
                url: 'User/Add'
              }
            ]
          },
        ]
      };
    },
    methods: {
      clickMenu(item){
        this.$store.commit('SELECT_MENU',item)
      }
    },
    computed: {
        noChildren(){
          return this.menu.filter(item => !item.children)
        },
        hasChildren(){
          return this.menu.filter(item => item.children)
        },
        isCollapse(){
          return this.$store.state.isCollapse
        },
        title(){
          return this.isCollapse ? '悦家' : '悦家后台管理系统'
        }
      }
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100%;
  }

  .el-menu{
    border-right: 0px;
    height: 100%;
  }

  h3{
     text-align: center;
     color: white;
  }
</style>