<template>
  <div ref="blocklyDiv"></div>
</template>

<script>
let Blockly = require('./blockly/browser.js');

export default {
  name:'blockly',
  data () {
    return {
      workspace:null,
      toolbox:''
    }
  },
  methods: {
    reset(){
      Blockly.getMainWorkspace().clear();
    },
    resize(){
      Blockly.svgResize(this.workspace);
    },
    toXML(){
      var xml = Blockly.Xml.workspaceToDom(this.workspace);
      return Blockly.Xml.domToText(xml);
    },
    toWS(text){// xml to workspace
      var xml = Blockly.Xml.textToDom(text);
      Blockly.Xml.domToWorkspace(xml, this.workspace);
    },
    toCode(){
      return Blockly.Python.workspaceToCode(this.workspace);
    }
  },
  mounted() {
    this.toolbox = Blockly.CustomBlocks;//custom 
    this.workspace = Blockly.inject(this.$refs.blocklyDiv, {
        toolbox: this.toolbox,
        comments: false,
        media: './media/',
        zoom:{
            controls: true,
            wheel: true},
        trashcan:true
    });
    Blockly.svgResize(this.workspace);
    Blockly.getMainWorkspace().setTheme(Blockly.Themes.Dark);
  },
  computed: {

  }
}
</script>

<style scoped>

</style>