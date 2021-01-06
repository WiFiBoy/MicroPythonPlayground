import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  userAgent:null,
  connectMode:null,
  isConnected:false,
  //Serial
  devicelist:[],
  deviceID:-1,
  SerialReadCallback:false,
  //bleDevice 
  bleDevice:null,
  rxCharacteristic:null,
  //FS
  waitFS:false,
  fileSystem:[],
}

const mutations = {
  setUserAgent(state,agent){
    state.userAgent = agent;
  },
  setConnectMode(state,mode){
    state.connectMode = mode;
  },
  getPorts(state,dlist){
    state.devicelist = dlist;
  },
  setDeviceID(state,id){
    state.deviceID=id;
  },
  setConnected(state,isbool){
    state.isConnected = isbool;
  },
  setReadCallback(state,isbool){
    state.SerialReadCallback = isbool;
  },
  setWaitFS(state,cmdType){
    state.waitFS = cmdType;
  },
  setFileSystem(state,dlist){
    state.fileSystem = dlist;
  },
  setBleDevice(state,device){
    state.bleDevice = device;
  },
  setRxCharacteristic(state,rx){
    state.rxCharacteristic = rx;
  },
}

const getters={
  getlocalFiles: state => {
    return state.localFiles;
  },
  getConnectMode: state => () => state.connectMode
};


const actions = {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('getPorts')
    }, 200)
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
