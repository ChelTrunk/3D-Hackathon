/**
 * Created by Aidan Globus on 11/19/2016.
 */
var peer = new Peer("ID2",{key: '7rcn6hyvwddt2o6r'});
peer.on('open', function(id) {
    console.log('My peer ID is: ' + id);
});
var conn = peer.connect('ID1');
conn.on('open', function() {
    // Receive messages
    conn.on('data', function(data) {
        console.log('Received', data);
    });

    // Send messages
    var mes = prompt("Send a message?");
    conn.send(mes);
});