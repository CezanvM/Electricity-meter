var userModel = require('./usermodel').userModel;

exports.auth = function (client, username, password, callback) {

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