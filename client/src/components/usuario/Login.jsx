import React, { useState, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import Registro from "./Registro";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login({ handleCerrarModalLogin }) {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended");
  const [registro, setRegistro] = useState(false);
  const [recover, setRecover] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();

  const navigate = useNavigate();

  const handleMostrarModalRegistro = () => {
    setRegistro(true);
  };

  const handleCerrarModalRegistro = () => {
    setRegistro(false);
  };

  const handleMostrarModalRecover = () => {
    setRecover(true);
  };

  const handleCerrarModalRecover = () => {
    setRecover(false);
  };

  const loginUser = async (e) => {
    e.preventDefault();

    let userToLogin = form;

    try {
      // Petición al backend
      const request = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}usuarios/login`,
        {
          method: "POST",
          body: JSON.stringify(userToLogin),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const data = await request.json();

      if (request.ok && data.status === "success") {
        const loggedUser = {
          apellido: data.loggedUser.apellido,
          direccion: data.loggedUser.direccion,
          email: data.loggedUser.email,
          nombre: data.loggedUser.nombre,
          telefono: data.loggedUser.telefono,
        };

        // Persistir los datos en el LocalStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(loggedUser));
        setSaved("login");
        navigate("/admin");
        window.location.reload();
        // setShowWelcomeMessage(true);
      } else {
        setErrorMessage(
          data.error ||
            "Las credenciales son incorrectas. Por favor, verifícalas e inténtalo de nuevo."
        );
        setSaved("error");
      }
    } catch (error) {
      setErrorMessage(
        "Error al conectarse al servidor. Por favor, inténtalo de nuevo más tarde."
      );
      setSaved("error");
    }
  };

  // useEffect(() => {
  //   if (showWelcomeMessage) {
  //     const timer = setTimeout(() => {
  //       setShowWelcomeMessage(false);
  //       // handleCerrarModalLogin();

  //       if (location.pathname === "/") {
  //         window.location.reload();
  //       } else {
  //         navigate("/");
  //         window.location.reload();
  //       }
  //     }, 2000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [showWelcomeMessage, location]);

  return (
    <div>
      {!registro && (
        <div className="login-container">
          {/* <div className="button-close-login">
            <button onClick={handleCerrarModalLogin} style={{ color: "black" }}>
              X
            </button>
          </div> */}

          <form className="login-form" onSubmit={loginUser}>
            <div className="form-group">
              <label htmlFor="email">
                Correo Electrónico <span className="obligatorio">*</span>
              </label>
              <input type="email" name="email" onChange={changed} required />
            </div>
            <div className="form-group">
              <label htmlFor="contraseña">
                Contraseña <span className="obligatorio">*</span>
              </label>
              <input
                type="password"
                name="password"
                onChange={changed}
                required
              />
            </div>

            {saved === "error" && (
              <div className="errorLogin">
                <span className="mainError">Error al Ingresar</span>
                <strong className="detailedError">{errorMessage}</strong>
              </div>
            )}
            <div className="buttonIngresarLogin">
              <input
                type="submit"
                value="Ingresar"
                className="form-registro-login"
              />
            </div>
          </form>
          <div className="olvidasteTuContraseña">
            <button
              onClick={handleMostrarModalRecover}
              className="button-Olvidaste"
            >
              <span style={{ color: "black" }}>¿Olvidaste tu contraeña?</span>
            </button>
          </div>
          {recover && (
            <div className="modal">
              <div className="modal-content">
                <RecoverPass
                  handleCerrarModalRecover={handleCerrarModalRecover}
                />
              </div>
            </div>
          )}

          {showWelcomeMessage && (
            <div className="welcome-message">
              <img src={logo} alt="" />
              <h2>Bienvenido a Tester!</h2>
            </div>
          )}

          <div className="buttonIngresarLogin">
            <button
              className="form-registro-login"
              onClick={handleMostrarModalRegistro}
            >
              Registráte
            </button>
          </div>
        </div>
      )}

      {registro && (
        <div>
          <Registro handleCerrarModalRegistro={handleCerrarModalRegistro} />
        </div>
      )}
    </div>
  );
}
