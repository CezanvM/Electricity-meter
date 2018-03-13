var userModel = require('./usermodel').userModel;

exports.auth = function (client, username, password, callback) {

    if(username && password) {
        userModel.findOne({
            name: username,
            password: password
        }, (err, user) => {
            if(err) throw err;

            if(!user)
                callback(null, false);
            else
                callback(null, true);
        }).catch((err) => {
            if(err) throw err;
        });
    }
};