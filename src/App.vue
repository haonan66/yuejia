<template>
  <div id="app">
    <router-link to="/zhuye"></router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  
  export default {
    name: 'App',
  }
</script>

<style>
  html,body,#app{
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>
