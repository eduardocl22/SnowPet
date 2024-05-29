import { useState } from 'react';
import { useContext } from "react";
import { AuthContext } from '../../../context/AuthContext';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik/dist';

// project imports

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom"
import { urlapi } from '../../../Config/urlapi';
import axios from 'axios';

const FormLogin = () => {

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onLogin = async(values) => {
    console.log(values)
    const response =  await axios.post(`${urlapi}/usuario/iniciarSesionUsuario`, {"correo": values.email,"contrasena": values.password});
    return response;
  }
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2} mb={10}>

        <Grid item xs={12}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        
      </Grid>

      <Formik
        initialValues={{
          email: 'jerson2@gmail.com',
          password: '123456789',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().max(500).required('Usuario es requerido'),
          password: Yup.string().max(200).required('Contraseña es requerida')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {

            setStatus({ success: true });
            setSubmitting(false);
            const res =await onLogin(values);
            //console.log("esssdd ::: ",res)
            if(res.status==200 && res.data.Success==true){
                login({...res.data.Data});
                navigate("/home", { replace: true })
            }

          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: "Usuario o contraseña incorrecto"});
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} >
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{mb:5}} >
              <InputLabel htmlFor="outlined-adornment-email-login">Correo</InputLabel>
              <OutlinedInput
                //id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Correo"
                inputProps={{}}
                sx={{ minHeight: "76px", borderRadius: "15px", bgcolor: theme.palette.mode === 'light' ? "#f8fafc" : 'inherit'}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} style={{ marginTop: 15 }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Contraseña</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                sx={{ minHeight: "76px", borderRadius: "15px", bgcolor: theme.palette.mode === 'light' ? "#f8fafc" : 'inherit' }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Contraseña"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 5 }}>
              <Button sx={{ minHeight: 55,borderRadius:10}} disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                INGRESAR
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FormLogin;
