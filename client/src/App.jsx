import { useState, useEffect, useRef } from "react";
import useAuth from "./hooks/useAuth";
import Login from "./components/usuario/Login";

function App() {
  const { auth, setAuth } = useAuth();

  return (
    <div>
      <Login />
    </div>
  );
}

export default App;
