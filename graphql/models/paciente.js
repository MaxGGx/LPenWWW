import {Schema, Types, model} from "mongoose";

const pacienteSchema = new Schema({
    user: {type : Types.ObjectId, ref: "Usuario", unique: true,  index: true},
    recetas :[{type: Types.ObjectId, ref: 'Recetas'}]
});

module.exports = model("Paciente", pacienteSchema);
