function getDevice(store,showDialog){
    var deviceList = [];
    chrome.serial.getDevices(function(devices) {
        var prefix = "";
        if(navigator.userAgent.indexOf("Linux")>=0){
            hasSlashes = false;
            devices.forEach(function(device) {
                if(device.path.indexOf("/")>=0)hasSlashes=true;
            });
        if(!hasSlashes) prefix = "/dev/";
        }

        devices.map(function(device){
            console.log(prefix+device.path);
            deviceList.push(prefix+device.path);
        });
        store.commit('getPorts',deviceList);
        showDialog(); 
    });
}
    
var StringToAB = function(str) {
    var buf = new ArrayBuffer(str.length);
    var bufView = new Uint8Array(buf);
    for (var i=0; i<str.length; i++) {
        var ch = str.charCodeAt(i);
        if (ch>=256){
            console.warn("Attempted to send non-8 bit character - code "+ch);
            ch = ".".charCodeAt(0);
        }
        bufView[i] = ch;
    }
    return buf;
};

function writeSerial(deviceID,str, n){
    //chrome.serial.send(deviceID, str, function(){
    chrome.serial.send(deviceID, StringToAB(str), function(){
        console.log('Sending to '+deviceID+":\n"+ str);
        //setTimeout(function () { x = 1; }, 10); // derek test a delay after send function
    });
}

function hardReset(deviceID){ 
    chrome.serial.setControlSignals(deviceID, {rts:true}, function(){
        console.log('RTS: true');
        chrome.serial.setControlSignals(deviceID, {dtr:true}, function(){
            console.log('DTR:true');
            chrome.serial.setControlSignals(deviceID, {dtr:false}, function(){
                console.log('DTR: false');
                chrome.serial.setControlSignals(deviceID, {dtr:true}, function(){
                    console.log('hard Reset');
                });
            });
        });
    }); 
}

function ctrlC(deviceID){ 
    chrome.serial.send(deviceID, '\x03', function(){
        //console.log('Sending to '+deviceID+":\n"+ str);
        //setTimeout(function () { x = 1; }, 10); // derek test a delay after send function
    });
}


function copypaste(deviceID,code){
    writeSerial(deviceID,'\x05');
    console.log('length of code:',code.length);
    console.log('navigator.platform:',navigator.platform);
    console.log('navigator.platform:',typeof(navigator.platform));
    if(navigator.platform.indexOf('Win')>=0){
        console.log('Win:Copy');
        //writeSerial(deviceID,code+'\x04');
        let codeArray = code.split('\n');
        for(let i=0;i<codeArray.length;i++){
            writeSerial(deviceID,codeArray[i]+'\r');
            var start = Date.now();
            while (Date.now() < start + 5) {}
            if(i==codeArray.length-1) writeSerial(deviceID,'\x04');
        }
    }else if(navigator.platform.indexOf('Mac')>=0){
        console.log('Mac:Copy');
        //writeSerial(deviceID,code+'\x04');
        let codeArray = code.split('\n');
        for(let i=0;i<codeArray.length;i++){
            writeSerial(deviceID,codeArray[i]+'\r');
            var start = Date.now();
            while (Date.now() < start + 5) {}
            if(i==codeArray.length-1) writeSerial(deviceID,'\x04');
        }        
    } else {
        console.log('Linux:Copy');
        //writeSerial(deviceID,code+'\x04');
        let codeArray = code.split('\n');
        for(let i=0;i<codeArray.length;i++){
            writeSerial(deviceID,codeArray[i]+'\r');
            var start = Date.now();
            while (Date.now() < start + 5) {}
            if(i==codeArray.length-1)writeSerial(deviceID,'\x04');
        }
    }
}

function disconnect(store){
    var deviceID = store.state.deviceID;
    if(store.state.isConnected){
        chrome.serial.disconnect(deviceID, function(result) {
            if(result)shutdown(store);
            else console.log("Disconnect failed");
        });
    } 
}

function shutdown(store){//close ready config
    store.commit('setDeviceID',-1);
    store.commit('setConnected',false);
    store.commit('setConnectMode',null);
    store.commit('setWaitFS', false);
    console.log("Disconnected from the serial port");
}

function connectToPort(store,deviceName,log){
    var receviceStr = '';
    if(!store.state.SerialReadCallback){
        chrome.serial.onReceive.addListener(function(info){
            if (info.connectionId == store.state.deviceID && info.data) {
                var uint8View = new Uint8Array(info.data);
                var str = new TextDecoder("utf-8").decode(uint8View);
                receviceStr += str;
            } 
            log(str);
        });

        chrome.serial.onReceiveError.addListener(function(errorInfo) {
            if(errorInfo.connectionId==store.state.deviceID){
                console.log('onReceiveError：',errorInfo.error);
                switch(errorInfo.error){
                    case "device_lost":  //for Mac
                        console.log("serial error : device_lost");
                        shutdown(store);
                        break;
                    case 'break':       //for Win
                        console.log("serial error : break");
                        shutdown(store);
                        break;
                    case "frame_error":
                        console.log("serial error : frame_error");
                        /*disconnection sync connection asyn */
                        //log("_ frame_error 請重新連接\n");
                        //disconnect(store);
                        break;
                }
            }
        });
        store.commit('setReadCallback',true);
    }

    chrome.serial.connect(deviceName, {bitrate:115200},function(cInfo){
        var deviceID = cInfo.connectionId;
        console.log("Connect 115200, Device ID:"+cInfo.connectionId);
        store.commit('setDeviceID',deviceID);
        store.commit('setConnected',true);
        store.commit('setConnectMode','usb');
    });
}

var serial = {
    getDevice:getDevice,
    writeSerial:writeSerial,
    copypaste:copypaste,
    hardReset:hardReset,
    connectToPort:connectToPort,
    disconnect:disconnect
};

export default serial;