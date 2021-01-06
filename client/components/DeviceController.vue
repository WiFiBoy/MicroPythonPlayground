<template> 
  <div>
    <ul class="menu" style="float:right;">
      <li @click="conState('usb')">
        <el-tooltip effect="light" content="USB連接" placement="bottom" :open-delay=700><img :src="usbIcon" class="button"/></el-tooltip>
      </li>
      <li @click="conState('ble')">
        <el-tooltip effect="light" content="BLE藍芽連接" placement="bottom" :open-delay=700><img :src="bleIcon" class="button"/></el-tooltip>
      </li>
      <li @click="conState('wifi')">
        <el-tooltip effect="light" content="WiFi無線連接" placement="bottom" :open-delay=700><img :src="wifiIcon" class="button"/></el-tooltip>
      </li>
    </ul>

    <el-dialog title="請選擇連接方式" :visible="showSelectWays" @close="showSelectWays=false" center>
      <div class="large_btn">
        <img src="/icon/usb_large.png" class="big_btn"  @click="conState('usb')" />
        <img src="/icon/ble_large.png" class="big_btn"  @click="conState('ble')" />
        <img src="/icon/wifi_large.png" class="big_btn" @click="conState('wifi')"/>
      </div>
    </el-dialog>

    <el-dialog title="請選擇連接埠" :visible="dialogVisible" @close="dialogVisible=false" center>
      <div>
        <template v-for="(item,index) in portList">
          <el-button @click="selectPort(index)">{{item}}</el-button><br>
        </template>
      </div>
    </el-dialog>



  </div>
</template>

<script>
let Serial = require('../assets/serial').default;
let Ble = require('../assets/ble').default;

export default {
  name: "DeviceController",
  data () {
    return {
      showSelectWays:false,
      dialogVisible:false,
      //Icon
      wifiIcon:'/icon/wifi.png',
    }
  },
  methods: {
    showDialog(){
      this.dialogVisible = true;
    },
    checkCon(){//connect without Assign
      if(!this.$store.state.isConnected){
        this.showSelectWays = true; 
      }
    },
    conState(mode){
      if(this.$store.state.isConnected){// 检查是否有连接中的Device
        this.disconnect(this.$store.state.connectMode);
      }else{//开始 连接方式
        this.showSelectWays=false;
        switch(mode){
          case 'usb':
            Serial.getDevice(this.$store,this.showDialog());  
            break;
          case 'ble':
            this.connectBLE();
            break;
          case 'wifi':
            console.log("Wi-Fi developing");
            /*
            this.$store.commit('setConnected',true);
            this.$store.commit('setConnectMode','wifi');
            console.log("Wi-Fi conencted");
            */
            break;
        }
      }
    },
    selectPort(index){//for USB
      console.log("connect to "+this.$store.state.devicelist[index]);
      this.dialogVisible = false;
      this.connectUSB(this.$store.state.devicelist[index]);
    },
    connectUSB(deviceName){//for USB
      let myStore = this.$store;
      let tempdata = '';//init tempdata
      var log = function(data){
        if(myStore.state.waitFS!=false){//wait FileSystem 
          tempdata += data;//collect data
          if(tempdata.indexOf(">>> ")!=-1){//End of echo
            tempdata = tempdata.substring(tempdata.indexOf('['),tempdata.indexOf(']')+1);
            switch(myStore.state.waitFS){
              case 'ls':// list dir
                let lsdata ='{'+'"fs"'+':'+tempdata.replace(/'/g,'"')+'}';//toJson
                let fsArray = JSON.parse(lsdata).fs;//extract data
                myStore.commit('setFileSystem', fsArray);//access Vuex
                break;
              case 'edit':
                let eddata ='{'+'"ed"'+':'+tempdata.replace(/'/g,'"')+'}';//toJson
                let codeData = "";
                JSON.parse(eddata).ed.forEach(function(value){//extract json
                  codeData+=String.fromCharCode(value);//bin to str
                });
                eventBus.$emit('fsEdit',codeData);  
                break;
            };
            tempdata = '';//clear tempdata;
            myStore.commit('setWaitFS', false);//close waiting
          }//eventBus.$emit('onReceive',data); //hidden Echo
        }else eventBus.$emit('onReceive',data);
      }
      Serial.connectToPort(myStore,deviceName,log);
    },
    connectBLE(){//for BLE
      var myStore = this.$store;
      var log = function(data){
        eventBus.$emit('onReceive',data);
      }
      Ble.connectBLE(myStore,log);
    },
    disconnect(mode){
      switch(mode){
        case 'usb':
          Serial.disconnect(this.$store);  
          break;
        case 'ble':
          Ble.disconnect(this.$store);
          break;
        case 'wifi':
          /*
          console.log("disconnect from WiFi");
          this.$store.commit('setConnectMode',null);
          this.$store.commit('setConnected',false);
          this.wifiIcon = '/icon/icon.png'
          */
          break;  
        default:
          console.log('current connect mode:'+mode);
          break;
      }
    },
    writeData(data){ 
      Serial.writeSerial(this.$store.state.deviceID,data);
    },
    writeBleData(data){//write data to ble device
      Ble.writeBLE(this.$store.state.rxCharacteristic,data);
    },
    copypaste(deviceID,code){
      Serial.copypaste(deviceID,code)
    },
    hardReset(){
      Serial.hardReset(this.$store.state.deviceID);
    },
    ctrlC(){
      Serial.ctrlC(this.$store.state.deviceID);
    }
  },
  computed: {
    portList:function(){
      return this.$store.state.devicelist;
    },
    usbIcon:function(){
      if(this.$store.state.deviceID!=-1)return '/icon/disconnect.png';
      return '/icon/usb.png';
    },
    bleIcon:function(){
      if(this.$store.state.bleDevice!=null)return '/icon/disconnect.png';
      return '/icon/ble.png';
    },
  },
  created(){  
    eventBus.$on('input', data => {
      this.checkCon();
      switch(this.$store.state.connectMode){
          case 'usb':
            this.writeData(data);
            break;
          case 'ble':
            console.log("Send to ble:",data);
            this.writeBleData(data);
            break;
        }
    }),
    eventBus.$on('cmd', cmd => {
      switch(cmd){
        case 'H':
          this.hardReset();
          break;
        case 'C':
          this.ctrlC();
          break;
        case 'ls'://list 
          this.writeData('import os;os.listdir()\x0d');
          break;
      }
    }),
    eventBus.$on('cp', data => {
      this.checkCon();
      switch(this.$store.state.connectMode){
        case 'usb':
          this.copypaste(this.$store.state.deviceID,data)
          break;
        case 'ble':
          console.log("copy to ble:",data);
          /*
          let dataArray = data.split('\n');
          this.writeBleData('\x05');
          for(let i=0;i<dataArray.length;i++){
            this.writeBleData(dataArray[i]+'\x0d');
          }
          this.writeBleData('\x04');
          */
          break;
      }
    })
  },
  mounted(){

  },
  beforeDestroy:function(){
    this.disconnect(this.$store.connectMode);
  }
  
}
</script>

<style scoped>
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
  filter: opacity(0.9);
}

.button:hover{
  filter: opacity(1.0);
}

.button:active{
  box-shadow: 1px 1px 10px #5FB878 inset;
}

.large_btn{
  text-align: center;
}

.big_btn{
  margin: 10px 20px;
  padding: 15px;
  transition: box-shadow 0.3s;
}

.big_btn:hover{
  box-shadow: 1px 1px 10px #eee;
  background: #FDFDFD;
}

.big_btn:active{
  box-shadow: 1px 1px 10px #ddd inset;
}

</style>