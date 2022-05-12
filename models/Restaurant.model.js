
const { Schema, model } = require("mongoose");

const restaurantSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);
const Restaurant = model("Restaurant", restaurantSchema);

module.exports = Restaurant;