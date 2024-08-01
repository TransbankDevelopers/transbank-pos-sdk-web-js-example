import { useState } from "react";
import { POS } from "transbank-pos-sdk-web";
import POSimg from "../../assets/POS.png";
import Button, { ButtonType } from "../Button/Button";
import "./Connection.css";

export default function Connection() {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    console.log("Clicked");
    setIsLoading(true);
    // const isConnected = await POS.connect("http://localhost:8090");
    // console.log("Is connected:");
    // console.log(isConnected);
    setTimeout(() => setIsLoading(false), 3000);
  };
  return (
    <section className="connection">
      <img className="pos-img" src={POSimg} alt="pos" />
      <div className="connection-content">
        <p className="connection-text">
          Lleva a cabo pruebas prácticas para lograr una conexión sin
          inconvenientes con el POS. Asegúrate de instalar el agente POS
          correspondiente,
          <a href="https://github.com/TransbankDevelopers/transbank-pos-sdk-web-agent/releases">
            disponible aquí
          </a>
          para que el sistema pueda reconocer tu POS.
        </p>
        <Button
          handleClick={handleClick}
          text="CONECTAR AGENTE"
          type={ButtonType.WHITE}
          width={200}
          height={50}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}
