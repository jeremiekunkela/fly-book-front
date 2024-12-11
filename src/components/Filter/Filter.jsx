import PropTypes from 'prop-types';
import { Select, MenuItem, FormControl, InputLabel, IconButton, Button } from '@mui/material';
import { Search } from '@mui/icons-material';
import styles from './Filter.module.css';
import ClearIcon from '@mui/icons-material/Clear';

const Filter = (props) => {
  const {
    airports,
    arrivalAirport,
    departureAirport,
    handleArrivalAirport,
    handleDepartureAirport,
    enableSearch,
    onSearch,
    onClear,  
  } = props;

  return (
    <div className={styles.filter}>
      <div className={styles.filterCard}>
        <FormControl sx={{ width: 300 }}>
          <InputLabel id="departure-airport-label">Departure airport</InputLabel>
          <Select
            labelId="departure-airport-label"
            value={departureAirport || ''}
            onChange={(event) => handleDepartureAirport(null,event.target.value)}
            label="Departure airport"
          >
            {airports.map((airport) => (
              <MenuItem key={airport} value={airport}>
                {airport}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: 300 }}>
          <InputLabel id="arrival-airport-label">Arrival airport</InputLabel>
          <Select
            labelId="arrival-airport-label"
            value={arrivalAirport || ''}
            onChange={(event) => handleArrivalAirport(null,event.target.value)}
            label="Arrival airport"
          >
            {airports.map((airport) => (
              <MenuItem key={airport} value={airport}>
                {airport}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <IconButton
          disabled={!enableSearch}
          onClick={onSearch}
        >
          <Search />
        </IconButton>

        <IconButton
          disabled={!enableSearch}
          onClick={onClear}
        >
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
};

Filter.propTypes = {
  airports: PropTypes.arrayOf(PropTypes.string).isRequired,
  arrivalAirport: PropTypes.string, 
  departureAirport: PropTypes.string, 
  handleArrivalAirport: PropTypes.func.isRequired,
  handleDepartureAirport: PropTypes.func.isRequired,
  enableSearch: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,  // Ajout de la validation de la prop onClear
};

export default Filter;
