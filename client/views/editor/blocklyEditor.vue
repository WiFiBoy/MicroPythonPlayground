<template>
  <div>
    <div v-show="isBlocklyMode">
      <blockly ref="blockly" style="height:calc(100vh - 122px)"></blockly>
    </div>
    <div v-show="!isBlocklyMode">
        <editor ref="editor" theme="monokai"></editor>
    </div>
  </div>
</template>
<script>
import editor from './editor'
import blockly from './blockly'

export default {
  name:'blocklyEditor',
  data () {
    return {
      isBlocklyMode:true,//default blockly
    };
  },
  components: {
    editor,
    blockly
  },
  methods:{
    resetBlockly(){
      this.$refs.blockly.reset(); // added by Derek 0711
    },
    getMode(){
      return this.isBlocklyMode;
    },
    setMode(isbool){
      this.isBlocklyMode = isbool; 
    },
    codeCompare(){//not same return true
      return this.$refs.editor.getCode()!=this.$refs.blockly.toCode();
    },
    codeToEditor(){
      this.$refs.editor.setCode(this.$refs.blockly.toCode());
    },
    getCode(){
      if(this.isBlocklyMode)return this.$refs.blockly.toCode();
        else return this.$refs.editor.getCode();
    },
    exportFile(){
      if(this.isBlocklyMode)return this.$refs.blockly.toXML();//save as .pyb
      else return this.$refs.editor.getCode();//save as .py
    },
    targetObjcet(){
      if(this.isBlocklyMode)return this.$refs.blockly;//read .pyb
      else return this.$refs.editor;//read .py
    },
    setFont1(){
      this.$refs.editor.setFont1();
    },
    setFont2(){
      this.$refs.editor.setFont2();
    },
    resize(){
      this.$refs.blockly.resize();
    }
  },
  watch:{
    isBlocklyMode(currentMode){
      if(currentMode===false){// editor
        this.$nextTick(() => {
          this.$refs.editor.refresh();
        });
      }
    }
  }
}

</script>

</style>
