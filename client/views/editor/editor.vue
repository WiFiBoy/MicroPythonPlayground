<template>
    <textarea ref="textarea"></textarea>
</template>
<script>
import CodeMirror from 'codemirror/lib/codemirror.js'
import 'codemirror/lib/codemirror.css'
// language
import 'codemirror/mode/python/python.js'
// theme css
//import 'codemirror/theme/base16-dark.css' 
import 'codemirror/theme/monokai.css' 
//
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/xml-fold.js'
import 'codemirror/addon/fold/indent-fold.js'
import 'codemirror/addon/fold/markdown-fold.js'
import 'codemirror/addon/fold/comment-fold.js'
import 'codemirror/addon/fold/foldgutter.css'
//import 'codemirror/theme/duotone-light.css' 
//import 'codemirror/theme/neat.css' 

export default {
    name:'editor',
    props: ['theme'],
    data(){
        return {
           codemirror: null,
           fsize:16,
        }
    },
    methods: {
        setKeyTab(){
            this.codemirror.setOption("extraKeys", {
                Tab: function(cm) {
                    var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
                    cm.replaceSelection(spaces, "end", "+input");
                }
            });
        },
        getCode(){
            return this.codemirror.getValue();
        },
        setCode(code){
            this.codemirror.setValue(code);
        },
        setFont1(){
            this.fsize -= 1;
            if (this.fsize<12) this.fsize=12;
            this.codemirror.getWrapperElement().style["font-size"] = this.fsize+"px";
            this.codemirror.refresh();
        },
        setFont2(){
            this.fsize += 1;
            if (this.fsize>40) this.fsize=40;
            this.codemirror.getWrapperElement().style["font-size"] = this.fsize+"px";
            this.codemirror.refresh();
        },
        refresh(){
            this.codemirror.refresh();
        }
    },
    mounted() {
        this.codemirror = CodeMirror.fromTextArea(this.$refs.textarea,{ 
            mode: {
                name: "python",
                version: 3,
                singleLineStringErrors: false
            },
            lineNumbers: true,
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
            theme: "monokai",
            matchBrackets: true,
            viewportMargin: Infinity,
            indentUnit: 4,
            indentWithTabs: false,
            autofocus:true
        });
        this.codemirror.getWrapperElement().style["font-size"] = "16px";
    }
}
</script>

<style>

.CodeMirror {
  border: 0px solid #eee;
  height: calc(100vh - 122px) !important; 
}
</style>