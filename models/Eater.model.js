const { Schema, model } = require("mongoose");

const eaterSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);
const Eater = model("Eater", eaterSchema);

module.exports = Eater;
