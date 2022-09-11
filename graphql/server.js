const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const {ApolloServer, gql} = require("apollo-server-express");
const {merge} = require("lodash");

const Usuario = require("./models/usuario");

mongoose.connect('mongodb+srv://MaxX_X:HdrMD9UJhZyate6@cluster0.gi49kts.mongodb.net/test', {useNewUrlParser:true, useUnifiedTopology:true});

const typeDefs = gql`
type Usuario{
    id: ID!
    email: String!
    pass: String!
}

type Alert{
    message: String
}

input UsuarioInput{
    email: String!
    pass: String!
}

type Query {
    getUsuarios: [Usuario]
    getUsuario(id: ID!) : Usuario
}

type Mutation{
    addUsuario(input: UsuarioInput): Usuario
    updateUsuario(id: ID!, input: UsuarioInput) : Usuario
    deleteUsuario(id: ID!): Alert
}

`;


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
