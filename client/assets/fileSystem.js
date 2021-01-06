function openFile(mode,instance){//mode==true blockly
    var chosenFileEntry = null;
    chrome.fileSystem.chooseEntry({type: 'openFile'}, function(readOnlyEntry) {
        readOnlyEntry.file(function(file) {
            var reader = new FileReader();
            reader.onloadend = function(e) {
                if(mode)instance.toWS(e.target.result);
                else instance.setCode(e.target.result);
                console.log('mode'+mode+"\n"+e.target.result);
            };
            reader.readAsText(file);
        });
    });
}

function saveFile(mode,code){
    var format = ".py";
    if(mode)format=".pyb";
    var config = {type: 'saveFile', suggestedName: "demo"+format};
    chrome.fileSystem.chooseEntry(config, function(wf) {
        wf.createWriter(function(writer) {
            writer.onwriteend = function(e){
                console.log('write complete');
            };
            writer.write(new Blob([code], {type:'text/plain'}));
        });
    });
}

var fileSystem = {
    openFile:openFile,
    saveFile:saveFile
};

export default fileSystem;