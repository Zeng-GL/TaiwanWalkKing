const sql = require("./db.js");
// constructor
const User = function (user) {
  this.userName = user.userName;
  this.userEmail = user.userEmail;
  this.userPassword = user.userPassword;
  this.userPic = user.userPic;
  this.userAllcount = user.userAllcount;
  this.userAge = user.userAge;
  this.userGender = user.userGender;
  this.userAuthority = user.userAuthority;
  this.addData = user.addData;
  this.question1 = user.question1;
  this.question2 = user.question2;
  this.question3 = user.question3;
  this.question4 = user.question4;
};

//新增
User.create = (newUser, result) => {
  sql.query("INSERT INTO user_lists SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created user: ", { userID: res.insertId, ...newUser });
    result(null, { userID: res.insertId, ...newUser });
  });
};
//搜尋全部
User.getAll = result => {
  sql.query('SELECT * FROM user_lists', (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("user_lists: ", res);
    result(null, res);
  });
};
//搜尋單個ID
User.findById = (userName, result) => {
  sql.query(`SELECT * FROM user_lists WHERE userName = "${userName}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};
//更新對象資料
User.updateById = (userID, user, result) => {
  // 暫定在後台管理金幣不能更新 userAllcount = ? ,
  sql.query("UPDATE user_lists SET userName = ?, userEmail = ? , userPassword = ? , userPic = ? , userAge = ? , userGender = ? , question1 = ? , question2 = ? , question3 = ? , question4 = ?  WHERE userID = ?",
    [user.userName, user.userEmail, 
      user.userPassword, user.userPic, 
      user.userAge, user.userGender, 
      user.question1, user.question2, 
      user.question3, user.question4, 
      userID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated user: ", { userID: userID, ...user });
      result(null, { userID: userID, ...user });
    }
  );
};


//刪除對象資料
User.remove = (userID, result) => {
  sql.query("DELETE FROM user_lists WHERE userID = ?", userID, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted user with id: ", userID);
    result(null, res);
  });
};
module.exports = User;