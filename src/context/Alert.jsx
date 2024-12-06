import  { createContext, useState, useContext } from 'react';
import { Alert, Snackbar } from '@mui/material';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success'); 

  const showAlert = (msg, level = 'success') => {
    setMessage(msg);
    setSeverity(level);
    setOpen(true);
  };

  const hideAlert = () => setOpen(false);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={hideAlert}>
        <Alert onClose={hideAlert} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
