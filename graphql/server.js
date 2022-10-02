const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const {ApolloServer, gql} = require("apollo-server-express");
const {merge} = require("lodash");
const typeDefs = require("./types/types")

const MedicamentoReservado = require("./models/medicamentoReservado");
const Receta = require("./models/receta");
const Registro = require("./models/registro");
const Contraindicacion = require("./models/contraindicacion");
const Merma = require("./models/medicamentoMerma");
const Medico = require("./models/medico");
const Farmaceutico = require("./models/farmaceutico");
const Paciente = require("./models/paciente");
const MedicamentoStock = require("./models/medicamentoStock");

mongoose.connect('mongodb+srv://MaxX_X:HdrMD9UJhZyate6@cluster0.gi49kts.mongodb.net/test', {useNewUrlParser:true, useUnifiedTopology:true});

//CHEQUEAR IMPLEMENTACIÓN QUERY GETPACIENTES

const resolvers = {
    Query: {
        async getMedicamentosStock(obj){
            const medicamentos= await MedicamentoStock.find();
            return medicamentos
        },
        async getMedicamentoStock(obj,{id}){
            const medicamentos= await MedicamentoStock.findById(id)
            return medicamentos
        },
        async getRecetas(obj){
            const recetas= await Receta.find();
            return recetas
        },
        async getReceta(obj,{id}){
            const recetas= await Receta.findById(id)
            return recetas
        },
        async getMedicos(obj){
            const medicos= await Medico.find()
            return medicos
        },
        async getMedico(obj,{id}){
            const medicos= await Medico.find(id)
            return medicos
        },
        async getPacientes(obj){
            const pacientes= await Paciente.find()
            return pacientes
        },
        async getPaciente(obj,{id}){
            const pacientes= await Paciente.findById(id)
            return pacientes
        },
        async getRegistros(obj){
            const registros= await Registro.find()
            return registros
        },
        async getRegistro(obj,{id}){
            const registros= await Registro.findById(id)
            return registros
        },
        async getMermas(obj){
            const mermas= await Merma.find()
            return mermas
        },
        async getMerma(obj,{id}){
            const mermas= await Merma.findById(id)
            return mermas
        },
        async getContraindicaciones(obj){
            const contraindicaciones= await Contraindicacion.find()
            return contraindicaciones
        },
        async getContraindicacion(obj,{id}){
            const contraindicaciones= await Contraindicacion.findById(id)
            return contraindicaciones
        },
        async getMedicamentosReservados(obj){
            const medicamentosr= await MedicamentoReservado.find()
            return medicamentosr
        },
        async getMedicamentoReservado(obj,{id}){
            const medicamentosr= await MedicamentoReservado.findById(id)
            return medicamentosr
        }
    },
    Mutation: {
        async addMedicamentoStock(obj, {input}){
            const medicamentoStock = new MedicamentoStock(input);
            await medicamentoStock.save();
            return medicamentoStock;
        },
        async updateMedicamentoStock(obj, {id, input}){
            const medicamentoStock = await MedicamentoStock.findByIdAndUpdate(id, input);
            return medicamentoStock;
        },
        async deleteMedicamentoStock(obj, {id}){
            await MedicamentoStock.deleteOne({_id: id});
            return {
                message: "MedicamentoStock eliminado"
            }
        },
        async addReceta(obj, {input}){
            const receta = new Receta(input);
            await receta.save();
            return receta;
        },
        async updateReceta(obj, {id, input}){
            const receta = await Receta.findByIdAndUpdate(id, input);
            return receta;
        },
        async deleteReceta(obj, {id}){
            await Receta.deleteOne({_id: id});
            return {
                message: "Receta eliminada"
            }
        },
        async addMedico(obj, {input}){
            const medico = new Medico(input);
            await medico.save();
            return medico;
        },
        async updateMedico(obj, {id, input}){
            const medico = await Medico.findByIdAndUpdate(id, input);
            return medico;
        },
        async deleteMedico(obj, {id}){
            await Medico.deleteOne({_id: id});
            return {
                message: "Medico eliminado"
            }
        },
        async addFarmaceutico(obj, {input}){
            const farmaceutico = new Farmaceutico(input);
            await farmaceutico.save();
            return farmaceutico;
        },
        async updateFarmaceutico(obj, {id, input}){
            const farmaceutico = await Farmaceutico.findByIdAndUpdate(id, input);
            return farmaceutico;
        },
        async deleteFarmaceutico(obj, {id}){
            await Farmaceutico.deleteOne({_id: id});
            return {
                message: "Farmaceutico eliminado"
            }
        },
        async addPaciente(obj, {input}){
            const paciente = new Paciente(input);
            await paciente.save();
            return paciente;
        },
        async updatePaciente(obj, {id, input}){
            const paciente = await Paciente.findByIdAndUpdate(id, input);
            return paciente;
        },
        async deletePaciente(obj, {id}){
            await Paciente.deleteOne({_id: id});
            return {
                message: "Paciente eliminado"
            }
        },
        async addRegistro(obj, {input}){
            const registro = new Registro(input);
            await registro.save();
            return registro;
        },
        async updateRegistro(obj, {id, input}){
            const registro = await Registro.findByIdAndUpdate(id, input);
            return registro;
        },
        async deleteRegistro(obj, {id}){
            await Registro.deleteOne({_id: id});
            return {
                message: "Registro eliminado"
            }
        },
        async addMerma(obj, {input}){
            const merma = new Merma(input);
            await merma.save();
            return merma;
        },
        async updateMerma(obj, {id, input}){
            const merma = await Merma.findByIdAndUpdate(id, input);
            return merma;
        },
        async deleteMerma(obj, {id}){
            await Merma.deleteOne({_id: id});
            return {
                message: "Merma eliminada"
            }
        },
        async addContraindicacion(obj, {input}){
            const contraindicacion = new Contraindicacion(input);
            await contraindicacion.save();
            return contraindicacion;
        },
        async updateContraindicacion(obj, {id, input}){
            const contraindicacion = await Contraindicacion.findByIdAndUpdate(id, input);
            return contraindicacion;
        },
        async deleteContraindicacion(obj, {id}){
            await Contraindicacion.deleteOne({_id: id});
            return {
                message: "Contraindicacion eliminada"
            }
        },
        async addMedicamentoReservado(obj, {input}){
            const medicamentor = new MedicamentoReservado(input);
            await medicamentor.save();
            return medicamentor;
        },
        async updateMedicamentoReservado(obj, {id, input}){
            const medicamentor = await MedicamentoReservado.findByIdAndUpdate(id, input);
            return medicamentor;
        },
        async deleteMedicamentoReservado(obj, {id}){
            await MedicamentoReservado.deleteOne({_id: id});
            return {
                message: "Medicamento en reserva eliminado"
            }
        },
        /*
        QUEDA CASI LISTA, HAY QUE CONSULTAR CON EL PROFE PORQUE NO DEJA IMPORTAR NODEMAILER NI
        CREAR EL TRIGGER...
        async makeRecordatorioRecetas(){
            recetas = getRecetas()
            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let currentDate = `${day}-${month}-${year}`;
            for(let i = 0; i<recetas.length; i++){
                recetas[i].periodosRetiro
                for(let j = 0; j<recetas[i].periodosRetiro; j++){
                    if(recetas[i].periodosRetiro[j][0].split(":") == currentDate){
                        //Enviar aviso con nodemailer
                    }
                }
            }
        }
        */
    }
}

let apolloServer = null;

const corsOptions = {
    origin: "http://localhost:8090",
    credentials: false
};

async function startServer(){
    const apolloServer = new ApolloServer({typeDefs, resolvers, corsOptions});
    await apolloServer.start();

    apolloServer.applyMiddleware({ app, cors:false});

}

startServer();

const app = express();
app.use(cors());
app.listen(8090, function(){
    console.log("Servidor Iniciado");
});
