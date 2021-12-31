<template>
  <div class="tabs">
      <el-tag
        v-for="(tag,index) in tabsList" 
        :key="tag.name"
        size="small"
        :closable="tag.name !== 'home'"
        :effect="$route.name === tag.name ? 'light' : 'plain'"
        @click="changeMenu(tag)"
        @close="handleClose(tag,index)"
      >
        {{tag.label}}
      </el-tag>
  </div>
</template>

<script>
    import {mapState,mapMutations} from 'vuex'
    export default {
      name: 'CommonTag',
      computed: {
          ...mapState(['tabsList'])
      },
      methods: {
        ...mapMutations({
          close: 'CLOSE_TAG'
        }),
        changeMenu(item){
          this.$router.push({name: item.name})
          this.$store.commit('SELECT_MENU',item)
        },
        handleClose(tag,index){
          //  判断是否是最后一个
          let length = this.tabsList.length-1

          this.close(tag)
          //  第一种情况
          if(tag.name !== this.$route.name){
            return;
          }

          if(index === length){
            //  往左边跳转
            this.$router.push({
              name: this.tabsList[index-1].name
            })
            this.$store.state.currentMenu = this.tabsList[index-1]
          } else {
            //  往右边跳转
            this.$router.push({
              name: this.tabsList[index].name
              
            })
            this.$store.state.currentMenu = this.tabsList[index]

          }
        }
      }
    }
</script>

<style scoped>
  .tabs{
      padding: 20px;
  }
  .el-tag{
      margin-right: 15px;
      cursor: pointer;
  }
</style>