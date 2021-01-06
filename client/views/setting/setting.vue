<template>
  <el-container>
    <el-aside width="220px">
      <el-menu default-active="About" :router="true"  background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <template v-for="item in menus">
            <el-menu-item :index="item.name" :route="{path:item.url}">
              <i :class="item.ico"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </template>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main> 
  </el-container>
</template>
<script>

export default {
  data () {
    return {
      menus:[
        {name:"General",ico:"el-icon-news",url:"/setting/general"},
        {name:"Fonts",ico:"el-icon-view",url:"/setting/fontsize"},
        {name:"Communications",ico:"el-icon-service",url:"/setting/communications"},
        {name:"Device",ico:"el-icon-mobile-phone",url:"/setting/device"}
      ]
    }
  },
  mounted:function(){
    this.$router.push('/setting/general');
  }
}
</script>

<style scoped>

.el-container{
  height: 100%;
}

.el-menu{
  height: 100%;
}
</style>