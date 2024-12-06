import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import styles from './Filter.module.css';

const Filter = (props) => {
    const { 
        airports,
        arrivalAirport,
        departureAirport,
        handleArrivalAirport,
        handleDepartureAirport,
        enableSearch,
        onSearch
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
                <IconButton 
                    disabled={!enableSearch}
                    onClick={onSearch}
                >
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
    enableSearch: PropTypes.bool.isRequired,
    onSearch: PropTypes.func.isRequired
};

export default Filter;
