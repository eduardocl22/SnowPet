import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ItemStyle } from '../components/ItemStyle';




export const Home = () => {

    return (
                <Grid container spacing={1} >
                    <Grid item xs={12} md={12} lg={12} xl={12} >
                        <ItemStyle sx={{ textAlign: "start" }}>
                            <Grid container>
                                < Grid item xs={8} md={8} lg={8} xl={8} >
                                    <Typography  variant='h5'>
                                        Mascotas
                                    </Typography>
                                </Grid>
                            </Grid>
                        </ItemStyle>
                    </Grid>
                </Grid>
    )
}




