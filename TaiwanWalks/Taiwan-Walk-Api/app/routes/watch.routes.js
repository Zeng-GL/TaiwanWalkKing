//手錶
module.exports = app => {
  const watch = require("../controllers/watch.controller");
  //回傳全部資料
  app.get("/watch", watch.findOne);
}

