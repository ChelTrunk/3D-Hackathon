/**
 * Created by Aidan Globus on 11/19/2016.
 */
var peer = new Peer('ID1',{key: '7rcn6hyvwddt2o6r'});
peer.on('open', function(id) {
    console.log('My peer ID is: ' + id);
});
peer.on('connection', function(conn) {
    console.log("connected");
    conn.on('data', function(data) {
        console.log(data);
    });
});
