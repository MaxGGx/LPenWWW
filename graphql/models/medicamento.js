const mongoose = require('mongoose');

const medicamentoSchema = new mongoose.Schema({
    nombre: String,
    codigo: String,
    descripcion: Text,
    caducidad: String,
    fechaingreso: String,
    partida: String
});

module.exports = mongoose.model("Medicamento", medicamentoSchema);