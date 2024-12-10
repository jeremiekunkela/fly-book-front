import { useState } from "react";
import {
  Modal as MuiModal,
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
} from "@mui/material";
import PassengerDetailsForm from "../PassengerDetailsForm/PassengerDetailsForm";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import client from "../../api";
import { useAlert } from "../../context/Alert";
import dayJs from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

export default function Modal(props) {
  const { open, handleClose, flight, exchangeRate } = props;

  const { currency } = exchangeRate || {};

  const [numberOfPassengers, setNumberOfPassengers] = useState(1);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [activeStep, setActiveStep] = useState(-1);
  const [details, setDetails] = useState([]);
  const { showAlert } = useAlert();

  const initializeDetails = (count) => {
    const initialDetails = Array.from({ length: count }, () => ({
      firstname: "",
      lastname: "",
      birthday: "",
      nbLuggage: "",
    }));
    setDetails(initialDetails);
    setActiveStep(0);
  };

  const handleNumberOfPassengersChange = (value) => {
    const count = Math.max(1, Math.min(6, parseInt(value) || 1));
    setNumberOfPassengers(count);
  };

  const updateDetails = (index, key, value) => {
    const updatedDetails = [...details];
    updatedDetails[index][key] = value;
    setDetails(updatedDetails);
  };

  const isCurrentStepValid = () => {
    const currentDetails = details[activeStep];
    return (
      currentDetails.firstname.trim() &&
      currentDetails.lastname.trim() &&
      currentDetails.birthday &&
      currentDetails.nbLuggage.trim()
    );
  };

  const handleNext = () => {
    if (activeStep < numberOfPassengers - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    } else {
      setActiveStep(-1);
    }
  };

  const handleSubmit = async () => {
    const { departureAirport, arrivalAirport } = flight || {};
    const departureAirportName = departureAirport?.airportName || "";
    const arrivalAirportName = arrivalAirport?.airportName || "";

    const data = {
      departureDate: departureDate,
      profilDTORequestList: details,
      departureAirport: departureAirportName,
      arrivalAirport: arrivalAirportName,
      currency,
    };

    try {
      const response = await client.post("/reservation/add", data);
      showAlert("Reservation successfully", "success");
      console.log("Réponse du serveur :", response);
    } catch (error) {
      showAlert("Error while booking flight", "error");
      console.error("Erreur lors de la réservation :", error);
    }

    handleClose();
  };

  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {activeStep === -1 ? (
          <>
            <TextField
              type="number"
              label="Nombre de passagers"
              value={numberOfPassengers}
              onChange={(e) => handleNumberOfPassengersChange(e.target.value)}
              InputProps={{ inputProps: { min: 1, max: 6 } }}
              fullWidth
              sx={{ mb: 2 }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date de départ"
                value={dayJs(departureDate)}
                format="YYYY/MM/DD"
                onChange={(newValue) => setDepartureDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
                sx={{ mb: 2 }}
              />
            </LocalizationProvider>
            <Button
              onClick={() => initializeDetails(numberOfPassengers)}
              variant="contained"
              fullWidth
            >
              Commencer
            </Button>
          </>
        ) : (
          <>
            <Stepper activeStep={activeStep} sx={{ mb: 2 }}>
              {Array.from({ length: numberOfPassengers }).map((_, index) => (
                <Step key={index}>
                  <StepLabel>Passager {index + 1}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <PassengerDetailsForm
              details={details[activeStep]}
              updateDetails={(key, value) =>
                updateDetails(activeStep, key, value)
              }
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button onClick={handleBack} variant="outlined">
                {activeStep === 0 ? "Retour" : "Précédent"}
              </Button>
              {activeStep === numberOfPassengers - 1 ? (
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  disabled={!isCurrentStepValid()}
                >
                  Soumettre
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  variant="contained"
                  disabled={!isCurrentStepValid()}
                >
                  Suivant
                </Button>
              )}
            </Box>
          </>
        )}
      </Box>
    </MuiModal>
  );
}
