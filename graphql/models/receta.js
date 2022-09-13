const mongoose = require('mongoose');

const recetaSchema = new mongoose.Schema({
    medico: {type: mongoose.Types.ObjectId, ref: 'Medico'},
    remedios: [{type: mongoose.Types.ObjectId, ref: 'MedicamentoStock'}],
    paciente: {type: mongoose.Types.ObjectId, ref: 'Paciente'},
    descripcion: String,
    entregado: Boolean,
    fechaEmision: String,
});

module.exports = mongoose.model('Receta',recetaSchema);