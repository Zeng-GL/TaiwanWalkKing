// //後台登入 登出
const consql = require("../models/db.js");
const jwt = require('jsonwebtoken');

let SECRET_KEY ="fjkdfldjfldjfld";
module.exports = app => {
  app.post('/api/authenticate', function (req, res) {
    let userEmail = req.body.userEmail;
    let userPassword = req.body.userPassword;
    // req.check('userEmail','Email不存在，請先註冊').isEmail();
    // req.check('userPassword').isLength({min:4});

    console.log('userEmail'+userEmail)
    console.log('userPassword'+userPassword)
    consql.query('SELECT * FROM user_lists WHERE userEmail = ? ', [userEmail], function (error, results, fields) {
    // let errors = req.validationErrors();
      if (error) {
        console.log('1.' + JSON.stringify(results));
        res.json({
          status: false,
          message: 'there are some error with query'
        })
        
      } else {
        if (results.length > 0) {
          if (userPassword == results[0].userPassword) {
            console.log('2.' + JSON.stringify(results));
            let token = jwt.sign(results[0], SECRET_KEY, {
              expiresIn: 5000
            });
            res.json({
              results: results,
              status: true,
              message: '登入成功',
              token: token
            })
          } else {
            console.log('3.' + JSON.stringify(results));
            res.json({
              status: false,
              message: "信箱或密碼不符合"
            });
          }

        }
        else {
          res.json({
            status: false,
            message: "此信箱不存在，請註冊後再登入"
          });
        }
      }
    });
  });
  app.get('/api/logout', function (req, res) {
   res.json({message: "登出成功" });
  });
}


