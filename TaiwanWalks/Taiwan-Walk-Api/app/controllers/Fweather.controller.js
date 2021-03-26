const Weather = require("../models/Fweather.model.js");
//Fine All Weather
exports.findAll = (req, res) => {
    Weather.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "錯誤連線"
            });
        else res.send(data);
    });
};

