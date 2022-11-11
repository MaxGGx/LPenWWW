const mongoose = require('mongoose');

const recetaSchema = new mongoose.Schema({
    medico: {type: mongoose.Types.ObjectId, ref: 'Medico'},
    remedios: [String],
    paciente: {type: mongoose.Types.ObjectId, ref: 'Paciente'},
    descripcion: String,
    entregado: Boolean,
    fechaEmision: String,
    periodosRetiro: [String]
});

module.exports = mongoose.model('Receta',recetaSchema);