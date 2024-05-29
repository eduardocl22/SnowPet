import * as React from 'react';
// material-ui
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled ,useTheme} from '@mui/material/styles';

// project imports
import AuthLogin from '../auth-forms/AuthLogin';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));


const Login = () => {

  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh',bgcolor:theme.palette.mode === 'light' ? "inerith" : "black" }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                <Item sx={{ width: { xs: "100%", sm: "403px", md: "423px" }, minHeight: "600px", borderRadius: 3 }} elevation={4}>
                  <Grid container spacing={2} alignItems="center" justifyContent="center" p={4}>
                   
                    <Grid item xs={12}  >
                      <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                        <Grid item>
                          <Stack alignItems="center" justifyContent="center" spacing={1}>
                            <Typography  gutterBottom variant={matchDownSM ? 'h5' : 'h4'} sx={{ fontWeight: "bold",fontSize:40 }}>
                              INICIAR SESION
                            </Typography>
                            <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                              ingresa tus datos para continuar
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <AuthLogin />
                    </Grid>
                  </Grid>
                </Item>
            </Grid>

          </Grid>
        </Grid>

      </Grid>
  );
};

export default Login;
