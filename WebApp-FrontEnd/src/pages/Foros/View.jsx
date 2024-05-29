import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Tabla } from './Tabla';
import Button from '@mui/material/Button';
import { urlapi } from '../../Config/urlapi'
import { Crear } from './Crear';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';




const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export const Foros = () => {
  const [data, set_data] = React.useState([]);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [render, setRender] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [message, setMessage] = React.useState(null);

  const loadData = async () => {
    const response = await axios.get(`${urlapi}/foro/obtener`);
    set_data(response.data.results);
  }
  
  const rendetChange = () => setRender(!render)

  React.useEffect(() => {
    loadData();
  }, [render])


  return (

    <Grid container spacing={1} pl={1} pr={1}>
      <Grid item xs={12} md={12} lg={12} xl={12} >
        <Item sx={{ textAlign: "start" }}>
          <Grid container>
            < Grid item xs={8} md={8} lg={8} xl={8} >
              <Typography variant='h5'>
                LISTA DE FOROS
              </Typography>
            </Grid>
            < Grid item xs={4} md={4} lg={4} xl={4} justifyContent={"end"} alignItems={"end"} display={"flex"}>

              <Button variant="contained" onClick={() => setOpenAdd(true)}>
                CREAR
              </Button>
              <Crear setOpenDialog={setOpenAdd} openDialog={openAdd} setOpen={setOpen} setOpen1={setOpen1} setMessage={setMessage} setRender={rendetChange} />
            </Grid>
          </Grid>
        </Item>
      </Grid>
      <Grid item xs={12} md={12} lg={12} xl={12} >
        {data?.length === 0 ?
          <Item sx={{ textAlign: "center" }}>
            <Grid container textAlign={"center"}>
              < Grid item xs={12} md={12} lg={12} xl={12} >
                <Typography  >
                  NO HAY FOROS
                </Typography>
              </Grid>
            </Grid>
          </Item> :
          <Tabla data={data} setMessage={setMessage} setOpen={setOpen} setOpen1={setOpen1} setRender={rendetChange} />}
      </Grid>
      <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Snackbar open={open1} autoHideDuration={4000} onClose={() => setOpen1(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert
          onClose={() => setOpen1(false)}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Grid>
  )
}




