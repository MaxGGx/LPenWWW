import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Input,
  Grid,
  TextField,
  Paper,
  Button,
  Alert,
  Stack,
  Typography,
  SelectChangeEvent,
  Autocomplete,
} from '@mui/material';

/* Mock data */
//import medicamentosPresc from '../mocking/data_medicamentos';
//let medicamentos = medicamentosPresc;


let medicamentos = [{label:"Cargando..."}]

function getCurrentDate(separator=''){

  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  
  return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
}

/* Versión fetch */
async function handleMeds(){  
  const requestBody = {
    query:`query GetMedicamentosStock {
      getMedicamentosStock {
        nombre
      }
    }
    `
  }
  let results = await fetch('http://localhost:8090/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  let data = await results.json();
  let lista = []
  for(let i = 0; i<data.data.getMedicamentosStock.length; i++){
    lista.push({label: data.data.getMedicamentosStock[i].nombre})
  }
  console.log(lista)
  
  return lista;
}

async function addReceta(desc, fecha, meds){
  const requestBody = {
    query: `mutation Mutation($input: RecetaInput) {
      addReceta(input: $input) {
        medico
      }
    }`,
    variables: {
      input: {
        "descripcion": desc,
        "entregado": false,
        "fechaEmision": fecha,
        "medico": "MedicoTest",
        "paciente": "PacienteTest",
        "remedios": meds
      }
    }
  }
  let results = await fetch('http://localhost:8090/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  let data = results.json();
  console.log("EXITO",data)
  return 
}

export default function BasicSelect() {
  const [age, setAge] = React.useState('');
  const [data, setData] = React.useState(0);
  const [rut, setRUT] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [serviceList, setServiceList] = useState([{ service: "" }]);
  const [remedios, setremedios] = useState('');


  handleMeds().then((res) => {medicamentos = res;console.log("AAA")});

  const handleReceta = () => {
    addReceta(desc,getCurrentDate(),remedios.split("\n")).then(console.log("LISTO"))
  }

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  
  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    setServiceList(list);
  };

  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "" }]);
  };

  const handleRUTChange = event => {
    setRUT(event.target.value)
    console.log("RUT ES "+rut)
  }

  const handleDescChange = event => {
    setDesc(event.target.value)
    console.log("DESC ES "+desc)
  }

  const handleRemedioChange = event => {
    setremedios(event.target.value)
    console.log("remedios son "+remedios)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <form>
          <Stack spacing={4} sx={{ justifyContent: 'space-between' }}>
            <Stack alignItems="center">
              <Typography variant="h5">Crear Receta</Typography>
            </Stack>
            
            <Stack spacing={2}>
              <TextField required onChange={handleRUTChange} label="RUT de paciente"/>
              <TextField required onChange={handleDescChange} multiline={true} minRows={5} maxRows={5} type="text" label="Descripción" />
              <Typography variant="h6">Medicamentos</Typography>
              <TextField required onChange={handleRemedioChange} multiline={true} minRows={5} maxRows={5} type="text" label="Escriba los Medicamentos (1 por línea)" />
            </Stack>
            <Stack spacing={1}>
              <Button onClick={handleReceta} variant="contained">Crear receta</Button>
              
            </Stack>
          </Stack>
      </form>
    </Box>
  );
}
