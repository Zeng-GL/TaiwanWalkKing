const sql = require("./db.js");
const Watch = function (watch) {
    this.steps = watch.steps; //Id
}
//Get All Weather
Watch.getOne = result => {
    sql.query('SELECT * FROM `walk_watch_lists` WHERE `user_id`="klzwi9my" ORDER BY `walk_watch_lists`.`calendardate` ASC', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Watch: ", res);
        result(null, res);
    });
};
module.exports = Watch;