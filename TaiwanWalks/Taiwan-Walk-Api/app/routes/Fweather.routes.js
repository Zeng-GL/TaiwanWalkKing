//天氣
module.exports = app => {
  const fweather = require("../controllers/Fweather.controller.js");
  //回傳全部資料
  app.get("/FWeatherList", fweather.findAll);
}

