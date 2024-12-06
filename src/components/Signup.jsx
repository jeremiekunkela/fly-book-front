import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormLabel,
  FormControl,
  Link,
  TextField,
  Typography,
  Card as MuiCard,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import client from '../api';
import { useAlert } from '../context/Alert';

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function SignUp() {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");

  const navigate = useNavigate();
  const { showAlert } = useAlert();


  const validateInputs = (data) => {
    let isValid = true;

    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!data.password || data.password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!data.lastname || data.lastname.length < 1) {
      setNameError(true);
      setNameErrorMessage("Lastname is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    if (!data.firstname || data.firstname.length < 1) {
      setFirstNameError(true);
      setFirstNameErrorMessage("FirstName is required.");
      isValid = false;
    } else {
      setFirstNameError(false);
      setFirstNameErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.target);

    const formData = {
      lastname: data.get("name"),
      firstname: data.get("firstName"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("password"),
    };

    if (!validateInputs(formData)) {
      console.log("Validation failed");
      return;
    }

    try {
      const response = await client.post("/client/signup", formData);
      console.log(response);
      navigate("/signin");
      showAlert('Successfully signed up', 'success');
    } catch (error) {
      showAlert('Error occurred while signing up', 'error');
      console.error("Sign-up error:", error);
    }
  };

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Sign up
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="name">Name</FormLabel>
          <TextField
            autoComplete="name"
            name="name"
            required
            fullWidth
            id="name"
            placeholder="Snow"
            error={nameError}
            helperText={nameErrorMessage}
            color={nameError ? "error" : "primary"}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <TextField
            autoComplete="firstName"
            name="firstName"
            required
            fullWidth
            id="firstName"
            placeholder="Jon"
            error={firstNameError}
            helperText={firstNameErrorMessage}
            color={firstNameError ? "error" : "primary"}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            required
            fullWidth
            id="email"
            placeholder="your@email.com"
            name="email"
            autoComplete="email"
            variant="outlined"
            error={emailError}
            helperText={emailErrorMessage}
            color={emailError ? "error" : "primary"}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            required
            fullWidth
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="new-password"
            variant="outlined"
            error={passwordError}
            helperText={passwordErrorMessage}
            color={passwordError ? "error" : "primary"}
          />
        </FormControl>
        <Button type="submit" fullWidth variant="contained">
          Sign up
        </Button>
      </Box>
      <Divider>
        <Typography sx={{ color: "text.secondary" }}>or</Typography>
      </Divider>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography sx={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Link href="/signin" variant="body2" sx={{ alignSelf: "center" }}>
            Sign in
          </Link>
        </Typography>
      </Box>
    </Card>
  );
}
