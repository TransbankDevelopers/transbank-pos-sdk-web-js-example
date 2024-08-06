import "./PortList";

interface Port {
  path: string;
}

const PortList = (props: any) => {
  console.log("port list");
  const { ports, onClick } = props;
  const portItems = ports.map((port: Port, index: number) => (
    <button
      key={index}
      onClick={() => {
        console.log("Clicked", port.path);
        onClick(port.path);
      }}
      className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
    >
      {port.path}
    </button>
  ));
  return portItems;
};

export default PortList;
