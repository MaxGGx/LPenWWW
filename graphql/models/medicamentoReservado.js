const mongoose = require('mongoose');

const medicamentoReservadoSchema = new mongoose.Schema({
    nombre: String,
    codigo: String,
    cantidad: Number,
    descripcion: String,
    caducidad: String,
    fechaIngreso: String,
    partida: String,
    available: Boolean,
});

module.exports = mongoose.model('MedicamentoReservado',medicamentoReservadoSchema);