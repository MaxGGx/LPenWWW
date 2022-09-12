import {Schema, Types, model} from "mongoose";

const medicoSchema = new Schema({
    user: {type : Types.ObjectId, ref: "Usuario", unique: true,  index: true},
    recetas :[{type: Types.ObjectId, ref: 'Receta'}]
});

module.exports = model("Medico", medicoSchema);