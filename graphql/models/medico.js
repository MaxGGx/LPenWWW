const mongoose = require('mongoose');

const medicoSchema = new mongoose.Schema({
    rut: String,
    nombre: String,
    apellido: String,
    email: String,
    telefono: String,
    pass: String,
    recetas :[{type: mongoose.Types.ObjectId, ref: 'Receta'}]
});

module.exports = mongoose.model("Medico", medicoSchema);