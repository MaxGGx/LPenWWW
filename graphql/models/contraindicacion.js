import {Schema, Types, model} from "mongoose";

const contraindicacionSchema = new Schema({
    medicamento: {type : Types.ObjectId, ref: "Medicamento"},
    descripcion: String
});

module.exports = model("Contraindicacion", contraindicacionSchema);
