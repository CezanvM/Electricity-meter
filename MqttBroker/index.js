var mosca       = require('mosca');
var mongoose    = require('mongoose');

var config = {
    port: 9999,
};

var server = new mosca.Server(config);

mongoose.connect('mongodb://localhost:27017/data').then(() => {
    console.log('Mongo connected');
}, (err) => {
    console.warn(err);
});

var userModel = mongoose.model('User',new mongoose.Schema({
    objectId: mongoose.Schema.ObjectId,
    name: String,
    password: String,
    isAdmin: Boolean
}));

var auth = function (client, username, password, callback) {

    userModel.findOne({
        name: username,
        password: password
    }, (err, user) => {
        if(err) throw err;

        if(!user)
            callback(null, false);
        else
            callback(null, true);
    });
};

server.authenticate = auth;

server.on('error', (err) => {
    console.warn(err);
});

server.on('ready', function(){
    console.log('Mosca server is up and running');
});

server.on('clientConnected', function(client) {
    console.log('New connection: ', client.id );
});

server.on('published', function (packet, client) {
    console.log("Published :=", packet.payload.toString());
});

server.on('subscribed', function (topic, client) {
    console.log("Subscribed :=", client.packet);
});