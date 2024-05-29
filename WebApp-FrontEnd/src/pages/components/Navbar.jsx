import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const DrawerAppBar = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { logout } = React.useContext(AuthContext);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        VETERINARIA
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton LinkComponent={Link} to={"/home"} sx={{ textAlign: 'center' }}>
            <ListItemText primary={'Mascotas'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton LinkComponent={Link} to={"/consejos"} sx={{ textAlign: 'center' }}>
            <ListItemText primary={'Consejos'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton LinkComponent={Link} to={"/anuncios"} sx={{ textAlign: 'center' }}>
            <ListItemText primary={'Anuncios'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton LinkComponent={Link} to={"/foros"} sx={{ textAlign: 'center' }} >
            <ListItemText  primary={'Foros'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary={'Cerrar Sesion'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            VETERINARIA
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>

            <Button sx={{ color: '#fff' }}>
              <Link style={{ textDecoration: "none", color: "white" }} to={"/home"}>
                Mascotas
              </Link>
            </Button>
            <Button sx={{ color: '#fff' }}>
              <Link style={{ textDecoration: "none", color: "white" }} to={"/consejos"}>
                Consejos
              </Link>
            </Button>
            <Button sx={{ color: '#fff' }}>
              <Link style={{ textDecoration: "none", color: "white" }} to={"/anuncios"}>
                Anuncios
              </Link>
            </Button>
            <Button sx={{ color: '#fff' }}>
              <Link style={{ textDecoration: "none", color: "white" }} to={"/foros"}>
                Foros
              </Link>
            </Button>
            <Button onClick={logout} sx={{ color: '#fff' }}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3, width: { xs: 400, sm: 600, md: 1500, lg: 1570 } }}  >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}


export default DrawerAppBar;
