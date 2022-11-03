const mongoose = require('mongoose');

const registroSchema = new mongoose.Schema({
    farmaceutico: [{type: mongoose.Types.ObjectId, ref: 'Farmaceutico'}],
    rutRetira: String,
    receta: {type: mongoose.Types.ObjectId, ref: 'Receta'},
    fechaRetiro: String,
    medicamentosRechazados:[String]
});

module.exports = mongoose.model('Registro',registroSchema);