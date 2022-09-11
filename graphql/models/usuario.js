import {Schema, Types, model} from "mongoose";

const usuarioSchema = new Schema({
    rut: String,
    nombre: String,
    apellido: String,
    email: String,
    telefono: String,
    pass: String,
    tipo : {type : String, enum: ["medico", "paciente", "farmaceutico"]}
});

module.exports = model('Usuario',usuarioSchema);