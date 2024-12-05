import { useState } from "react";
import Button, { ButtonType } from "../Button/Button";
import "./PortList";

interface Port {
  path: string;
}

//TODO: implement props definition
const PortList = (props: any) => {
  const { ports, onClick } = props;
  const [selectedPort, setSelectedPort] = useState(ports[0]);
  return (
    <>
      <span className="font-bold mr-auto mb-5 text-xl">
        Puertos Disponibles
      </span>
      <div className="flex flex-col ml-1 mb-3 gap-1">
        {ports.map((port: Port, index: number) => (
          <label className="flex gap-2" key={port.path}>
            <input
              type="radio"
              name="port"
              defaultChecked={index === 0}
              onClick={() => setSelectedPort(port.path)}
            />
            {port.path}
          </label>
        ))}
      </div>
      <Button
        width={200}
        type={ButtonType.WHITE}
        handleClick={() => {
          onClick(selectedPort);
        }}
      >
        <span className="font-bold">CONECTAR</span>
      </Button>
    </>
  );
};

export default PortList;
