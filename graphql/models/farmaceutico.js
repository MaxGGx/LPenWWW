const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
    rut: String,
    nombre: String,
    apellido: String,
    email: String,
    telefono: String,
    pass: String,
    registros :[{type: mongoose.Types.ObjectId, ref: 'Registro'}]
});

module.exports = mongoose.model("Farmaceutico", pacienteSchema);