<template>
  <div id="title-bar" @dblclick="">
    <h5 id="title" v-once>{{ title }}</h5>
    <div>
      <ul class="control">
        <li @click="closeWindow">
          <img src="/icon/menu/close.png" class="button"/>
        </li>
        <li @click="maximizeWindow">
          <img src="/icon/menu/max.png" class="button"/>
        </li>
        <li @click="minimizeWindow">
          <img src="/icon/menu/min.png" class="button"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: "TitleBar",
  data () {
    return {
      title: 'WiFiBoy Python Playground | OK:ESP32 v1.02t',
      isWindowing:true,
    }
  },
  methods:{
    closeWindow:function(){
      window.close();
    },
    maximizeWindow:function(){
      if (chrome.app.window.current().isMaximized()==true) 
        chrome.app.window.current().restore();
      else chrome.app.window.current().maximize();
    },
    minimizeWindow:function(){
      chrome.app.window.current().minimize();
    },
    Windowing:function(){
      
    }
  },
  computed:{
    
  },
  created(){
    console.log('userAgent:',navigator.userAgent);
    this.$store.commit('setUserAgent',navigator.platform);
    console.log('platform:',navigator.platform);
  },

}
</script>

<style scoped>
#title-bar{
  text-align: center;
  background: #135175;
  height: 28px;
  -webkit-app-region: drag;
  font-size: 90%;
}

#title{
  text-align: center;
  font-size: 100%;
  line-height: 28px;
  margin:0;
  color:#fff;
  width:calc(100% - 72px);
}

.control{
  -webkit-app-region: no-drag;
  list-style:none;
  padding:0;
  margin:0;
  position:absolute;
  top:0;
  right:0;
}

.control li{
  float:right;
}

.button{
  width: 24px;
  height: 24px;
  border: 0px solid;
  padding:0;  
  box-sizing: border-box;
  transition: box-shadow 0.3s;
}
.button:hover {
  filter: opacity(0.8);
}
.button:active {
  box-shadow: 1px 1px 10px #5FB878 inset;
}

</style>
