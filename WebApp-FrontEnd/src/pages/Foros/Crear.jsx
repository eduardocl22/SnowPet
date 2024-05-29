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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export const Crear = ({ openDialog, setOpenDialog, setOpen, setOpen1, setMessage, setRender }) => {
  const { user } = React.useContext(AuthContext);
  const [data_dos, set_data_dos] = React.useState([]);
  const [data_tres, set_data_tres] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
  });


  const onSubmit = async (data) => {
    let obj = limpiarObjeto(data);
    let Send = { ...obj, "id_usuario": user.id_usuario };

    try {
      const response = await axios.post(`${urlapi}/foro/Guardar`, Send);
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
  const loadData = async () => {
    setLoading(true);
    try {
      const response_dos = await axios.get(`${urlapi}/anuncio/obtener`);
      set_data_dos(response_dos.data.results);
    } catch (error) {
      console.error("Error loading anuncio:", error);
    }
    try {
      const response_tres = await axios.get(`${urlapi}/consejo/obtener`);
      set_data_tres(response_tres.data.results);
    } catch (error) {
      console.error("Error loading consejo:", error);
    }
    setLoading(false);
  };
  React.useEffect(() => {
    loadData();
  }, [])

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
        <DialogTitle id="scroll-dialog-title">CREAR FORO</DialogTitle>
        <DialogContent dividers={true}>
          <FormControl sx={{ minWidth: 400, mb: 4, textAlign: "start" }}>
            <TextField
              {...register("tipo", {
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
              helperText={errors?.tipo?.message}
              error={errors?.tipo ? true : false}
              sx={{ mb: 1, mt: 1 }}
              label="tipo"
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
              {...register("fecha", {
                required: "Es requerido",
              })}
              error={errors?.fecha ? true : false}
              type='date'
              //focused
              helperText={errors?.fecha?.message}
              sx={{ mb: 1, mt: 1 }}
              label="fecha"
              variant="outlined"
            />
            {loading === true ? null : <>
              <FormControl  >
                <InputLabel >anuncio</InputLabel>
                <Select
                  label="anuncio"
                  name='id_noticias'
                  labelId='id_noticias'
                  {...register("id_noticias", {
                    required: "Es requerido",
                  })}
                  error={errors?.id_noticias ? true : false}
                  
              sx={{ mb: 1, mt: 1 }}

                >
                  <MenuItem value="" disabled>
                    <em>None</em>
                  </MenuItem>
                  {data_dos?.map(item=>(
                  <MenuItem key={item?.id_noticias} value={item?.id_noticias}>{item?.titulo} </MenuItem>

                  )
                  )}
                 
                </Select>
              </FormControl>
              <FormControl >
                <InputLabel >consejo</InputLabel>
                <Select
                  labelId='id_consejo'
                  label="consejo"
                  name='id_consejo'
                  {...register("id_consejo", {
                    required: "Es requerido",
                  })}
                  error={errors?.id_consejo ? true : false}
                >
                  <MenuItem disabled value="">
                    <em>None</em>
                  </MenuItem>
                  {data_tres?.map(item=>(
                  <MenuItem key={item?.id_consejo} value={item?.id_consejo}>{item?.titulo} </MenuItem>
                  )
                  )}
                </Select>
              </FormControl>
            </>}
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
