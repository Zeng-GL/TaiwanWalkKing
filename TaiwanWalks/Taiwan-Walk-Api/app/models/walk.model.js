const sql = require("./db.js");
const Walk = function (walk) {
  this.walkId = walk.walkId; //Id
  this.walkPlaceName = walk.walkPlaceName; //步道名稱
  this.walkCity = walk.walkCity; //步道地區
  this.walkAddress = walk.walkAddress; //步道地址
  this.walkDetial = walk.walkDetial; //步道介紹
  this.walkTel = walk.walkTel; //步道電話
  this.walkLength = walk.walkLength; //步道長度
  this.walkTime = walk.walkTime; //步道總花費時間
  this.walkPic1 = walk.walkPic1; //步道照片
  this.walkPic2 = walk.walkPic2; //步道照片
  this.addressLat = walk.addressLat; //步道起始緯度
  this.addressLng = walk.addressLng; //步道起始經度
  this.iconLat1 = walk.iconLat1; //金幣緯度
  this.iconLng1 = walk.iconLng1; //金幣經度
  this.iconLat2 = walk.iconLat2; //金幣緯度
  this.iconLng2 = walk.iconLng2; //金幣經度
  this.iconLat3 = walk.iconLat3; //金幣緯度
  this.iconLng3 = walk.iconLng3; //金幣經度
  this.iconLat4 = walk.iconLat4; //金幣緯度
  this.iconLng4 = walk.iconLng4; //金幣經度
  this.visited = walk.visited; //瀏覽人次
  this.walkArea = walk.walkArea //地區
}
//Post
Walk.create = (newWalkPlace, result) => {
  sql.query('INSERT INTO walk_place_lists SET ?', newWalkPlace, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("新增一筆步道資料", { id: res.walkId, ...newWalkPlace });
    result(null, { id: res.walkId, ...newWalkPlace });
  });
};
//Get walksPlace with walkId
Walk.findById = (walkId, result) => {
  sql.query(`SELECT * FROM walk_place_lists WHERE walkId = ${walkId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found walkId: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found walkId with the walkId
    result({ kind: "not_found" }, null);
  });
};
//Get
Walk.getAll = result => {
  sql.query('SELECT * FROM walk_place_lists', (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("walk: ", res);
    result(null, res);
  });
};


Walk.getSome = result => {
  sql.query('SELECT * FROM `walk_place_lists` WHERE `walkPlaceName`="佛光蘭陽別院"', (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("walk: ", res);
    result(null, res);
  });
};


//Put

Walk.updateById = (walkId, walk, result) => {
  
  sql.query(
    "UPDATE walk_place_lists SET walkPlaceName = ?, walkCity = ?, walkAddress = ? , walkDetial = ?, walkTel = ?, walkLength = ?, walkTime = ?, walkPic1 = ?, walkPic2 = ?, addressLat = ?, addressLng = ?, iconLat1 = ?, iconLng1 = ?, iconLat2 = ?, iconLng2 = ?, iconLat3 = ?, iconLng3 = ?, iconLat4 = ?, iconLng4 = ?, visited = ?, walkArea = ? WHERE walkId = ? ORDER BY `walk_place_lists`.`walkId` ASC",
    [walk.walkPlaceName, walk.walkCity, walk.walkAddress, walk.walkDetial, walk.walkTel,
    walk.walkLength, walk.walkTime, walk.walkPic1, walk.walkPic2, walk.addressLat,
    walk.addressLng, walk.iconLat1, walk.iconLng1, walk.iconLat2, walk.iconLng2,
    walk.iconLat3, walk.iconLng3, walk.iconLat4, walk.iconLng4, walk.visited, walk.walkArea, walkId],
    (err,res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found walk with the walkId
        result({ kind: "not_found" }, null);
        return;
      }
    
      console.log("updated Walk: ", { walkId: walkId, ...walk });
      result(null, { walkId: walkId, ...walk });
    }
  );
};

Walk.remove = (walkId, result) => {
  sql.query("DELETE FROM walk_place_lists WHERE walkId = ?", walkId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found walk_place with the walkId
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted walk_place with walkId: ", walkId);
    result(null, res);
  });
};
module.exports = Walk