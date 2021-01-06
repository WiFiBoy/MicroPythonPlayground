<template>
  <div class="header" onselectstart="return false;">
    <el-row>
      <TitleBar></TitleBar>
    </el-row>
    <el-row id="toolbar">
      <el-col :span="20">
        <ul class="menu">
          <template v-for="(item,index) in menus">
            <router-link :to="item.url">
              <li @click="clickat(index)">
                <el-tooltip  effect="light" :content="item.tips" placement="bottom" :open-delay=500>
                <img :src="'/icon/'+item.img" class="button"/>
                </el-tooltip>
              </li>
            </router-link>
          </template>
        </ul>
      </el-col>
      <el-col :span="4">
        <DeviceController></DeviceController>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DeviceController from './DeviceController';
import TitleBar from './TitleBar'

export default {
  name: "HeaderBar",
  data () {
    return {
      menus:[
        {img:"set1.png",url:"/",tips:"編輯器"},
        {img:"tutorial.png",url:"/tutorial",tips:"學習範例"},
        /*
        {img:"scratch.png",url:"/scratch",tips:"Scratch 3"},
        {img:"cloud.png",url:"/cloud",tips:"雲端分享空間"},
        {img:"game.png",url:"/game",tips:"遊戲學習服務"},
        {img:"hat.png",url:"/hat",tips:"通關挑戰賽"},
        {img:"meeting.png",url:"/meeting",tips:"線上影音教室"},
        {img:"fun.png",url:"/fun",tips:"積木套件設定"},
        
        {img:"fun.png",url:"/fun",tips:"（Blockly測試）"},*/
        {img:"config.png",url:"/setting",tips:"設定"},
        {img:"info.png",url:"/info",tips:"關於 Python Playground"}
      ]
    }
  },
  components: {
    DeviceController,
    TitleBar
  },
  methods: {
    clickat(idx){
      console.log(this.menus[idx].url);
    }
  }
}
</script>

<style scoped>
#toolbar{
  position: relative;
  background: #ffbb00;
  height: 32px;
  padding: 0px;
  overflow: hidden;
}

.menu {
  list-style:none;
  padding:0;
  margin:0;
}

.menu li {
  float:left;
  padding:0;
  margin:0;
  width: 48px;
  height: 32px;
  background: #ffbb00;
}

.button {
  width: 30px;
  height: 30px;
  border: 0px solid;
  padding:0;
  margin:2px;
  box-sizing: border-box;
  transition: box-shadow 0.3s;
  background: #ffbb00;
  text-align: center;
  filter: opacity(0.8);
}

.button:hover {
  filter: opacity(1.0);
}

.button:active {
  box-shadow: 1px 1px 10px #5FB878 inset;
}
</style>
