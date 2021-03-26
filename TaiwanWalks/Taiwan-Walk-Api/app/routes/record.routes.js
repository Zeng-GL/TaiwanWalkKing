//ㄧ歷程
module.exports = app => {
  const record = require("../controllers/record.controller.js");
  //回傳全部資料
  app.get("/records", record.findAll);
  //回傳單筆資料
  app.get("/records/:userID", record.findAllu);
  //回傳單筆資料和步道資料
  app.get("/records/walk_lists/:userID", record.findAllw);
  //新增一筆資料
  app.post("/records", record.create);
}

