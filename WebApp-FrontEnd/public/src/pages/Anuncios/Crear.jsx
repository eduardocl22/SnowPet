import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm, Controller } from "react-hook-form";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { urlapi } from '../../Config/urlapi';
import { AuthContext } from '../../context/AuthContext';
import { limpiarObjeto } from '../../Helpers/CleanOject';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const Crear = ({ openDialog, setOpenDialog, setOpen, setOpen1, setMessage, setRender }) => {
  const { user } = React.useContext(AuthContext);
  const { register, handleSubmit, reset, formState: { errors, isValid }, control,setValue } = useForm({ mode: 'onChange' });
  const [mascotas, setMascotas] = React.useState([]);
  const [selectedMascotas, setSelectedMascotas] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setValue('foto', null); 
      alert('Solo se permiten archivos de imagen (JPG, PNG, GIF).');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setValue('fotoSend',{
        "base64":reader.result,
        "estension":file.name.split('.').pop().toLowerCase()
      });
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (event) => {
    const { target: { value } } = event;
    setSelectedMascotas(typeof value === 'string' ? value.split(',') : value);
  };

 

  const onSubmit = async (data) => {
    let obj = limpiarObjeto(data);
    let Send = { ...obj, "idusuario": user.id_usuario, "list_dataD": selectedMascotas };
    console.log(Send);

    try {
      const response = await axios.post(`${urlapi}/anuncio/Guardar`, Send);
      if (response.status === 200) {
        setMessage(response?.data?.message);
        setOpen(true);
        reset();
        setOpenDialog(false);
        setRender();
      }
    } catch (error) {
      setOpen1(true);
      if (error?.response?.data?.message?.detail) {
        setMessage(error?.response?.data?.message?.detail);
      } else if (error?.response?.data?.message) {
        setMessage(error?.response?.data?.message);
      } else {
        setMessage('Error desconocido');
      }
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${urlapi}/mascota/obtener`);
      setMascotas(response.data.results);
    } catch (error) {
      console.error("Error loading mascotas:", error);
    }
    setLoading(false);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  return (
    <React.Fragment>
      <Dialog
        component={'form'} onSubmit={handleSubmit(onSubmit)}
        open={openDialog}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">CREAR ANUNCIO</DialogTitle>
        <DialogContent dividers={true}>
          <FormControl sx={{ minWidth: 400, mb: 4, textAlign: "start" }}>
            <TextField
              {...register("titulo", {
                required: "Es requerido",
                maxLength: {
                  value: 200,
                  message: "Max length 200"
                },
                minLength: {
                  value: 1,
                  message: "Min length 1"
                }
              })}
              helperText={errors?.titulo?.message}
              error={errors?.titulo ? true : false}
              sx={{ mb: 1, mt: 1 }}
              label="titulo"
              variant="outlined"
            />
            <TextField
              {...register("descripcion", {
                required: "Es requerido",
                maxLength: {
                  value: 400,
                  message: "Max length 400"
                },
                minLength: {
                  value: 1,
                  message: "Min length 1"
                }
              })}
              helperText={errors?.descripcion?.message}
              error={errors?.descripcion ? true : false}
              sx={{ mb: 1, mt: 1 }}
              label="descripcion"
              variant="outlined"
            />
            <TextField
              {...register("telefono", {
                required: "Es requerido",
                maxLength: {
                  value: 30,
                  message: "Max length 30"
                },
                minLength: {
                  value: 1,
                  message: "Min length 1"
                }
              })}
              helperText={errors?.telefono?.message}
              error={errors?.telefono ? true : false}
              sx={{ mb: 1, mt: 1 }}
              label="telefono"
              variant="outlined"
            />
            <TextField
              {...register("foto", {
                required: "Es requerido",
              })}
              onChange={handleFileChange}
              helperText={errors?.foto?.message}
              error={errors?.foto ? true : false}
              sx={{ mb: 1, mt: 1 }}
              label="foto"
              type='file'
              variant="outlined"
            />
            <TextField
              {...register("direccion", {
                required: "Es requerido",
                maxLength: {
                  value: 200,
                  message: "Max length 200"
                },
                minLength: {
                  value: 1,
                  message: "Min length 1"
                }
              })}
              helperText={errors?.direccion?.message}
              error={errors?.direccion ? true : false}
              sx={{ mb: 1, mt: 1 }}
              label="direccion"
              variant="outlined"
            />
            <TextField
              {...register("recompensa", {
                required: "Es requerido",
                maxLength: {
                  value: 400,
                  message: "Max length 400"
                },
                minLength: {
                  value: 1,
                  message: "Min length 1"
                }
              })}
              helperText={errors?.recompensa?.message}
              error={errors?.recompensa ? true : false}
              sx={{ mb: 1, mt: 1 }}
              label="recompensa"
              variant="outlined"
            />
            <TextField
              {...register("observacion", {
                required: "Es requerido",
                maxLength: {
                  value: 400,
                  message: "Max length 400"
                },
                minLength: {
                  value: 1,
                  message: "Min length 1"
                }
              })}
              helperText={errors?.observacion?.message}
              error={errors?.observacion ? true : false}
              sx={{ mb: 1, mt: 1 }}
              label="observacion"
              variant="outlined"
            />
            <TextField
              {...register("fecha", {
                required: "Es requerido",
              })}
              type='date'
              helperText={errors?.fecha?.message}
              error={errors?.fecha ? true : false}
              sx={{ mb: 1, mt: 1 }}
              label="fecha"
              variant="outlined"
            />
            {loading===true?null:<Controller
              name="list_dataD"
              control={control}
              defaultValue={[]}
              rules={{
                validate: value => value.length > 0 || 'Debes seleccionar al menos una mascota'
              }}
              render={({ field }) => (
                <FormControl error={!!errors.list_dataD}>
                  <InputLabel id="demo-multiple-checkbox-label">mascotas</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    multiple
                    fullWidth
                    value={field.value}
                    onChange={(event) => {
                      handleChange(event);
                      field.onChange(event.target.value);
                    }}
                    input={<OutlinedInput label="mascotas" />}
                    renderValue={(selected) => selected.map(id => {
                      const mascota = mascotas.find(m => m.id_mascota === id);
                      return mascota ? `(${mascota.id_mascota} - ${mascota.nombre})` : id;
                    }).join(', ')}
                    MenuProps={MenuProps}
                  >
                    {mascotas.map((mascota) => (
                      <MenuItem key={mascota.id_mascota} value={mascota.id_mascota}>
                        <Checkbox checked={selectedMascotas.indexOf(mascota.id_mascota) > -1} />
                        <ListItemText primary={`(${mascota.nombre} - ${mascota.id_mascota})`} />
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.list_dataD && <p style={{ color: 'red' }}>{errors.list_dataD.message}</p>}
                </FormControl>
              )}
            />}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='warning' onClick={handleClose}>Cancelar</Button>
          <Button variant='contained' type='submit' disabled={!isValid}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
