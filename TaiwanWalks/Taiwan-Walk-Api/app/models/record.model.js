const sql = require("./db.js");
// constructor
const Record = function (record) {
  this.recordDate = record.recordDate;
  this.recordCount = record.recordCount;
  this.userID = record.userID;
  this.walkId = record.walkId;
};
//搜尋全部
Record.getAll = result => {
  sql.query('SELECT*FROM user_lists INNER JOIN record_lists ON user_lists.userID = record_lists.userID', (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("record_lists: ", res);
    result(null, res);
  });
};
//搜尋單個ID的所有紀錄
Record.findById = (userID, result) => {
  sql.query(`SELECT*FROM user_lists INNER JOIN record_lists ON user_lists.userID = record_lists.userID WHERE user_lists.userID = ${userID}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("record_lists: ", res);
    result(null, res);
  });
};
//post 新紀錄
Record.create = (newRecord, result) => {
  sql.query("INSERT INTO record_lists SET ?", newRecord, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created record: ", { id: res.insertId, ...newRecord });
    result(null, { id: res.insertId, ...newRecord });
  });
};
//回傳單筆資料和步道資料
Record.findBywId = (userID, result) => {
  //SELECT * FROM record_lists as r JOIN walk_place_lists as w ON r.walkId=w.walkId WHERE userId= ${userId}
  //SELECT*FROM(walk_place_lists as w INNER JOIN record_lists as r ON w.walkId = r.walkId) INNER JOIN user_lists as u on r.userID = u.userID WHERE u.userID = ${userID}
  
    sql.query(`SELECT*FROM(walk_place_lists INNER JOIN record_lists ON walk_place_lists.walkId = record_lists.walkId) INNER JOIN user_lists on record_lists.userID = user_lists.userID WHERE user_lists.userID = ${userID}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("record_lists: ", res);
      result(null, res);
    });
  };

module.exports = Record;