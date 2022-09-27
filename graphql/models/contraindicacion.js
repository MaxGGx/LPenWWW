const mongoose = require('mongoose');

const contraindicacionSchema = new mongoose.Schema({
    medicamento: {type : mongoose.Types.ObjectId, ref: "Medicamento"},
    descripcion: String
});

module.exports = mongoose.model("Contraindicacion", contraindicacionSchema);
