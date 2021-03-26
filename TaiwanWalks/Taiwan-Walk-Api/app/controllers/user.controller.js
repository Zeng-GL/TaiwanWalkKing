const User = require("../models/user.model.js");
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Customer
  const today = new Date();
  const Authority = "User";
  const user = new User({
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword,
    userPic: req.body.userPic,
    userAge: req.body.userAge,
    userGender: req.body.userGender,
    userAuthority: Authority,
    addData: today,
    question1: req.body.question1,
    question2: req.body.question2,
    question3: req.body.question3,
    question4: req.body.question4
  });

  // Save Customer in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "錯誤連線"
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  User.findById(req.params.userName, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.userName}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.userName
        });
      }
    } else res.send(data);
  });
};

//更新對象資料
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "資料不能留空"
    });
  }

  User.updateById(
    req.params.userId,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `找不到 更新失敗請重新在試 ${req.params.userId}`
          });
        } else if (res.status(500)) {
          res.status(500).send({
            message: `更新失敗請重新在試 ${req.params.userId}`
          });
        }
      } else if (res.status(200)) {
        res.status(200).send({
          message: `成功更新一筆資料`,
          data,
        });
      }
    }
  );
};

//Delete ID
exports.delete = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `刪除失敗，請重新再試 ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "刪除失敗，請重新再試 " + req.params.userId
        });
      }
    } else res.send({ 
      message: "已刪除" + req.params.userId,
      data
     });
  });
};




