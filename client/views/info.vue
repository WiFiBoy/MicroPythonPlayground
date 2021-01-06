<template>
  <div class="container">
    <el-row :span="24">
      <h3>這是 WiFiBoy Python Playground v1.01T 版本。</h3>
    </el-row>
    <el-row :span="24">
    <ul>
      <li v-for="item in content">{{item}}</li>
    </ul>
    <h4>WiFiBoy Python Playground 基於以下套件開發：</h4>
    <ul>
      <li v-for="item in package">{{item.name}}:
        <a :href="item.url">{{item.url}}</a>
      </li>
    </ul>
    <h4>WiFiBoy Python Playground 開發團隊：</h4>
    <ul>
      <li v-for="item in team">{{item.name}}
      </li>
    </ul>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      content:[
        "WiFiBoy Python Playground 是一個開源軟體開發計畫，由 WiFiBoy.Club 與 WiFiBoy.Org 共同發起。",
        "PyThing 是一個互動智慧裝置的概念，藉由內建 MicroPython 的 REPL 互動界面，可讓智慧裝置的開發變得更簡單，也讓裝置的使用有方便的改造機制。",
        "Python Playground 提供Python積木編輯器與文字型編輯器，可以將積木與程式送上裝置立即執行，也可以將程式上傳儲存，讓裝置可以內建多種程式，也可以設定一個 main.py 讓裝置在開機時自動執行。",
        "Python Playground 支援 USB-Serial 連線，藍芽 BLE 無線連線，WiFi 無線連線等連線模式，是非常方便的開發環境。",
        " PyThing 的核心基於 Damien P. George 的 MicroPython 開源專案，使用 MIT 授權。請參考： https://micropython.org",
      ],
      support:[
        'WiFiBoy Pro Dev Kit (ESP32)',
        'WiFiBoy Edu+/Classic Dev Kit (ESP32)',
        'WiFiBoy Mini Dev Kit (ESP32)',
        'WiFiBoy Arcade Kit (SAMD51)'
      ],
      package:[
        {name:'Google Blockly',url:'https://developers.google.com/blockly/'},
        {name:'CodeMirror Editor',url:'https://codemirror.net/'},
        {name:'Xterm.js',url:'https://xtermjs.org/'},
        {name:'Vue.js',url:'https://vuejs.org/'},
        {name:'NW.js',url:'https://nwjs.io/'},
        {name:'Web Bluetooth API',url:'https://webbluetoothcg.github.io/web-bluetooth/'}
      ],
      team:[
        {name:'Product Manager: Derek Lai, derek@wifiboy.org'},
        {name:'Lead Programmer: Billy Lin, billy@wifiboy.org'},
        {name:'Lead Designer: Ricky Lai, ricky@wifiboy.org'},
        {name:'Codesmith: TK Lua, tklua@wifiboy.club'},
        {name:'Developer Team: Albert Lu, albert@wifiboy.org'},
        {name:'Developer Team: Sam Chen, samchen@wifiboy.org'},
        {name:'Test Team: Peggy Fang, peggy@wifiboy.org'},
        {name:'Test Team: Amilya Lai, amilya@wifiboy.org'},
        {name:'Test Team: Andy Chen, andy@pything.club'}
      ]
    }
  },
  methods: {
    
  },
  computed: {
  
  }
}
</script>

<style scoped>
.container{
  margin: 10px 0;
  padding:0px 20px;
  overflow: scroll;
  overflow-x: hidden;
  height: 100%;
}
</style>