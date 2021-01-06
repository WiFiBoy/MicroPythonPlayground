<template>
    <vue-splitter ref="splitter" :margin="20" @resize="resizeBlock">
      <div slot="left-pane" ref="leftWork">
        <el-row class="toolbar" onselectstart="return false;">
          <el-col :span="8">
            <ul class="menu">
              <li @click="switchMode">
                <el-tooltip effect="light" :content="swichTips" placement="top" :open-delay=700>
                  <img :src="'/icon/'+swichIcon+'.png'" class="button"/>
                </el-tooltip>
              </li>
              <li @click="swichEditorOnly">
                <el-tooltip effect="light" content="Python程式編輯" placement="top" :open-delay=700>
                  <img src="/icon/edit2.png" class="button"/>
                </el-tooltip>
              </li>
            </ul>
          </el-col>
          <el-col :span="16">
            <ul class="menu" style="float:right;">
              <template v-for="(item,index) in menus">
                <li @click="clickAt(index)">
                  <el-tooltip effect="light" :content="item.tips" placement="top" :open-delay=700>
                    <img :src="'/icon/'+item.img" class="button"/>
                  </el-tooltip>
                </li>
              </template>
            </ul>   
          </el-col>
        </el-row>
        <el-row >
          <div v-on:keyup.ctrl.82="runCode" v-show="!isOnlyEditor">
            <blocklyEditor ref="main"></blocklyEditor>
          </div>
          <div v-on:keyup.ctrl.82="runCode" v-show="isOnlyEditor">
            <editor ref="editor" theme="eclipse"></editor>
          </div>
        </el-row>
      </div>
      <div v-on:keyup.ctrl.82="runCode" slot="right-pane" style="background:black">
        <terminal ref="terminal" style="height:calc(100% - 10px)"></terminal>
      </div>
    </vue-splitter>

</template>
<script>
let fileSystem = require('../../assets/fileSystem.js').default;
import VueSplitter from "@rmp135/vue-splitter"
import editor from './editor'
import terminal from './terminal'
import blocklyEditor from './blocklyEditor'

