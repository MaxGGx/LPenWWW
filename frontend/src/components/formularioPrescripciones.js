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
import medicamentosPresc from '../mocking/data_medicamentos';



const medicamentos = medicamentosPresc

export default function BasicSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [serviceList, setServiceList] = useState([{ service: "" }]);

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

  return (
    <Box sx={{ minWidth: 120 }}>
      <form>
          <Stack spacing={4} sx={{ justifyContent: 'space-between' }}>
            <Stack alignItems="center">
              <Typography variant="h5">Crear Receta</Typography>
            </Stack>
            
            <Stack spacing={2}>
              <TextField required label="RUT de paciente"/>
              <TextField required multiline={true} minRows={5} maxRows={5} type="text" label="Descripción" />
              <Typography variant="h6">Medicamentos</Typography>
              <div className="form-field-scrollable" id="test">
                {serviceList.map((singleService, index) => (
                  <div key={index} className="services">
                    <div className="first-division">
                      <Stack spacing={1}>
                        <Autocomplete
                          disablePortal
                          name="service"
                          id="service"
                          value={singleService.service}
                          onChange={(e) => handleServiceChange(e, index)}
                          options={medicamentos}
                          renderInput={(params) => <TextField {...params} label="Medicamento" />}
                          required
                        />
                        <div className="second-division">
                          {serviceList.length !== 1 && (
                            <Button
                              type="button"
                              onClick={() => handleServiceRemove(index)}
                              color="error"
                              variant="contained"
                            >
                              <span>Quitar</span>
                            </Button>
                          )}
                          <div>&nbsp;</div>
                        </div>
                        {serviceList.length - 1 === index && serviceList.length < 10 && (
                          <Button
                            type="button"
                            onClick={handleServiceAdd}
                            color="secondary"
                            variant="contained"
                            fullWidth="0"
                          >
                            <span>Agregar medicamento</span>
                          </Button>
                        )}
                      </Stack>
                    </div>
                  </div>
                ))}
              </div>
            </Stack>
            <Stack spacing={1}>
              <Button type="submit" variant="contained">Crear receta</Button>
              
            </Stack>
          </Stack>
      </form>
    </Box>
  );
}
