//天氣
module.exports = app => {
  const register = require("../controllers/backendregister-controller");
  //回傳全部資料
  app.post("/api/register", register.register);
}

