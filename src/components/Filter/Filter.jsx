import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import styles from './Filter.module.css';

const Filter = (props) => {
    const { 
        airports,
        date,
        arrivalAirport,
        departureAirport,
        handleArrivalAirport,
        handleDepartureAirport,
        handleDate,
        enableSearch
    } = props;

    return (
        <div className={styles.filter}>
            <div className={styles.filterCard}>
                <Autocomplete
                    sx={{ width: 300 }}
                    options={airports}
                    onChange={handleArrivalAirport}
                    inputValue={arrivalAirport}
                    value={arrivalAirport}
                    renderInput={(params) => <TextField {...params} label="Departure airport" />}
                />
                <Autocomplete
                    sx={{ width: 300 }}
                    options={airports}
                    onChange={handleDepartureAirport}
                    inputValue={departureAirport}
                    value={departureAirport}
                    renderInput={(params) => <TextField {...params} label="Arrival airport" />}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        label="Departure date"
                        onChange={handleDate}
                        value={date}
                        disablePast
                    />
                </LocalizationProvider>
                <IconButton disabled={!enableSearch}>
                    <Search />
                </IconButton>
            </div>
        </div>
    );
};

Filter.propTypes = {
    airports: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string, 
            PropTypes.shape({ name: PropTypes.string.isRequired }) 
        ])
    ).isRequired, 
    date: PropTypes.object, 
    arrivalAirport: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({ name: PropTypes.string })
    ]), 
    departureAirport: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({ name: PropTypes.string })
    ]),
    handleArrivalAirport: PropTypes.func.isRequired, 
    handleDepartureAirport: PropTypes.func.isRequired, 
    handleDate: PropTypes.func.isRequired, 
    enableSearch: PropTypes.bool.isRequired 
};

export default Filter;
