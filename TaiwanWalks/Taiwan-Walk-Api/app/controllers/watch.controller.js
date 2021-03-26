
const watch = require("../models/watch.model");
//Fine All Weather
exports.findOne = (req, res) => {
    watch.getOne((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "錯誤連線"
            });
        else res.send(data);
    });
};

