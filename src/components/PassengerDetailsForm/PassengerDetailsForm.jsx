import { Box, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayJs from "dayjs";
export default function PassengerDetailsForm(props) {
  const { details, updateDetails } = props;

  return (
    <Box>
      <TextField
        label="Prénom"
        value={details.firstname}
        onChange={(e) => updateDetails("firstname", e.target.value)}
        sx={{ mb: 2 }}
        fullWidth
      />
      <TextField
        label="Nom"
        value={details.lastname}
        onChange={(e) => updateDetails("lastname", e.target.value)}
        sx={{ mb: 2 }}
        fullWidth
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date de naissance"
          value={dayJs(details.birthday)}
          disableFuture
          format="YYYY/MM/DD"
          onChange={(newValue) => updateDetails("birthday", newValue)}
          renderInput={(params) => <TextField {...params} />}
          sx={{ mb: 2 }}
        />
      </LocalizationProvider>
      <TextField
        label="Bagages"
        type="number"
        value={details.nbLuggage}
        onChange={(e) => updateDetails("nbLuggage", e.target.value)}
        fullWidth
      />
    </Box>
  );
}
