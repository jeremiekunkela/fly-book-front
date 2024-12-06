import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import airport from '../../airport';
import {IconButton } from '@mui/material';
import styles from './Filter.module.css';
import { Search } from '@mui/icons-material';


const Filter = () => {
    return (
        <div className={styles.filter}>
            <div className={styles.filterCard}>
            <Autocomplete
                disablePortal
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Departure airport" />}
                options={airport}
                S
            />
            <Autocomplete
                disablePortal
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Arrival airport" />}
                options={airport}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                    label="Departure date"
                     />
            </LocalizationProvider>
            <IconButton>
                <Search />
            </IconButton>
            </div>
        </div>
    );
};

export default Filter;
