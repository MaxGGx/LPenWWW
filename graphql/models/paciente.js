const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
    rut: String,
    nombre: String,
    apellido: String,
    email: String,
    telefono: String,
    pass: String,
    recetas :[{type: mongoose.Types.ObjectId, ref: 'Recetas'}]
});

module.exports = mongoose.model("Paciente", pacienteSchema);
