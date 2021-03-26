//會員
module.exports = app => {
  const user = require("../controllers/user.controller.js");
  const consql = require("../models/db.js");
  // Create a new User
  app.post("/users", user.create);
  // Retrieve all Users
  app.get("/users", user.findAll);
  // Retrieve a single User with userId
  app.get("/users/:userName", user.findOne);
  // Update a User with userId
  app.put("/users/:userId", user.update);
  // Delete a User with userId
  app.delete("/users/:userId", user.delete);
  //new user
  app.get('/create', function (req, res) {
    res.render('create', {
      title: '建立新的使用者'
    });
  });
  // register (註冊會員)
  app.post('/create', function (req, res) {
    const ttoday = new Date();
    const au_U = "User";
    consql.query('insert into user_lists set ?', {
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      userPassword: req.body.userPassword,
      userPic: req.body.userPic,
      userAge: req.body.userAge,
      userGender: req.body.userGender,
      userAuthority: au_U,
      addData: ttoday,
      question1: req.body.question1,
      question2: req.body.question2,
      question3: req.body.question3,
      question4: req.body.question4
    }, function (err, fields) {
      if (err)
        //res.json({ret_code: 1, ret_msg: '註冊失敗'});
        throw err;
    });



    // //新增完成後，查詢目前所有使用者
    // consql.query('select * from user_lists', function(err, rows, field){
    //     if (err)
    //         throw err;

    //     //將資料傳送到首頁的使用者列表
    //     res.redirect('/home');
    // });
    res.json({ ret_code: 0, ret_msg: '註冊成功' });
    //res.redirect('/users');
  });

  //login (登入的部分)
  app.post('/auth', function (request, response) {
    var userName = request.body.userName;
    var userPassword = request.body.userPassword;
    console.log('上 userName,userPassword '+ userName + userPassword);

    if (userName && userPassword) {
      consql.query('SELECT * FROM user_lists WHERE userName = ? AND userPassword = ?', 
      [userName, userPassword], function (error, results, fields) {
        if (results.length > 0) {
          console.log('1.' + JSON.stringify(results));
          //request.session.loggedin = true;
          //request.session.userName = userName;
          //response.status(200).redirect('/home');
          //response.redirect('/home');
          response.send('Welcome back');
        } else if(error){
          console.log('2.' + JSON.stringify(results));
          send({
            message: "Incorrect Username and/or Password!"
          });
          //response.send('Incorrect Username and/or Password!');
        }
        response.end();
      });
    } else {
      console.log('3.' + JSON.stringify(results));
      response.send('Please enter Username and Password!');
      //response.json({ ret_code: 2, ret_msg: '請輸入帳號和密碼' });
      response.end();
    }
  });
  //login (檢查login是否登入狀態)
  app.get('/home', function (request, response) {
    if (request.session.loggedin) {
      response.send('Welcome back');

      //response.json({ ret_code: 0, ret_msg: `你好，${request.session.userName} , 登入中` });
    } else {
      response.send('Please login to view this page!');
      //response.json({ ret_code: 1, ret_msg: '尚未登入，請重新登入' });
    }
    response.end();
  });
  //logout 登出
  app.get('/logout', function (req, res) {
    req.session.destroy();
    //res.json({ ret_code: 0, ret_msg: '登出成功' });
    res.send('登出成功');
    //res.redirect('/login');
  });
};





