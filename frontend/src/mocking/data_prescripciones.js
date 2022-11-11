const prescripciones = [
    {
        name_prescripcion: "Prescripcion 1",
        nombrePaciente: "Pepe 1",
        rutPaciente:"1.111.111-1",
        descripcion: "Tomar remedios cada x hrs",
        medicamentos: [
            {
                nombre_medicamento:"Zival",
                id_medicamento: "11222",
                cantidad: "500",
                estado: "Entregado",
            }
        ]
    },
    {
        name_prescripcion: "Prescripcion 2",
        nombrePaciente: "Pepe 2",
        rutPaciente:"2.222.222-1",
        descripcion: "Tomar remedios cada y hrs",
        medicamentos: [
            {
                nombre_medicamento:"Zival",
                id_medicamento: "11222",
                cantidad: "50",
                estado: "No Entregado",
                
            },
            {
                nombre_medicamento:"Bion 3",
                id_medicamento: "11222333",
                cantidad: "5",
                estado: "No entregado",
            }
        ]
    },
    {
        name_prescripcion: "Prescripcion 3",
        nombrePaciente: "Pepe 3",
        rutPaciente:"1.111.111-3",
        descripcion: "Tomar remedios cada Z hrs",
        medicamentos: [
            {
                nombre_medicamento:"Paracetamol",
                id_medicamento: "11222",
                cantidad: "50",
                estado: "Entregado",
            }
        ]
    },
    {
        name_prescripcion: "Prescripcion 4",
        nombrePaciente: "Benjamin",
        rutPaciente:"1.111.111-1",
        descripcion: "Tomar remedios cada x hrs",
        medicamentos: [
            {
                nombre_medicamento:"Antialergico",
                id_medicamento: "11222",
                cantidad: "500",
                estado: "Entregado",
            },
            {
                nombre_medicamento:"Paracetamol",
                id_medicamento: "11222",
                cantidad: "500",
                estado: "Entregado",
            }
        ]
    },
    {
        name_prescripcion: "Prescripcion 5",
        nombrePaciente: "Claudio",
        rutPaciente:"1.111.111-1",
        descripcion: "Tomar remedios cada x hrs",
        medicamentos: [
            {
                nombre_medicamento:"Vitamina C",
                id_medicamento: "11222",
                cantidad: "500",
                estado: "Entregado",
            },
            {
                nombre_medicamento:"Cetrizina",
                id_medicamento: "11222",
                cantidad: "500",
                estado: "Entregado",
            }
        ]
    }
]

export default prescripciones