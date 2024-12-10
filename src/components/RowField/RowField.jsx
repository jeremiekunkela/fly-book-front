import { FormControl, Select, MenuItem } from "@mui/material";

const options = [
  { id: 1, name: "Bébé (0-23 mois)" },
  { id: 2, name: "Enfant (2-11 ans)" },
  { id: 3, name: "Adolescent (12-18 ans)" },
  { id: 4, name: "Adulte (18-64 ans)" },
  { id: 5, name: "Senior (65 ans et plus)" },
];

export default function RowField(props) {
  const { passenger, handlePassenger } = props;

  return (
    <FormControl sx={{ m: 1, width: 150 }} size="small">
      <Select
        labelId="passengers-select-label"
        id="passengers-select"
        value={passenger}
        label="Type de passager"
        onChange={(event) => handlePassenger(event.target.value)}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
