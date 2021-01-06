<template>
  <div id="app">
    <el-row>
      <HeaderBar></HeaderBar>
    </el-row>
    <el-row id="content">
      <keep-alive include="Home">
        <router-view></router-view>
      </keep-alive>
    </el-row>
    <el-row>
      <StatusBar></StatusBar>
    </el-row>
  </div>
</template>

<script>
  import HeaderBar from './HeaderBar'
  import StatusBar from './StatusBar'

  export default {
    name: 'App',
    data () {
      return {}
    },
    components: {
      HeaderBar,
      StatusBar
    },
    mounted:function(){
      this.$router.push('/');
    }
  }
</script>

<style>
body {
  margin:0;
  overflow: hidden;
}

#app{
  height:100vh;
  width: 100%;
}

#content{
  height:calc(100% - 90px);
  width: 100%;
}
</style>
