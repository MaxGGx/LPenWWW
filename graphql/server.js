const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const {ApolloServer, gql} = require("apollo-server-express");
const {merge} = require("lodash");
const typeDefs = require("./types/types")
const JWT = require('jsonwebtoken');

const MedicamentoReservado = require("./models/medicamentoReservado");
const Receta = require("./models/receta");
const Registro = require("./models/registro");
const Contraindicacion = require("./models/contraindicacion");
const Merma = require("./models/medicamentoMerma");
const Medico = require("./models/medico");
const Farmaceutico = require("./models/farmaceutico");
const Paciente = require("./models/paciente");
const MedicamentoStock = require("./models/medicamentoStock");
const medicamentoMerma = require("./models/medicamentoMerma");

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
        },

        async login(obj,{email, pass, tipo}){
            let user = null;
            switch (tipo) {
                case "medico":
                    user = await Medico.findOne({email: email});
                    break;
                case "paciente":
                    user = await Paciente.findOne({email: email});
                    break;
                case "farmaceutico":
                    user = await Farmaceutico.findOne({email: email});
                    break;    
                default:
                    break;
            }
            if(!user){
                throw new Error(tipo + ' con correo ' + email + 'no existe.');
            }
            if(pass != user.pass){
                throw new Error('Contraseña incorrecta.');
            }
            const token = JWT.sign({userId: user.id, email: user.email}, 'clavesupersecreta', {
                expiresIn: '1h'
            });
            return {userId: user.id, token: token, tokenExpiration: 1}
        },

        async getReservados(obj, {nombre_medicamento}){
            const IDs = await MedicamentoReservado.find({nombre: nombre_medicamento, available: 0});
            return IDs;
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

        async addLoteMedicamentos(obj, {datos_medicamento, cantidad}){
            for (let step = 0; step < cantidad; step++) {
                this.addMedicamentoStock(datos_medicamento);
            }
            const reservas = await this.getReservados(datos_medicamento.nombre);
            datos_medicamento["available"] = 0;
            let disponibles = cantidad;
            for(let id of reservas){
                this.updateMedicamentoReservado(id, datos_medicamento);
                disponibles--
                if (!disponibles) break;
            }
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
        async caducarMedicamento(obj, {id, razon}){
            try {
                const medicamento = await MedicamentoStock.findById(id);
                const newMedicamento = {
                    nombre: medicamento.nombre,
                    codigo: medicamento.codigo,
                    descripcion: razon,
                    caducidad: medicamento.caducidad,
                    fechaingreso: medicamento.fechaingreso,
                    partida: medicamento.partida,
                }
                const merma = new medicamentoMerma(newMedicamento)
                await merma.save();
                await medicamento.deleteOne({_id: id});
                return {
                    message: "Medicamento satisfactoriamente marcado como Merma."
                }
            } catch (e) {
                console.log(e);
            }
            
        },
        async filtrarMedicamentos(obj, {id_list}){
            try {
                for (let i = 0; i < id_list.length; i++) {
                    const id_medicamento = array[i];
                    const medicamento = await MedicamentoStock.findById(id_medicamento);
                    const expirationDate = new Date(medicamento.caducidad);
                    if (expirationDate.getTime() >= Date.now().getTime()){
                        await this.caducarMedicamento({}, {id, razon: 'caduco'})
                    }
                }
                return {
                    message: "Medicamentos filtrados satisfactoriamente."
                }
            } catch (e) {
                console.log(e);
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