export default {
  name:'playground',
  data () {
    return {
      isOnlyEditor:false,
      swichIcon:'blockly3',
      swichTips:"積木編輯",
      menus:[
        {img:"open2.png",tips:"從電腦讀入"},
        {img:"save2.png",tips:"存入電腦"},
        {img:"run2.png",tips:"送上開發板執行"},
        {img:"savedb3.png",tips:"上傳存入開發板"},
        {img:"trashcan3.png",tips:"清除編輯中程式"},
        {img:"f14-2.png",tips:"縮小字體"},
        {img:"f16-2.png",tips:"放大字體"}],
      currentTabComponent:null,
      defaultFileName:null,
    };
  },
  components: {
    VueSplitter,
    editor,
    terminal,
    blocklyEditor
  },
  methods:{
    clickAt(idx){
      switch(idx){
        case 0:
          this.openfile();
          break;
        case 1:
          this.savefile();
          break;
        case 2:
          this.runCode();
          break;
        case 3:
          this.saveCode();
          break;
        case 4:
          this.clearCode();
          break;
        case 5:
          this.setfont14();
          break;
        case 6:
          this.setfont16();
          break;
      }
    },
    switchMode(){
      var vm = this;
      if(this.isOnlyEditor===true){//from onlyEditor
        this.isOnlyEditor=false;
        this.$nextTick(() => {
          this.$refs.main.resize();
        });
      }
      else{
        if(this.swichIcon =='code2'){//switch to Blockly
          if(this.$refs.main.codeCompare()){
            this.$confirm('返回Blockly將會讓Code消失，確定返回?', '提示', {
              confirmButtonText: '確定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              this.$message({
                type: 'success',
                message: 'Code覆蓋'
              });
              this.$refs.main.setMode(true);
              this.swichTips = '積木編輯';
              this.swichIcon= 'blockly3';
              this.$nextTick(() => {
                this.$refs.main.resize();
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消返回'
              });
            });
          }else{
            this.swichTips = '積木編輯';
            this.swichIcon = 'blockly3';
            this.$refs.main.setMode(true);
            this.$nextTick(() => {
              this.$refs.main.resize();
            });
          }
        }else{// switch to Editor
          this.swichTips = '積木程式';
          this.swichIcon = 'code2';
          this.$refs.main.setMode(false);
          this.$refs.main.codeToEditor();
        }
      }
    },
    clearCode(){
      this.$confirm('確定清除程式?', '提示', {
              confirmButtonText: '確定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              this.$message({
                type: 'success',
                message: '清除程式'
              });
              if(!this.isOnlyEditor){ //not only editor
                this.$refs.main.resetBlockly();
              }else{
                this.$refs.editor.setCode('');
              }
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消返回'
              });
            });
    },
    setfont14(){
      this.$refs.editor.setFont1();
      this.$refs.main.setFont1();
    },
    setfont16(){
      this.$refs.editor.setFont2();
      this.$refs.main.setFont2();
    },
    openfile(){
      this.$confirm('讀入新程式會覆蓋程式?', '提示', {
              confirmButtonText: '確定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              this.$message({
                type: 'success',
                message: '清除程式'
              });
              if(!this.isOnlyEditor){//not only editor
                var result = this.$refs.main.getMode();
                var target = this.$refs.main.targetObjcet();
                this.$refs.main.resetBlockly();
                fileSystem.openFile(result,target);
              } else {
                //this.$refs.editor.setCode('');
                fileSystem.openFile(false,this.$refs.editor);
              }
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消返回'
              });
            });
    },
    savefile(){
      if(this.isOnlyEditor!==true)//not only editor
        fileSystem.saveFile(this.$refs.main.getMode(),this.$refs.main.exportFile());
      else fileSystem.saveFile(false,this.$refs.editor.getCode());
    },
    runCode(){
      let code ='';
      let sendCode='';
      if(!this.isOnlyEditor)code = this.$refs.main.getCode();
      else code = this.$refs.editor.getCode();
      // test by derek
      let codeData = code.split('\n');
      for(var i=0;i<codeData.length;i++){
        sendCode += codeData[i]+'\n';//add newline
      }
      eventBus.$emit('cp',sendCode);//prevent MemoryError
      //eventBus.$emit('cp',code);
    },
    saveCode(){
      if(this.$store.state.isConnected){
        this.openSaveName();
      }else eventBus.$emit('input',''); //for check connection
    },
    resizeBlock(){
      if(this.$refs.main.getMode()!==false)this.$refs.main.resize();
      //console.log(this.$refs.leftWork.offsetWidth)
      this.$refs.terminal.fit();
    },
    swichEditorOnly(){
      if(this.isOnlyEditor)this.isOnlyBlockly=false;
      else this.isOnlyEditor=true;
    },
    openSaveName(){
      console.log('openSaveName');
      var that = this;
      this.$prompt('請輸入文件名', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      }).then(({value}) => {
        this.$message({ type: 'success', message: '你的文件名: ' + value });
        that.saveDevice(value);
      }).catch(() => {
        this.$message({ type: 'info',message: '取消輸入'});       
      });
    },
    saveDevice(fileName){
      let code ='';
      if(!this.isOnlyEditor)code = this.$refs.main.getCode();
      else code = this.$refs.editor.getCode();
      //console.log(code); //test by derek
      
      let codeData = code.split('\n');
      let sendCode = 'newfile = open("'+fileName+'", "w")\n';//File Object
      
      for(var i=0;i<codeData.length;i++){
        sendCode+= 'newfile.write("'+codeData[i]+'\\n")\n';
      }
      sendCode+= 'newfile.close()\n';
      sendCode+= 'del newfile\n';//del object 
      
      eventBus.$emit('cp',sendCode);//prevent MemoryError
      /*
      let codeData = code.split('\n');
      let sendCode = 'newfile = open("'+fileName+'", "wb")\x0d';//File Object
      for(var i=0;i<codeData.length;i++){
        let ByteCode = "[";
        for(var j=0;j<codeData[i].length;j++){//each line
          ByteCode+=(codeData[i][j].charCodeAt(0)+',');//str to bin
        }
        ByteCode += ('$$$\n'.charCodeAt(0)+']');//add newline
        sendCode+= 'newfile.write(bytes('+ByteCode+'))\x0d';
      }
      sendCode+= 'newfile.close()\x0d';
      sendCode+= 'del newfile\x0d';//del object 
      eventBus.$emit('cp',sendCode);//prevent MemoryError
      */
    }
  }, 
  watch:{
    isOnlyEditor(currentMode){
      if(currentMode===true){// editor
        this.$nextTick(() => {
          this.$refs.editor.refresh();
        });
      }
    }
  },
  created(){
    eventBus.$on('fsEdit', data => {
      this.swichEditorOnly();
      if(data.code!=undefined){
        let code = data.code;
        this.$refs.editor.setCode(code);
        console.log('fsEdit:',data.fileName);
      }else this.$refs.editor.setCode(data);
      this.$refs.editor.setKeyTab(); // added by Derek 0711
    });

    let that = this;
    window.onresize = function termHeight() {
      that.$refs.terminal.fit();
    };
    
  },
  mounted(){//default left part 70%
    this.$refs.splitter.percent = 70;
    this.$nextTick(() => {
      this.$refs.main.resize();
      this.$refs.terminal.fit();
    }); 
  },
  activated(){//route back to blockly
    if(this.isOnlyEditor==false){
      if(this.$refs.main.getMode()){
        this.$nextTick(() => {
          this.$refs.main.resize();
        })
      }
    }else this.$refs.editor.refresh();
  }
}

</script>

<style scoped>
div {
  height:calc(100% - 26px);
}

.toolbar{
  position: relative;
  background: #454545;
  height: 32px;
  padding: 0px;
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
    width: 71px;
    height: 32px;
    background: #454545;
}

.button {
    width: 71px;
    height: 32px;
    border: 0px solid;
    padding:0;  
    margin:0px;
    box-sizing: border-box;
    transition: box-shadow 0.3s;
    filter: opacity(0.8);
    text-align: center;

}
.button:hover {
    filter: opacity(1.0);
}
.button:active {
    box-shadow: 1px 1px 10px #95A5A6 inset;
}
</style>
