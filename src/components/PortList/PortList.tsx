import Button, { ButtonType } from "../Button/Button";
import "./PortList";

interface Port {
  path: string;
}

//TODO: implement props definition
const PortList = (props: any) => {
  const { ports, onClick } = props;
  const portItems = ports.map((port: Port, index: number) => (
    <Button
      additionalClass="mb-1"
      key={port.path}
      type={ButtonType.WHITE}
      handleClick={() => {
        onClick(port.path);
      }}
    >
      <span className="font-bold">CONECTAR:</span> {port.path}
    </Button>
  ));
  return portItems;
};

export default PortList;
