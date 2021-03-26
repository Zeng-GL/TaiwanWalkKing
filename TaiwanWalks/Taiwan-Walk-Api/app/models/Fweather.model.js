const sql = require("./db.js");
const Weather = function (weather) {
    this.weatherId = weather.weatherId; //Id
    this.CityName = weather.CityName; //地區
    this.parameterName = weather.parameterName; //天氣狀態
}
//Get All Weather
Weather.getAll = result => {
    sql.query('SELECT * FROM weather_lists', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("walk: ", res);
        result(null, res);
    });
};
module.exports = Weather;