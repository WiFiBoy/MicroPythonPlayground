<template>
  <div class="container">
    <h1 style="text-align:center;">學習範例</h1>
    <div v-for="(item, index) in textData">
      <div v-if="item.type === 'description'" class="detail">
        <span>{{item.content}}</span>
      </div>
      <div v-if="item.type === 'code'" class="table">
        <el-table :data="item.content" border >
          <el-table-column prop="name" label="名稱"  width="180" fixed ></el-table-column>
          <el-table-column prop="explain" label="說明" fixed></el-table-column>
          <el-table-column prop="fileName" label="檔名" fixed></el-table-column>
          <el-table-column prop="blockly" label="Blockly" width="80" fixed >
            <template slot-scope="scope">
              <el-button type="text" size="small" disabled>打開</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="edit" label="Python" width="80" fixed align="center"> 
            <template slot-scope="scope">
              <el-button @click="toEditor(index,scope.$index)" type="text" size="small">打開</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div style="margin-bottom:64px;"></div>
  </div> 
</template>
<script>
let Base64 = require('js-base64').Base64;
import pyjson from '../assets/pyfile.json';

export default {
  data(){
    return{
      textData:null
    }
  },
  methods:{
    toEditor(idx,rowIdx){
      let code = Base64.decode(this.textData[idx].content[rowIdx].codeData);
      eventBus.$emit('fsEdit',{"code":code,"fileName":this.textData[idx].content[rowIdx].fileName});
      this.$router.push({path:'/'});
    },
  },
  created(){
    this.textData = pyjson;//get tutorial json
  },
  mounted(){

  }
}
</script>

<style scoped>
.container{
  padding:0px 20px;
  overflow: scroll;
  overflow-x: hidden;
  height: 100%;
}

.detail{
  margin:20px 0;
}

.table{
  margin:5px 0;
}


</style>