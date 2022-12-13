import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PropTypes from 'prop-types'
import DescriptionIcon from '@mui/icons-material/Description';
import Button from '@mui/material/Button';
import BasicModal from './modalPrescripciones';
import { useEffect } from 'react';

import prescripciones from '../mocking/data_prescripciones';


async function handlePreps(){  
  const requestBody = {
    query:`query GetRecetas {
      getRecetas {
        descripcion,
        paciente,
        remedios,
        entregado
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
  for(let i = 0; i<data.data.getRecetas.length; i++){
    let meds = []
    let temp = data.data.getRecetas[i].remedios;
    for(let a = 0; a<temp.length; a++){
      meds.push({nombre_medicamento: data.data.getRecetas[i].remedios[a].split("-")[0],
                    id_medicamento: Math.floor(Math.random()*10000),
                    cantidad: data.data.getRecetas[i].remedios[a].split("-")[1],
                    estado: "No Entregado"})
    }
    
    lista.push({name_prescripcion: "Prescripcion "+(i+1),
                nombrePaciente: data.data.getRecetas[i].paciente,
                rutPaciente: "11.1111.22-1",
                descripcion: data.data.getRecetas[i].descripcion,
                medicamentos: meds})
    }
  console.log(lista)
  
  return lista;
}


function Row(props){
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell scope="row">
          <>
            <DescriptionIcon>DescriptionIcon</DescriptionIcon> {row.name_prescripcion}
            <Typography>Paciente: {row.nombrePaciente} - Rut: {row.rutPaciente}</Typography>
          </>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h5" gutterBottom component="div">
                Datos de receta
              </Typography>
              <Typography variant="h7" gutterBottom component="div">
                Paciente: {row.nombrePaciente} - Rut: {row.rutPaciente}
              </Typography>
              <Typography variant="h5" gutterBottom component="div">
                Descripción:
              </Typography>
              <Typography>
                {row.descripcion}
              </Typography>
              <Typography variant="h5" gutterBottom component="div">
                Medicamentos:
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Medicamento</TableCell>
                    <TableCell align="right">Cantidad (Mg.)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.medicamentos.map((medicamentoRow, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {medicamentoRow.id_medicamento}
                      </TableCell>
                      <TableCell>{medicamentoRow.nombre_medicamento}</TableCell>
                      <TableCell align="right">{medicamentoRow.cantidad}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name_prescripcion: PropTypes.string.isRequired,
    nombrePaciente: PropTypes.string.isRequired,
    rutPaciente: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    medicamentos: PropTypes.arrayOf(
      PropTypes.shape({
        nombre_medicamento: PropTypes.string.isRequired,
        id_medicamento: PropTypes.string.isRequired,
        cantidad: PropTypes.string.isRequired,
      }),
    ).isRequired
  }).isRequired,
};

let rows = prescripciones


handlePreps().then((res) => {rows = res;console.log("FUNCO")});

export default function CollapsibleTable() {
  useEffect(() => {
    // Update the document title using the browser API
    handlePreps().then((res) => {rows = res;console.log("FUNCO")});
  });
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nombre de Receta</TableCell>
            <TableCell><BasicModal /></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/*const Prescripciones = () => {
  return (
    <Typography>
      aareg
    </Typography>
  );
}

export default Prescripciones;*/