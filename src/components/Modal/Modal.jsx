import React, { useState } from "react";
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
  const { open, handleClose } = props;

  const [numberOfPassengers, setNumberOfPassengers] = useState(1);
  const [activeStep, setActiveStep] = useState(-1); 
  const [details, setDetails] = useState([]);

  const initializeDetails = (count) => {
    const initialDetails = Array.from({ length: count }, () => ({
      firstName: "",
      lastName: "",
      age: "",
      luggage: "",
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
      currentDetails.firstName.trim() &&
      currentDetails.lastName.trim() &&
      currentDetails.age.trim() &&
      currentDetails.luggage.trim()
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

  const handleSubmit = () => {
    console.log("Détails des passagers soumis :", details);
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
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
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
