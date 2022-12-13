import React, { useState, useEffect, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid'
import useAuth from "../hooks/useAuth";
import {
  Modal, Box,
  Button, Typography,
  Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions, TextField
} from '@mui/material';
import axios from 'axios';

const GET_MEDICAMENTOS_STOCK = `
  query getMedicamentosStock {
   getMedicamentosStock {
      id
      nombre
      codigo
      descripcion
      caducidad
      fechaingreso
      partida
    }
  }
`;

const Stock = () => {
  const { auth } = useAuth();
  const [modalDetailVisble, setModalDetailVisble] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [current, setCurrent] = useState({individuales: []});
  const [data, setData] = useState([]);
  const [currentCounts, setCurrentCounts] = useState([]);
  const [currentCaducar, setCurrentCaducar] = useState('');
  const messageRef = useRef(null);

  useEffect (() => {
    const fetchData = async () => {
      const queryData = await axios.post('http://localhost:8090/graphql', {
        query: GET_MEDICAMENTOS_STOCK
      });
      const result = queryData.data.data.getMedicamentosStock;
      const newArray = result.map((m) => [m.nombre, m]);
      const newMap = new Map(newArray);
      const iterator = newMap.values();
      const unique = [...iterator];
      let count = []
      for (let element_index = 0; element_index < unique.length; element_index++) {
        count[element_index] = [unique[element_index].nombre,result.filter(x => x.nombre == unique[element_index].nombre).length]
      };

      for (let i = 0; i < unique.length; i++) {
        unique[i].cantidad = count[i][1];
      };

      setData(unique);
      setCurrentCounts(count);
    };
    fetchData();
  }, [])

  const handleClose = () => {
    setModalDetailVisble(false);
  };
  const handleOpen = () => {
    setModalDetailVisble(true);
  };
  const handleVerDetalles = (row) => {
    const fetchCurrent = async () => {
      const queryData = await axios.post('http://localhost:8090/graphql', {
        query: GET_MEDICAMENTOS_STOCK
      });
      const result = queryData.data.data.getMedicamentosStock;
      const filteredResult = result.filter( medicamento => medicamento.nombre === row.nombre);
      console.log(filteredResult);
      setCurrent(filteredResult);
    };
    fetchCurrent();
    handleOpen();
  };

  const handleVerCaducar = () => {
    setOpenDialog(true);
  }
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleCaducar = async () => {
    console.log(currentCaducar);
    console.log(messageRef.current.value);
    const requestBody = {
      query: `mutation Mutation($input: CaducarMedicamentoInput) {
        caducarMedicamento(input: $input) {
          message,
        }
      }`,
      variables: {
        input: {
          "id": currentCaducar,
          "razon": "caducado"
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
    let data = results.json().message;
    console.log(data);
    handleCloseDialog();
  };
  
  const ModalStock = () => {  
    const setDetailRows = (rows) => {
      const newRows = [];
      for (let row_index = 0; row_index < rows.length; row_index++) {
        const row = rows[row_index];
        newRows.push({
          id: row.id,
          partida: row.partida,
          fechaIngreso: row.fechaingreso,
          fechaVencimiento: row.caducidad,
          cantidad: 1,
          accion: "accion",
        })
      }
      return newRows;
    };

    const detailColumns = [
      { field: 'partida', headerName: 'id partida', flex: 1},
      { field: 'fechaIngreso', headerName: 'Fecha de ingreso', flex: 1},
      { field: 'fechaVencimiento', headerName: 'Fecha de vencimiento', flex: 1},
      { field: 'cantidad', headerName: 'Cantidad', flex: 1},
      {
        field: 'accion',
        headerName: 'Caducar',
        flex: 1,
        renderCell: ({ row }) => (
          <div>
            {auth.tipo === 'farmaceutico' &&
            <Button
              variant="contained"
              sx={{ m: 1 }}
              onClick={() => {
                setCurrentCaducar(row.id);
                handleVerCaducar()
                }
              }
            >
              <Typography
                variant="button"
                color='white'
              >
                Caducar
              </Typography>
            </Button>
            }
          </div>
        ),
      },
    ]
    
    return (
      <Modal
          open={modalDetailVisble}
          onClose={handleClose}
        >
          <Box sx={
            {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              width: '80%',
              p: 4,
            }
          }
          >
            <div style={{ width: '100%' }}>
              <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Confirme la acción
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    ¿Desea caducar este medicamento?
                  </DialogContentText>
                  <TextField
                    required={true}
                    ref={messageRef}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Razón de caducidad"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="contained"
                    onClick={handleCaducar}
                  >
                    <Typography>
                      Caducar
                    </Typography>
                  </Button>
                  <Button 
                    variant="contained"
                    onClick={handleCloseDialog}
                    sx={{backgroundColor: 'red'}}
                  >
                    <Typography>
                      Cancelar
                    </Typography>
                  </Button>
                </DialogActions>
              </Dialog>
              <DataGrid rows={setDetailRows(current)} columns={detailColumns} autoHeight hideFooter/>
            </div>
          </Box>
        </Modal>
    )
  }

  const setRows = (rows) => {
    const newRows = [];
    for (let row_index = 0; row_index < rows.length; row_index++) {
      const row = rows[row_index];
      newRows.push({
        id: row.id,
        nombre: row.nombre,
        descripcion: row.descripcion,
        cantidad: row.cantidad,
        individuales: row.individuales,
        accion: "accion",
      })
    }
    return newRows;
  };

  const columns = [
    { field: 'nombre', headerName: 'Nombre', flex: 1},
    { field: 'descripcion', headerName: 'Descripción', flex: 1},
    { field: 'cantidad', headerName: 'Cantidad', flex: 1},
    {
      field: 'accion',
      headerName: 'Acción',
      flex: 1,
      renderCell: ({ row }) => (
        <div>
          <Button
            variant="contained"
            sx={{ m: 1 }}
            onClick={() => handleVerDetalles(row)}
          >
            <Typography
              variant="button"
              color='white'
            >
              Detalles
            </Typography>
          </Button>
        </div>
      ),
    },
  ]
  return (
    <div style={{ width: '100%' }}>
      <ModalStock />
      <DataGrid rows={setRows(data)} columns={columns} getRowId={row =>  row.id} autoHeight hideFooter />
    </div>
  );
}

export default Stock;