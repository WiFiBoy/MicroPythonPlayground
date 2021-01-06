<template>
  <div ref="term"></div> 
</template>

<script>
import { Terminal } from 'xterm'
import 'xterm/dist/xterm.css'
import * as fit from 'xterm/lib/addons/fit/fit';

export default {
  name:'terminal',
  data () {
    return {
      terminal:null,
      greeting:'MicroPython REPL 終端機'
    }
  },
  methods: {
    echo(cmd){
      if(cmd.indexOf("\n")>0){
        var cmdArray = cmd.split('\n');
        //console.log('cmdArray',cmdArray);
        for (var i=0; i<cmdArray.length-1; i++) {
          this.terminal.writeln(cmdArray[i]);
          //console.log('cmdArray['+i+']',cmdArray[i]);
        }
        this.terminal.write(cmdArray[cmdArray.length-1]);
      }else
      this.terminal.write(cmd);
    },
    fit(){
      this.terminal.fit();
    }
  },
  mounted: function () {  
    Terminal.applyAddon(fit);
    this.terminal = new Terminal({
      cursorBlink: true,
      fontSize:16,
      cols: 50,// Set the terminal's width  
      rows: 28 // Set the terminal's height  
    });
    this.terminal.open(this.$refs.term);
    this.terminal.writeln(this.greeting);
    this.terminal.on('data', function(data){
      eventBus.$emit('input',data);
    });
  },
  created(){ 
    eventBus.$on('onReceive', data =>{//receive device reply
      this.echo(data);
    });
  }
  
}
</script>

<style scoped>

</style>