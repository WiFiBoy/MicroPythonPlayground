<template>
  <div id="status-bar">
    <el-col :span="12">
      <span id="status">{{status}}</span>
    </el-col>
    <el-col :span="12">
      <div v-show="showTool">
        <ul class="menu">
        <li @click="ctrlc">
            <el-tooltip effect="light" content="Ctrl-C 中斷程式" placement="top" :open-delay=700>
                <img src="/icon/break.png" class="button"/>
            </el-tooltip>
          </li>
          <li @click="fileSystem">
            <el-tooltip effect="light" content="開發板檔案管理" placement="top" :open-delay=700>
                <img src="/icon/file.png" class="button"/>
            </el-tooltip>
          </li>
          <li @click="hardreset">
            <el-tooltip effect="light" content="硬體重置(Hard Reset)" placement="top" :open-delay=700>
                <img src="/icon/reset.png" class="button"/>
            </el-tooltip>
          </li>
        </ul>
      </div>
    </el-col>

    <el-dialog title="文件系統" :visible="dialogVisible" @close="closeDialog()" center>
      <template v-for="(item,index) in fileSystemList">
        <el-row class="filelog">
          <el-radio-group v-model="radio">
            <el-radio-button :label="index">{{item}}</el-radio-button>
          </el-radio-group>
        </el-row>
      </template>
      <span slot="footer">
         <el-button-group>
          <el-button type="primary" @click="fsDownload()">下載</el-button>
          <el-button type="success" @click="fsRun()">執行</el-button>
          <el-button type="info" @click="fsEdit()">編輯</el-button>
          <el-button type="warning" @click="fsRename()">重命名</el-button>
          <el-button type="danger" @click="fsDelete()">刪除</el-button>
        </el-button-group>
      </span>
    </el-dialog>

  </div>
</template>

<script>

export default {
  name: "StatusBar",
  data () {
    return {
      status:"Ready!",
      dialogVisible:false,
      radio:0//current select file
    }
  },
  methods:{
    ctrlc:function(){
      eventBus.$emit('cmd','C');
    },
    hardreset:function(){
      eventBus.$emit('cmd','H');
    },
    closeDialog:function(){
      this.dialogVisible=false;
      if(this.$store.state.waitFS=='ls'){
        this.$store.commit('setWaitFS',false);
      }
    },
    fileSystem:function(){
      this.$store.commit('setWaitFS', 'ls');
      eventBus.$emit('cmd','ls');
      this.dialogVisible=true;
    },
    fsDownload:function(){//TODO
      let index = this.radio; 
      console.log('Download File:'+this.$store.state.fileSystem[index]);
      this.dialogVisible=false;
    },
    fsRun:function(){//Run file
      let index = this.radio; 
      console.log('Run File:'+this.$store.state.fileSystem[index]);
      var fileName = this.$store.state.fileSystem[index].split('.')[0];
      eventBus.$emit('input','import '+fileName+'\x0d');
    },
    fsEdit:function(){//TODO
      let diskFile = this.$store.state.fileSystem[this.radio]; 
      this.$store.commit('setWaitFS','edit');
      console.log('Edit File:'+diskFile);
      eventBus.$emit('input',"list(open('"+diskFile+"','rb').read())\x0d");
      this.dialogVisible=false;
    },
    fsRename:function(){
      let index = this.radio; 
      console.log('Rename File:'+this.$store.state.fileSystem[index]);
      let fileName = this.$store.state.fileSystem[index];
      this.openRename(fileName);
    },
    fsDelete:function(){
      let index = this.radio; 
      console.log('Delete File:'+this.$store.state.fileSystem[index]);
      let fileName = this.$store.state.fileSystem[index];
      this.openDelete(fileName);
    },
    openRename(fileName){
      let currentList = this.$store.state.fileSystem;
      this.$prompt('請輸入新的名字', '重命名', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        inputValue:fileName,
        //inputPattern: /[\w!#$%&'*+=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/, //regexp check input
      }).then(({ value }) =>{ 
        if(currentList.indexOf(value)==-1){//check repeat name
          eventBus.$emit('input','\x0dos.rename("'+fileName+'","'+value+'")\x0d');
          this.$message({
            type: 'success',
            message: '重命名為 ' + value        
          });
          this.fileSystem();
        }else{
          this.$message({
            type: 'warning',
            message: '重複名稱 ' + value         
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消輸入'
        });       
      });
      
    },
    openDelete(fileName) {
      this.$confirm('此操作將刪除文件,是否繼續?', '刪除', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        eventBus.$emit('input','\x0dos.remove("'+fileName+'")\x0d');
        this.$message({
          type: 'success',
          message: '刪除成功！'
        });
        this.fileSystem();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消刪除'
        });          
      });
    }
  },
  created(){
    eventBus.$on('status', data => {
      this.status = data;
    })
  },
  computed:{
    showTool(){
      return this.$store.state.isConnected;
    },
    fileSystemList(){
      return this.$store.state.fileSystem;
    }
  }
}

</script>

<style scoped>
#status-bar{
  background: #206140;
  color: #fff;
  height: 30px;
  width: 100%;
  -webkit-app-region:drag;
}

#status{
  margin-left: 10px;
  font-size: 90%;
  line-height: 27px;
}

.menu {
  list-style:none;
  padding:0;
  margin:0;
  float:right;
  -webkit-app-region: no-drag;
}

.menu li {
  float:left;
  padding:0;
  margin:0;
  width: 30px;
  height: 30px;
}

.button {
  width: 24px;
  height: 24px;
  border: 0px solid;
  padding:0;
  margin:3px;
  box-sizing: border-box;
  transition: box-shadow 0.3s;
  text-align: center;
  filter: opacity(0.7);
}

.button:hover {
  filter: opacity(1.0);
}

.button:active {
  box-shadow: 1px 1px 10px #5FB878 inset;
}

.filelog{
  margin-top: 5px; 
  text-align: center;
}

</style>
