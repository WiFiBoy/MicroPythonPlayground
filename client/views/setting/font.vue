<template>
  <div class="setArea2">
    <h3>Font 字型設定</h3>
    <div class="setList2"
      <span>Editor Font Size</span>
      <ul style="list-style:none;">
        <li v-for="(item,index) in fsize">
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
      fsize:[15,'16(default)',17,18,19,20,21,22,23,24]
    }
  }
}
</script>

<style scoped>
 

</style>