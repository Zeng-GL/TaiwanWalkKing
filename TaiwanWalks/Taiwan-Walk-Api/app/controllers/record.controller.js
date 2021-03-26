const Record = require("../models/record.model.js");
//Create
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "資料不能留空"
    });
  }
  // Create a Customer
  const d = new Date();
  const record = new Record({
    recordDate: d,
    recordCount: req.body.recordCount,
    userID: req.body.userID,
    walkId: req.body.walkId
  });
  // Save Customer in the database
  Record.create(record, (err,succ, data) => {
    if (err){
      res.status(500).send({
        message:
          err.message || "新增失敗"
      });
    }else if(succ) {
      res.status(200).send({
        data,   
        message:
          succ.message || "成功新增一筆資料"
      });
    }
  });
};
//搜尋全部
exports.findAll = (req, res) => {
  Record.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "錯誤連線"
      });
    else res.send(data);
  });
};
//搜尋單user
exports.findAllu = (req, res) => {
  Record.findById(req.params.userID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.userID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Customer with id " + req.params.userID
        });
      }
    } else res.send(data);
  });
};
//回傳單筆資料和步道資料
exports.findAllw = (req, res) => {
  Record.findBywId(req.params.userID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found walk with id ${req.params.userID}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving walk with id " + req.params.userID
        });
      }
    } else res.send(data);
  });
};