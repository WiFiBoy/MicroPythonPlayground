chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('index.html', {
        width: 1024,
        height: 600,
        minWidth:420,
        minHeight:180,
        frame: 'none',
        singleton: true
    },
    function(win){

        win.onBoundsChanged.addListener(function(){
            console.log("Bounds changed");
        });

        win.onClosed.addListener(function() {
            chrome.serial.getConnections(function(connections) {
                connections.forEach(function(c) {
                    chrome.serial.disconnect(c.connectionId, function() {});
                });
            });
        });

                
    });


});

