import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Routes, Route, Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from "../Modal/Modal";
import './Header.module.css';

export default function Header() {

    return (
        <div className='container-header'>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Fly Book
                        </Typography>
                        <Button color="inherit">RESERVATION</Button>
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
