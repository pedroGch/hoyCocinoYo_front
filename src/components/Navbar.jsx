import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Typography, Toolbar, Box, AppBar, IconButton, CssBaseline, createTheme, Divider, Drawer, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ThemeProvider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

const links = [
    {
        id: 1,
        text: 'Home',
        url: '/',
        icon: <HomeIcon />,
    },
    {
        id: 2,
        text: 'Cargar receta',
        url: '/upload',
        icon: <CreateIcon />,
    },
    {
        id: 3,
        text: 'Recetas guardadas',
        url: '/saved',
        icon: <BookmarkIcon />
    },
    {
        id: 4,
        text: 'logout',
        url: '/logout',
        icon: <LogoutIcon />
    }

];

function Navbar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                <Box component='img' alt='Hoy cocino yo' src='/logo.png' sx={{ width: '75px' }} />
            </Typography>
            <Divider />
            <List>
                {
                    links.map((link) => (
                        <ListItem disablePadding key={link.id}>
                            <Link component={RouterLink} to={link.url} sx={{ width: '100%' }} underline='none' variant='body2' color='rgba(0,0,0,.87)'>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {link.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={link.text} sx={{ marginBottom: 0 }} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))
                }
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    const theme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#f6e4e3',
            },
        },

    })

    return (
        <header>
            <Box>
                <ThemeProvider theme={theme}>
                    <AppBar component="nav">
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                variant="h6"
                                textAlign="center"
                                sx={{ flexGrow: 1 }}
                            >
                                Hoy, cocino yo!
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
                <nav>
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </nav>
            </Box>
        </header>
    );
}

Navbar.propTypes = {
    window: PropTypes.func,
};

export default Navbar;