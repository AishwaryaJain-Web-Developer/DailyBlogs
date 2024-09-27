import React from 'react';
import ReactDOM from 'react-dom/client'; // Import ReactDOM
import App from './App'; 
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Theme setup
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Primary color
    },
    secondary: {
      main: '#d32f2f', // Secondary color
    },
  },
  typography: {
    h3: {
      fontWeight: 'bold',
    },
  },
});

// Rendering the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
