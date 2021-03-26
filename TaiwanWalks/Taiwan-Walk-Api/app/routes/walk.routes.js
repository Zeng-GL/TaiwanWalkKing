//步道
module.exports = app => {
  const walk = require("../controllers/walk.controller.js");
  //步道資料 Routes
  //回傳全部資料
  app.get("/walkPlaceList", walk.findAll);
  //找單一筆資料
  app.get("/walkPlaceList/:walkId", walk.findOne);
  
  //找walkPlaceName佛光蘭陽別院
  app.get("/walkSome", walk.findSome);
  
  //回傳20筆資料並且有分頁效果
  app.get("/walkPagination", walk.findAndPagination);
  //新增
  app.post("/walkPlaceList", walk.create);
  //修改
  app.put("/walkPlaceList/:walkId", walk.update);
  //刪除
  app.delete("/walkPlaceList/:walkId", walk.delete);
}

