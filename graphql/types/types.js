const {gql} = require("apollo-server-express");

const typeDefs = gql`
type Usuario{
    id: ID!
    rut: String!
    nombre: String!
    apellido: String!
    email: String!
    telefono: String!
    pass: String!
    tipo: String!
}

type Paciente{
    id: [Usuario]
}

type Receta{
    id: ID!
    medico: Medico!
    remedios: [MedicamentoStock]!
    descripcion: String!
    entregado: Boolean!
    fechaEmision: String!
}

type MedicamentoReservado{
    id: ID!
    nombre: String!
    codigo: String!
    cantidad: String!
    descripcion: String!
    caducidad: Int!
    fechaIngreso: String
    partida: String
    available: Boolean!
}

type Registro{
    id: ID!
    farmaceutico: [Farmaceutico]!
    rutRetira: String!
    receta: Receta!
    fechaRetiro: String
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
    getPacientes(id: ID!): Usuario
}

type Mutation{
    addUsuario(input: UsuarioInput): Usuario
    updateUsuario(id: ID!, input: UsuarioInput) : Usuario
    deleteUsuario(id: ID!): Alert
}

`;

module.exports = typeDefs;