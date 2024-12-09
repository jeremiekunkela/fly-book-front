import { Autocomplete, TextField } from '@mui/material';
import styles from './ExchangeRateSelector.module.css';

export default function ExchangeRateSelector(props) {
  const { 
    exchangeRates, 
    exchangeRate,
    handleExchangeRate 
  } = props;

  return (
    <div className={styles.container}>
      <Autocomplete
        options={exchangeRates}
        getOptionLabel={(option) => option.currency}
        value={exchangeRate}
        onChange={(event, newValue) => handleExchangeRate(null, newValue ?? exchangeRates[0])}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Exchange rate"
            variant="outlined"
            sx={{ width: 150 }}
          />
        )}
      />
    </div>
  );
}
