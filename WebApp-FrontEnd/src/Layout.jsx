import Grid from "@mui/material/Grid";
import { useTheme } from '@mui/material/styles';

const Layout = ({children}) => {
  const theme=useTheme();
  return (
    <Grid  sx={{minHeight: '100vh',bgcolor:theme.palette.mode === 'light' ? "inerith" : "#000" }}>
      {children}
    </Grid>
  )
}

export default Layout
