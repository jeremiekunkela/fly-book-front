import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import {  Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './Header.module.css';

export default function Header() {

    return (
        <div className='container-header'>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="sticky">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                            Fly Book
                        </Link>
                        </Typography>
                        <Link to="/reservations">
                            <Button style={{ color: 'white' }}>RESERVATION</Button>
                        </Link>
                        <Link to="/graphics">
                            <Button style={{ color: 'white' }} >
                                GRAPHICS
                            </Button>
                        </Link>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}
