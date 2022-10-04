const {gql} = require("apollo-server-express");

const typeDefs = gql`

type Medico{
    id: ID!
    rut: String!
    nombre: String!
    apellido: String!
    email: String!
    telefono: String!
    pass: String!
    recetas: [Receta]
}

type Farmaceutico{
    id: ID!
    rut: String!
    nombre: String!
    apellido: String!
    email: String!
    telefono: String!
    pass: String!
    registros: [Registro]
}

type Paciente{
    id: ID!
    rut: String!
    nombre: String!
    apellido: String!
    email: String!
    telefono: String!
    pass: String!
    recetas: [Receta]
}

type MedicamentoStock{
    id: ID!
    nombre: String!
    codigo: String!
    descripcion: String!
    caducidad: String!
    fechaingreso: String!
    partida: String!
}

type Receta{
    id: ID!
    medico: Medico!
    remedios: [MedicamentoStock]!
    descripcion: String!
    entregado: Boolean!
    fechaEmision: String!
    periodosRetiro: [String]
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

type Merma{
    id: MedicamentoStock!
}

type Contraindicacion {
    id: MedicamentoStock!
    descripcion: String!
}

type Registro{
    id: ID!
    farmaceutico: Farmaceutico!
    rutRetira: String!
    receta: Receta!
    fechaRetiro: String
}

type Alert{
    message: String
}

type Query {
    getMedicamentosStock: [MedicamentoStock]
    getMedicamentoStock(id: ID!): MedicamentoStock
    getRecetas: [Receta]
    getReceta(id: ID!): Receta
    getMedicos: [Medico]
    getMedico(id: ID!): Medico
    getPacientes: [Paciente]
    getPaciente(id: ID!): Paciente
    getRegistros: [Registro]
    getRegistro(id: ID!): Registro
    getMermas: [Merma]
    getMerma(id: ID!): Merma
    getContraindicaciones: [Contraindicacion]
    getContraindicacion(id: ID!): Contraindicacion
    getMedicamentosReservados: [MedicamentoReservado]
    getMedicamentoReservado(id: ID!): MedicamentoReservado
}

input MedicamentoStockInput{
    nombre: String!
    codigo: String!
    descripcion: String!
    caducidad: String!
    fechaingreso: String!
    partida: String!
}

input RecetaInput{
    medico: String!
    remedios: [String]!
    descripcion: String!
    entregado: Boolean!
    fechaEmision: String!
    periodosRetiro: [String]
}

input MedicoInput {
    rut: String!
    nombre: String!
    apellido: String!
    email: String!
    telefono: String!
    pass: String!
    recetas: [String]
}

input PacienteInput {
    rut: String!
    nombre: String!
    apellido: String!
    email: String!
    telefono: String!
    pass: String!
}

input RegistroInput {
    farmaceutico: String!
    rutRetira: String!
    receta: String!
    fechaRetiro: String
    medicamentosRechazados:[String]!
}

input MermaInput{
    id: String!
}

input ContraindicacionInput{
    id: String!
    descripcion: String!
}

input MedicamentoReservadoInput{
    nombre: String!
    codigo: String!
    cantidad: String!
    descripcion: String!
    caducidad: Int!
    fechaIngreso: String
    partida: String
    available: Boolean!
}

input FarmaceuticoInput{
    rut: String!
    nombre: String!
    apellido: String!
    email: String!
    telefono: String!
    pass: String!
    registros: [String]
}

input CaducarMedicamentoInput{
    id: String!
    razon: String!
}
input FiltrarMedicamentosInput{
    id: [String!]!
}

type Mutation{
    addMedicamentoStock(input: MedicamentoStockInput): MedicamentoStock
    updateMedicamentoStock(id: ID!, input: MedicamentoStockInput) : MedicamentoStock
    deleteMedicamentoStock(id: ID!): Alert
    addReceta(input: RecetaInput): Receta
    updateReceta(id: ID!, input: RecetaInput) : Receta
    deleteReceta(id: ID!): Alert
    addMedico(input: MedicoInput): Medico
    updateMedico(id: ID!, input: MedicoInput) : Medico
    deleteMedico(id: ID!): Alert
    addPaciente(input: PacienteInput): Paciente
    updatePaciente(id: ID!, input: PacienteInput) : Paciente
    deletePaciente(id: ID!): Alert
    addRegistro(input: RegistroInput): Registro
    updateRegistro(id: ID!, input: RegistroInput) : Registro
    deleteRegistro(id: ID!): Alert
    addMerma(input: MermaInput): Merma
    updateMerma(id: ID!, input: MermaInput) : Merma
    deleteMerma(id: ID!): Alert
    addContraindicacion(input: ContraindicacionInput): Contraindicacion
    updateContraindicacion(id: ID!, input: ContraindicacionInput) : Contraindicacion
    deleteContraindicacion(id: ID!): Alert
    addMedicamentoReservado(input: MedicamentoReservadoInput): MedicamentoReservado
    updateMedicamentoReservado(id: ID!, input: MedicamentoReservadoInput) : MedicamentoReservado
    deleteMedicamentoReservado(id: ID!): Alert
    addFarmaceutico(input: FarmaceuticoInput): Farmaceutico
    updateFarmaceutico(id: ID!, input: FarmaceuticoInput) : Farmaceutico
    deleteFarmaceutico(id: ID!): Alert
    caducarMedicamento(input: CaducarMedicamentoInput) : Alert
    filtrarMedicamentos(input: FiltrarMedicamentosInput) : Alert
}

`;

module.exports = typeDefs;