const mongoose = require('mongoose');

const medicamentoStockSchema = new mongoose.Schema({
    nombre: String,
    codigo: String,
    descripcion: String,
    caducidad: String,
    fechaingreso: String,
    partida: String
});

module.exports = mongoose.model("MedicamentoStock", medicamentoStockSchema);