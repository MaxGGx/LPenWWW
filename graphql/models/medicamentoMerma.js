const mongoose = require('mongoose');

const mermaSchema = new mongoose.Schema({
    medicamento: {type : mongoose.Types.ObjectId, ref: "Medicamento"},
});

module.exports = mongoose.model("Merma", mermaSchema);