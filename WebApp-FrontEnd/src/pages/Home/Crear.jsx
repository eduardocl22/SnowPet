import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from "react-hook-form";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { urlapi } from '../../Config/urlapi';
import { AuthContext } from '../../context/AuthContext';
import { limpiarObjeto } from '../../Helpers/CleanOject';

export const Crear = ({ openDialog, setOpenDialog, setOpen, setOpen1, setMessage, setRender }) => {
  const { user } = React.useContext(AuthContext);

  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
    mode: 'onChange', // Habilita la validación en cada cambio
  });


  const onSubmit = async (data) => {
    let obj = limpiarObjeto(data);
    let Send = { ...obj, "idusuario": user.id_usuario };

    try {
      const response = await axios.post(`${urlapi}/mascota/Guardar`, Send);
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
  }

  const handleClose = () => {
    setOpenDialog(false);
  };

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
        <DialogTitle id="scroll-dialog-title">CREAR MASCOTA</DialogTitle>
        <DialogContent dividers={true}>
          <FormControl sx={{ minWidth: 400, mb: 4, textAlign: "start" }}>
            <TextField
              {...register("nombre", {
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
              helperText={errors?.nombre?.message}
              error={errors?.nombre ? true : false}
              sx={{ mb: 1, mt: 1 }}
              label="nombre"
              variant="outlined"
            />
            <TextField
              {...register("raza", {
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
              helperText={errors?.raza?.message}
              error={errors?.raza ? true : false}
              sx={{ mb: 1, mt: 1 }}
              label="raza"
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
              {...register("fechanac", {
                required: "Es requerido",
              })}
              type='date'
              //focused
              helperText={errors?.fechanac?.message}
              error={errors?.fechanac ? true : false}
              sx={{ mb: 1, mt: 1 }}
              label="fecha nacimiento"
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

          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='warning' onClick={handleClose}>Cancelar</Button>
          <Button variant='contained' type='submit' disabled={!isValid}> Guardar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
