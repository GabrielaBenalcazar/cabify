const router = require("express").Router();
const Eater = require("../models/Eater.model");
const Group = require("../models/Group.model");
const Restaurant = require("../models/Restaurant.model");

router.post("/eaters", (req, res, next) => {
    const { name, email } = req.body;

    Eater.create({ name, email })
        .then(() => {
            res.json({
                message: " created",
            });
        })
        .catch((err) => res.json({ err }));
});

router.get("/eaters", (req, res, next) => {
    Eater.find()
        .then((allEaters) => {
            res.json({ allEaters });
        })
        .catch((err) => res.json({ err }));
});

router.delete("/eaters", (req, res, next) => {
    Eater.deleteMany()
        .then(() => {
            return Restaurant.deleteMany();
        })
        .then(() => {
            return Group.deleteMany();
        })

        .then(() => {
            return res.json({
                message: "eaters,groups, and restaurants removed",
            });
        })
        .catch((err) => res.json({ err }));
});

module.exports = router;
