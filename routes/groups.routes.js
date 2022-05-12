const router = require("express").Router();
const Group = require("../models/Group.model");
const Eater = require("../models/Eater.model");
const Restaurant = require("../models/Restaurant.model");
const createGroups = require("../utils/createGroups");

router.post("/create_groups", (req, res, next) => {
    const { groupSize } = req.body;
    const eaters = Eater.find();
    const restaurants = Restaurant.find();

    Promise.all([eaters, restaurants])
        .then(([eaters, restaurants]) => {
            const groups = createGroups(eaters, restaurants, groupSize);
            console.log(groups);

            return Group.create(groups);
        })

        .then((groups) => {
            const allGroups = groups.map(({ leader, eaters, restaurant }) => {
                return {
                    leader: leader.name,
                    eaters: eaters.map((eater) => eater.name),
                    restaurant: restaurant.name,
                };
            });
            res.json(allGroups);
        })
        .catch((err) => res.json({ message: "groups already created" }));
});

router.get("/create_groups", (req, res, next) => {
    Group.find()
        .populate("leader")
        .populate("eaters")
        .populate("restaurant")
        .then((groups) => {
            const allGroups = groups.map(({ leader, eaters, restaurant }) => {
                return {
                    leader: leader.name,
                    eaters: eaters.map((eater) => eater.name),
                    restaurant: restaurant.name,
                };
            });
            res.json(allGroups);
        })
        .catch((err) =>
            res.json({ message: "eaters and restaurants removed" })
        );
});

module.exports = router;
