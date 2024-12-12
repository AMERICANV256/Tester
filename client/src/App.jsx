import { useState, useEffect, useRef } from "react";
import useAuth from "./hooks/useAuth";
import Login from "./components/usuario/Login";
import Logo from "../src/assets/images/Logo.jpeg";

function App() {
  const { auth, setAuth } = useAuth();

  return (
    <div className="background-container">
      <div className="BackgroundLogo">
        <img className="Logo" src={Logo} alt="" />
      </div>
      <Login />
    </div>
  );
}

export default App;
