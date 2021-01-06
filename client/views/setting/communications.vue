<template>
  <div class="setArea">
    <h3>Baudrate 設定</h3>
    <div class="setList">
      <span>Baud rate</span>
      <ul style="list-style:none;">
        <li v-for="(item,index) in baudrate">
          <el-radio v-model="radio" :label="index">{{item}}</el-radio>
        </li>
      </ul>  
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      radio:1,
      baudrate:[9600,'115200(default)',230400,921600,1500000]
    }
  }
}
</script>

<style scoped>
 

</style>