import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AgentConnectionOptions, POS } from "transbank-pos-sdk-web";
import POSimg from "../../assets/POS.webp";
import Button, { ButtonType } from "../Button/Button";
import "./Connection.css";
import Alert, { AlertType } from "../Alert/Alert";
import PortList from "../PortList/PortList";

type AlertStatus = {
  alertType: AlertType;
  alertMessage: string;
  showButton?: boolean;
  alertTitle?: string;
};

const alertSuccessStatus: AlertStatus = {
  alertType: AlertType.SUCCESS,
  alertMessage: "Agente conectado correctamente",
};

const alertFailedStatus: AlertStatus = {
  alertType: AlertType.FAILED,
  alertMessage:
    "No se pudo conectar con el agente Transbank POS. Verifica que se haya inicializado el agente en este equipo.",
  showButton: true,
};

export default function Connection() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [agentConnected, setAgentConnected] = useState(false);
  const [ports, setPorts] = useState<{}[]>([]);

  const [alertStatus, setAlertStatus] = useState(alertFailedStatus);

  const agentOptions: AgentConnectionOptions = {
    reconnectionAttempts: 4,
  };

  const setPosAlert = (errorMessage: string) => {
    const posAlert: AlertStatus = {
      alertType: AlertType.FAILED,
      alertMessage: errorMessage,
      showButton: false,
      alertTitle: "Error en conexión con POS",
    };
    setShowAlert(true);
    setAlertStatus(posAlert);
  };

  const handleSocketConnected = useCallback(async () => {
    try {
      const portStatus = await POS.getPortStatus();
      if (portStatus.connected) {
        navigate("/sales");
      } else {
        setIsLoading(false);
        setShowAlert(true);
        setAlertStatus(alertSuccessStatus);
        setAgentConnected(true);
      }
    } catch (error) {
      console.log(error);
      setPosAlert("Error obteniendo estado de puertos");
    }
  }, [navigate]);

  const handleSocketConnectionFailed = useCallback(() => {
    setShowAlert(true);
    setAlertStatus(alertFailedStatus);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const isAgentConnected = POS.isConnected;
    if (isAgentConnected) {
      setAgentConnected(true);
    }

    return () => {
      POS.off("socket_connected", handleSocketConnected);
      POS.off("socket_connection_failed", handleSocketConnectionFailed);
    };
  }, [handleSocketConnected, handleSocketConnectionFailed]);

  const handleConnectAgent = async () => {
    setIsLoading(true);
    POS.on("socket_connected", handleSocketConnected);
    POS.on("socket_connection_failed", handleSocketConnectionFailed);

    await POS.disconnect();
    await POS.connect("http://localhost:8090", agentOptions);
  };

  const handleListPorts = async () => {
    try {
      const ports = await POS.getPorts();
      setPorts(ports);
    } catch (error) {
      console.log(error);
      setPosAlert("Error listando puertos");
    }
  };

  const handleAutoConnect = async () => {
    try {
      const portConnected = await POS.autoconnect();
      if (portConnected) {
        navigate("/sales");
      } else {
        setPosAlert(
          "No ha sido posible establecer comunicación con un POS. Por favor verifica que el POS se encuentre conectado y que esté configurado en modo integrado."
        );
      }
    } catch (error) {
      console.log(error);
      setPosAlert("Error en autoconnect");
    }
  };

  const handleOpenPort = async (port: string) => {
    try {
      const portOpen = await POS.openPort(port);
      if (portOpen) {
        navigate("/sales");
      }
    } catch (error) {
      console.log(error);
      setPosAlert("No ha sido posible abrir el puerto seleccionado: " + port);
    }
  };

  return (
    <section className="connection">
      {showAlert && (
        <Alert
          onClose={() => setShowAlert(false)}
          type={alertStatus.alertType}
          title={alertStatus.alertTitle}
          showButton={alertStatus.showButton}
        >
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
            {ports.length > 0 && (
              <div className="flex flex-col mt-5">
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
                correspondiente,{" "}
                <a href="https://github.com/TransbankDevelopers/transbank-pos-sdk-web-agent2/releases">
                  disponible aquí
                </a>{" "}
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
