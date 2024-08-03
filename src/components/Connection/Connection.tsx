import { useState } from "react";
import { POS } from "transbank-pos-sdk-web";
import POSimg from "../../assets/POS.png";
import Button, { ButtonType } from "../Button/Button";
import "./Connection.css";
import Alert, { AlertType } from "../Alert/Alert";

type AlertStatus = {
  alertType: AlertType;
  alertMessage: string;
};

const alertSuccessStatus: AlertStatus = {
  alertType: AlertType.SUCCESS,
  alertMessage: "Agente conectado correctamente",
};

const alertFailedStatus: AlertStatus = {
  alertType: AlertType.FAILED,
  alertMessage:
    "No se pudo conectar con el agente Transbank POS. Verifica que se haya inicializado el agente en este equipo.",
};

export default function Connection() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState(alertFailedStatus);
  const handleButtonClick = async () => {
    setIsConnecting(true);
    POS.on("socket_connected", () => {
      console.log("Conectado a socket");
      setIsConnecting(false);
      setShowAlert(true);
      setAlertStatus(alertSuccessStatus);
    });
    POS.on("socket_connect_error", () => {
      console.log("socket_connect_error");
    });
    POS.connect("http://localhost:8090");
  };
  console.log("showAlert:", showAlert);

  const handleAlertClose = async () => {
    setShowAlert(false);
  };

  return (
    <section className="connection">
      {showAlert && (
        <Alert onClose={handleAlertClose} type={alertStatus.alertType}>
          {alertStatus.alertMessage}
        </Alert>
      )}
      <div className="connection-content">
        <img className="pos-img" src={POSimg} alt="pos" />
        <div className="connect">
          <div className="connection-text">
            <p>
              Lleva a cabo pruebas prácticas para lograr una conexión sin
              inconvenientes con el POS. Asegúrate de instalar el agente POS
              correspondiente,
              <a href="https://github.com/TransbankDevelopers/transbank-pos-sdk-web-agent/releases">
                disponible aquí
              </a>
              para que el sistema pueda reconocer tu POS.
            </p>
          </div>
          <Button
            handleClick={handleButtonClick}
            text="CONECTAR AGENTE"
            type={ButtonType.WHITE}
            width={200}
            height={50}
            isLoading={isConnecting}
          />
        </div>
      </div>
    </section>
  );
}
