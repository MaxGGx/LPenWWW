const mongoose = require('mongoose');

const medicamentoEntregadoSchema = new mongoose.Schema({
    medicamentos :[{type: mongoose.Types.ObjectId, ref: 'Medicamento'}]
});

module.exports = mongoose.model('medicamentoEntregado', medicamentoEntregadoSchema);