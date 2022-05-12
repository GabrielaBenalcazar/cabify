const router = require("express").Router();
const Restaurant = require("../models/Restaurant.model");

router.post("/restaurants", (req, res, next) => {
    const { name, address } = req.body;

    Restaurant.create({ name, address })
        .then(() => {
            res.json({
                message: " created",
            });
        })
        .catch((err) => res.json({ err }));
});

router.get("/restaurants", (req, res, next) => {
    Restaurant.find()
        .then((allRestaurants) => {
            res.json({ allRestaurants });
        })
        .catch((err) => res.json({ err }));
});

module.exports = router;
