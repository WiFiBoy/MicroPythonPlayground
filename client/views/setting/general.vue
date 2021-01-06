<template>
  <div>
    <div class="setArea">
      <h3>Plugins 設定</h3>
      <div class="setList">
        <ul style="list-style:none;">
          <li v-for="item in plugins">
            <el-checkbox v-model="defaultChecked" disabled size="medium">{{item.name}}</el-checkbox>
          </li>
        </ul>  
      </div>
    </div>
    <div class="setArea">
      <h3>Theme 設定</h3>
      <div class="setList">
        <ul style="list-style:none;">
          <li v-for="item in themes">
            <el-checkbox disabled size="medium">{{item.name}}</el-checkbox>
          </li>
        </ul>  
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      defaultChecked:true,
      plugins:[
          {name:'編輯器 Plugin'},
          {name:'學習範例 Plugin'},
          {name:'Scratch 3 Plugin'},
          {name:'雲端分享空間 Plugin'},
          {name:'遊戲學習服務 Plugin'},
          {name:'通關挑戰賽 Plugin'},
          {name:'線上會議教室 Plugin'},
          {name:'積木套件設定 Plugin'}],
      themes:[
          {name:'Ambiance'},
          {name:'Bespin'},
          {name:'Cobalt'},
          {name:'Colorforth'},
          {name:'Dracula'},
          {name:'Eclipse'},
          {name:'Elegant'},
          {name:'Icecoder'},
          {name:'Lucario'},
          {name:'Material'},
          {name:'Mdn-like'},
          {name:'Monokai'},
          {name:'Near'},
          {name:'Ocieanic-next'},
          {name:'Paraiso-light'},
          {name:'Paraiso-Dark'},
          {name:'Rubyblue'},
          {name:'Seti'},
          {name:'Shadowfox'},
          {name:'Yeti'},
          {name:'Zenburn'}]
    }
  }
}
</script>

<style scoped>
.setlist{
 
}
.setitem{
  
}

</style>