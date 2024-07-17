// Imports React and the StrictMode component from the React library
import React, { StrictMode } from "react";
// Imports the createRoot function from the ReactDOM library
import { createRoot } from "react-dom/client";
// Imports the styles.css file for styling the application
import "./styles.css";

// Imports the main App component from the App.js file
import App from "./App";

// Gets the root DOM element where the React app will be mounted
const root = createRoot(document.getElementById("root"));

// Renders the React app inside the root element using the StrictMode component
root.render(
  // StrictMode is a tool for highlighting potential problems in an application
  <StrictMode>
    {/* The main App component is rendered here */}
    <App />
  </StrictMode>
);
