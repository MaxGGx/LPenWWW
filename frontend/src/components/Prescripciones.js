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

function createData(name_prescripcion, nombrePaciente, rutPaciente, descripcion ,id_prescripcion){
  return{
    name_prescripcion,
    nombrePaciente,
    rutPaciente,
    descripcion,
    //Usar id prescripcion para obtener los medicamentos
    medicamentos:[
      {
        nombre_medicamento: 'Paracetamol',
        id_medicamento: "111222333",
        cantidad: "500"
      }
    ]
  }
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
        {
        //<TableCell>
        //  <DescriptionIcon>DescriptionIcon</DescriptionIcon>
        //</TableCell>
        }
        <TableCell scope="row">
          {row.name_prescripcion}
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
                  {row.medicamentos.map((medicamentoRow) => (
                    <TableRow key={medicamentoRow.id_medicamento}>
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

const rows = [
  createData("Receta 1", "Pepe", "1.111.111-1", "Tomar cada 10 hr","111222333"),
  createData("Receta 2", "Pepe2", "2.111.111-1", "Tomar 1 hr","444555666"),
  createData("Receta 3", "Pepe3", "3.111.111-1", "Tomar cada 15 hr","777888999")
]

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nombre de Receta</TableCell>
            <TableCell><BasicModal/></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
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