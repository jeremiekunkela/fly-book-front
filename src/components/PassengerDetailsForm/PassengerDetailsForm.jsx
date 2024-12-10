import { Box, TextField } from "@mui/material";

export default function PassengerDetailsForm(props) {
  const { details, updateDetails } = props;

  return (
    <Box>
      <TextField
        label="Prénom"
        value={details.firstName}
        onChange={(e) => updateDetails("firstName", e.target.value)}
        sx={{ mb: 2 }}
        fullWidth
      />
      <TextField
        label="Nom"
        value={details.lastName}
        onChange={(e) => updateDetails("lastName", e.target.value)}
        sx={{ mb: 2 }}
        fullWidth
      />
      <TextField
        label="Âge"
        type="number"
        value={details.age}
        onChange={(e) => updateDetails("age", e.target.value)}
        sx={{ mb: 2 }}
        fullWidth
      />
      <TextField
        label="Bagages"
        type="number"
        value={details.luggage}
        onChange={(e) => updateDetails("luggage", e.target.value)}
        fullWidth
      />
    </Box>
  );
}
