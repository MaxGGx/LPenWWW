const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    rut: String,
    nombre: String,
    apellido: String,
    email: String,
    telefono: String,
    pass: String,
    tipo : {type : String, enum: ["medico", "paciente", "farmaceutico"]}
});

module.exports = mongoose.model('Usuario',usuarioSchema);