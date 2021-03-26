let connection = require('../models/db');

module.exports.register = function (req, res) {
    let today = new Date();
    let authority = "Admin";
    const RegisterUser = function (registerUser) {
        this.userID = registerUser.userID,
        this.userName = registerUser.userName,
        this.userName = registerUser.userName,
        this.userEmail = registerUser.userEmail,
        this.userPassword = registerUser.userPassword,
        this.userPic = registerUser.userPic,
        this.userAllcount = registerUser.userAllcount,
        this.userAge = registerUser.userAge,
        this.userGender = registerUser.userGender,
        this.userAuthority = authority,
        this.addData = today,
        this.question1 = registerUser.question1,
        this.question2 = registerUser.question2,
        this.question3 = registerUser.question3,
        this.question4 = registerUser.question4
    }
    // connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
    RegisterUser.connection.query('INSERT INTO user_lists SET ?', function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            res.json({
                status: true,
                data: results,
                message: 'user registered sucessfully'
            })
        }
    });
}

