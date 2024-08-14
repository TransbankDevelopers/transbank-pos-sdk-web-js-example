import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgentConnectionOptions, POS } from "transbank-pos-sdk-web";
import POSimg from "../../assets/POS.png";
import Button, { ButtonType } from "../Button/Button";
import "./Connection.css";
import Alert, { AlertType } from "../Alert/Alert";
import PortList from "../PortList/PortList";

type AlertStatus = {
  alertType: AlertType;
  alertMessage: string;
};

export default function Connection() {
  const handleSocketConnected = () => {};
  const alertSuccessStatus: AlertStatus = {
    alertType: AlertType.SUCCESS,
    alertMessage: "Agente conectado correctamente",
  };

  const alertFailedStatus: AlertStatus = {
    alertType: AlertType.FAILED,
    alertMessage:
      "No se pudo conectar con el agente Transbank POS. Verifica que se haya inicializado el agente en este equipo.",
  };

  const agentOptions: AgentConnectionOptions = {
    reconnectionAttempts: 4,
  };

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState(alertFailedStatus);
  const [agentConnected, setAgentConnected] = useState(false);
  const [ports, setPorts] = useState<{}[]>([]);
  const [posConnected, setPosConnected] = useState(false);
  console.log(ports.length);
  const handleConnectAgent = async () => {
    setIsLoading(true);
    POS.on("socket_connected", () => {
      console.log("Conectado a socket");
      setIsLoading(false);
      setShowAlert(true);
      setAlertStatus(alertSuccessStatus);
      setAgentConnected(true);
    });
    POS.on("socket_connection_failed", () => {
      console.log("Error conectando con agente");
      setShowAlert(true);
      setAlertStatus(alertFailedStatus);
      setIsLoading(false);
    });
    POS.connect("http://localhost:8090", agentOptions);
  };

  const closePosConnection = async () => {
    const status = await POS.getPortStatus();
    console.log(status);
    const close = await POS.closePort();
    console.log(close);
  };

  const handleAlertClose = async () => {
    setShowAlert(false);
  };

  const handleListPorts = async () => {
    const ports = await POS.getPorts();
    setPorts(ports);
    console.log(ports);
  };

  const handleAutoConnect = async () => {
    const response = await POS.autoconnect();
    console.log(response);
  };

  const handleOpenPort = async (port: string) => {
    const portOpen = await POS.openPort(port);
    if (portOpen) {
      navigate("/sales");
    }
  };

  console.log("agent? ", agentConnected);

  return (
    <section className="connection">
      {showAlert && (
        <Alert onClose={handleAlertClose} type={alertStatus.alertType}>
          {alertStatus.alertMessage}
        </Alert>
      )}
      <div className="connection-content">
        <img className="pos-img" src={POSimg} alt="pos" />
        {agentConnected ? (
          <div className="connect">
            <div className="connection-text">
              <p>
                Ahora que has establecido comunicación con el agente, debes
                establecer comunicación con el POS. Puedes obtener un listado de
                puertos disponibles en tu equipo y seleccionar manualmente el
                que corresponda al POS, o bien utilizar la función de auto
                conectar para que el agente se encargue de buscarlo
                automáticamente 🤖
              </p>
            </div>
            <div className="flex justify-between">
              <Button
                handleClick={handleListPorts}
                type={ButtonType.WHITE}
                width={285}
                height={50}
              >
                LISTAR PUERTOS
              </Button>
              <Button
                handleClick={handleAutoConnect}
                type={ButtonType.RED}
                width={285}
                height={50}
              >
                DESCUBRIR Y CONECTAR
              </Button>
            </div>
            <Button
              handleClick={closePosConnection}
              type={ButtonType.RED}
              width={285}
              height={50}
            >
              CERRAR COM POS
            </Button>
            {ports.length > 0 && (
              <div className="flex flex-col">
                <PortList onClick={handleOpenPort} ports={ports} />
              </div>
            )}
          </div>
        ) : (
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
              handleClick={handleConnectAgent}
              type={ButtonType.WHITE}
              width={200}
              height={50}
              isLoading={isLoading}
            >
              CONECTAR AGENTE
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
