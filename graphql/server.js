const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const {ApolloServer, gql} = require("apollo-server-express");
const {merge} = require("lodash");
const typeDefs = require("./types/types")

const Usuario = require("./models/usuario");
const MedicamentoReservado = require("./models/medicamentoReservado");
const Receta = require("./models/receta");
const Registro = require("./models/registro");

mongoose.connect('mongodb+srv://MaxX_X:HdrMD9UJhZyate6@cluster0.gi49kts.mongodb.net/test', {useNewUrlParser:true, useUnifiedTopology:true});

//CHEQUEAR IMPLEMENTACIÓN QUERY GETPACIENTES

const resolvers = {
    Query: {
        async getUsuarios(obj){
            const usuarios = await Usuario.find();
            return usuarios;
        },
        async getUsuario(obj, {id}){
            const usuario = await Usuario.findById(id);
            return usuario;
        },
        async getReceta(obj){
            const recetas= await Receta.find();
            return recetas
        },
        async getReceta(obj,{id}){
            const recetas= await Receta.findById(id)
            return recetas
        },
        async getMedico(obj){
            const medicos= await Medico.find()
            return medicos
        },
        async getMedico(obj,{id}){
            const medicos= await Medico.find(id)
            return medicos
        },
        async getPaciente(obj){
            const pacientes= await Paciente.find()
            return pacientes
        },
        async getPaciente(obj,{id}){
            const pacientes= await Paciente.findById(id)
            return pacientes
        },
        async getRegistro(obj){
            const registros= await Registro.find()
            return registros
        },
        async getRegistro(obj,{id}){
            const registros= await Registro.findById(id)
            return registros
        },
        async getMerma(obj){
            const mermas= await Merma.find()
            return mermas
        },
        async getMerma(obj,{id}){
            const mermas= await Merma.findById(id)
            return mermas
        },
        async getContraindicacion(obj){
            const contraindicaciones= await Contraindicacion.find()
            return contraindicaciones
        },
        async getContraindicacion(obj,{id}){
            const contraindicaciones= await Contraindicacion.findById(id)
            return contraindicaciones
        },
        async getMedicamentoReservado(obj){
            const medicamentosr= await MedicamentoReservado.find()
            return medicamentosr
        },
        async getMedicamentoReservado(obj,{id}){
            const medicamentosr= await MedicamentoReservado.findById(id)
            return medicamentosr
        }

    },
    Mutation: {
        async addUsuario(obj, {input}){
            const usuario = new Usuario(input);
            await usuario.save();
            return usuario;
        },
        async updateUsuario(obj, {id, input}){
            const usuario = await Usuario.findByIdAndUpdate(id, input);
            return usuario;
        },
        async deleteUsuario(obj, {id}){
            await Usuario.deleteOne({_id: id});
            return {
                message: "Usuario eliminado"
            }
        }
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
