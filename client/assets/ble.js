const bleNusServiceUUID  = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
const bleNusCharRXUUID   = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';
const bleNusCharTXUUID   = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';
const MTU = 20;

function connectBLE(store,log){
    var bleServer,nusService;
    var rxCharacteristic,txCharacteristic;
    var gattServer,notification,accept;
    if(!navigator.bluetooth) {
        console.log('<BLE> WebBluetooth API is not available.');
        console.log('<BLE> Please make sure the Web Bluetooth flag is enabled.');
        return;
    } 
    console.log('<BLE> Requesting Bluetooth Device...');
    navigator.bluetooth.requestDevice({
        filters: [{services: [bleNusServiceUUID]}]
    })
    .then(device => {
        store.commit('setBleDevice',device);
        console.log('<BLE> Found ' + device.name);
        console.log('<BLE> Connecting to GATT Server...');
        return device.gatt.connect();
    })
    .then(server => {
        console.log('<BLE> Locate NUS service');
        return server.getPrimaryService('6e400001-b5a3-f393-e0a9-e50e24dcca9e');
    }).then(service => {
        nusService = service;
        console.log('<BLE> Found NUS service');
    })
    .then(() => {
        console.log('<BLE> Locate RX characteristic');
        return nusService.getCharacteristic('6e400002-b5a3-f393-e0a9-e50e24dcca9e');
    })
    .then(characteristic => {
        rxCharacteristic = characteristic;
        store.commit('setRxCharacteristic',rxCharacteristic);
        store.commit('setConnected',true);
        store.commit('setConnectMode','ble');
        console.log('<BLE> Found RX characteristic');
    })
    .then(() => {
        console.log('<BLE> Locate TX characteristic');
        return nusService.getCharacteristic('6e400003-b5a3-f393-e0a9-e50e24dcca9e');
    })
    .then(characteristic => {
        txCharacteristic = characteristic;
        console.log('<BLE> Found TX characteristic');
    })
    .then(() => {
        console.log('<BLE> Enable notifications');
        return txCharacteristic.startNotifications();
    })
    .then(() => {
        console.log('<BLE> Notifications started');
        let flagCR = false; //Carriage Return
        txCharacteristic.addEventListener('characteristicvaluechanged',function(event) {
            let value = event.target.value;
            let str = "";
            for(let i=0; i<value.byteLength;i++){
                var number = value.getUint8(i);
                console.log('<BLE> Raw Reply:',number);
                //handle only LF without CR
                if(number==13){flagCR = true;}//meet CR 
                if(flagCR&&number==10){flagCR = false;}//correct newline
                if(!flagCR&&number==10){//meet LF witout CR
                    console.log('without Carriage Return');
                    str += String.fromCharCode(13);//add CR before LF
                    flagCR = false;
                }
                str += String.fromCharCode(number);//append 
            }
            console.log('<BLE> Reply:',str);
            log(str);
        });
    })
    .catch(error => {
        console.log('<BLE> ERROR: ' + error);
    });
}

function sendNextChunk(bleRx,dataArray){//ble Chunk 
    let chunk = dataArray.slice(0, MTU);
    console.log('<ble> chunk',chunk);
    bleRx.writeValue(chunk).then(function() {
        if(dataArray.length > MTU){
            sendNextChunk(dataArray.slice(MTU));
        }
    });
}

function writeBLE(bleRx,data){
    let dataArray = new Uint8Array(data.length + 1);
        for(let i = 0; i < data.length; i++) {
            let val = data[i].charCodeAt(0);
            dataArray[i] = val;
        }
    sendNextChunk(bleRx,dataArray);
}

function disconnect(store){
    let bleDevice = store.state.bleDevice;
    if(!bleDevice){
        console.log('<ble> No Bluetooth Device connected');
        return;
    }else console.log('<ble> Disconnect from Bluetooth Device');
        if(bleDevice.gatt.connected) {
            bleDevice.gatt.disconnect();
            console.log('<ble> Bluetooth Device connected:'+bleDevice.gatt.connected);
    } else console.log('<ble> Bluetooth Device is already disconnected');
    
    store.commit('setBleDevice',null);
    store.commit('setRxCharacteristic',null);
    store.commit('setConnected',false);
    store.commit('setConnectMode',null);
}

var ble = {
    connectBLE:connectBLE,
    disconnect:disconnect,
    writeBLE:writeBLE,
};

export default ble;