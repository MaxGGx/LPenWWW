import {Schema, Types, model} from "mongoose";

const mermaSchema = new Schema({
    medicamento: {type : Types.ObjectId, ref: "Medicamento"},
});

module.exports = model("merma", mermaSchema);