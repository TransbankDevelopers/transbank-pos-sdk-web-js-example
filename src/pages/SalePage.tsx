import ProductCard from "../components/ProductCard/ProductCard";
import burgerImg from "../assets/burger.png";
import friesImg from "../assets/french-fries.png";
import iceCreamImg from "../assets/ice-cream.png";
import coffeeImg from "../assets/coffee.png";
import Button, { ButtonType } from "../components/Button/Button";
import Snippet from "../components/Snippet/Snippet";
import { POS } from "transbank-pos-sdk-web";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SalePage.css";

const SalePage = () => {
  const navigate = useNavigate();
  const salesDetailVoucherRef = useRef<HTMLInputElement>(null);
  const saleAmountRef = useRef<HTMLInputElement>(null);
  const multiCodeSaleAmountRef = useRef<HTMLInputElement>(null);
  const commerceCodeRef = useRef<HTMLInputElement>(null);
  const operationIdRef = useRef<HTMLInputElement>(null);
  const [response, setResponse] = useState("");
  const [posConnected, setPosConnected] = useState(false);
  const [agentConnected, setAgentConnected] = useState(false);
  const [intermediateMessage, setIntermediateMessage] = useState("");

  useEffect(() => {
    const handleAgentDisconnected = () => {
      setAgentConnected(false);
      navigate("/");
    };

    const handlePosDisconnected = () => setPosConnected(false);

    const checkInitialConnection = async () => {
      if (!POS.isConnected) {
        return;
      }
      setAgentConnected(true);
      const status = await POS.getPortStatus();
      setPosConnected(status.connected);
    };

    POS.on("socket_disconnected", handleAgentDisconnected);
    POS.on("port_closed", handlePosDisconnected);
    checkInitialConnection();

    return () => {
      POS.off("socket_disconnected", handleAgentDisconnected);
      POS.off("port_closed", handlePosDisconnected);
    };
  }, []);

  const normalSale = async () => {
    const amount = saleAmountRef.current?.valueAsNumber;
    if (amount === undefined || isNaN(amount)) {
      return "Se requiere el monto para realizar la venta";
    }
    return await POS.doSale(amount, "ticket123", (status) => {
      setIntermediateMessage(status.responseMessage);
    });
  };

  const multiCodeSale = async () => {
    const amount = multiCodeSaleAmountRef.current?.valueAsNumber;
    const commerceCode = commerceCodeRef.current?.value;
    if (amount === undefined || isNaN(amount) || commerceCode === "") {
      return "Se requiere el monto y el código de comercio para realizar la venta";
    }
    return await POS.doMulticodeSale(
      amount,
      "ticket123",
      commerceCode,
      (status) => {
        setIntermediateMessage(status.responseMessage);
      }
    );
  };

  const setNormalMode = async () => {
    return await POS.setNormalMode();
  };

  const poll = async () => {
    return await POS.poll();
  };

  const loadKeys = async () => {
    return await POS.loadKeys();
  };

  const refund = async () => {
    const operationId = operationIdRef.current?.value;
    if (operationId === undefined || operationId === "") {
      return "Se requiere el ID de operación";
    }
    return await POS.refund(operationId);
  };

  const lastSale = async () => {
    return await POS.getLastSale();
  };

  const salesDetails = async () => {
    const printOnPos = salesDetailVoucherRef.current?.checked;
    return await POS.getDetails(printOnPos);
  };

  const totalSales = async () => {
    return await POS.getTotals();
  };

  const closePort = async () => {
    try {
      const close = await POS.closePort();
      console.log("close port: ", close);
      if (close) {
        setPosConnected(false);
        navigate("/");
      }
    } catch (error) {
      console.log("Error desconectando POS: ", error);
      if (typeof error === "string") {
        setResponse(error);
      }
    }
  };

  const responseHandler = async (action: () => Promise<any>) => {
    try {
      const response = await action();
      setResponse(JSON.stringify(response, null, 2));
    } catch (error) {
      if (typeof error === "string") {
        setResponse(error);
      } else {
        console.log(error);
        setResponse("Se ha producido un error al ejecutar la operación");
      }
    }
    setIntermediateMessage("");
  };

  return (
    <div className="sales-flex-container">
      <div className="status-bar">
        <p>
          <span className="tbk-bold">Estado de conexión con agente: </span>
          {agentConnected ? (
            <span className="ml-1 text-emerald-500 bg-emerald-100 rounded-2xl px-4 py-1 border border-emerald-500 font-bold">
              Conectado
            </span>
          ) : (
            <span className="ml-1 text-red-500 bg-red-100 rounded-2xl px-4 py-1 border border-red-500 font-bold">
              Desconectado
            </span>
          )}
        </p>
        <button
          className="bg-slate-200 rounded px-2 h-10 self-center ml-auto cursor-pointer border border-slate-300"
          onClick={() => {
            responseHandler(closePort);
          }}
          hidden={!posConnected}
        >
          Desconectar POS
        </button>
        <div className="flex">
          <p>
            <span className="tbk-bold">Estado de punto de venta: </span>
            {posConnected ? (
              <span className="ml-1 text-emerald-500 bg-emerald-100 rounded-2xl px-4 py-1 border border-emerald-500 font-bold">
                POS Conectado
              </span>
            ) : (
              <span className="ml-1 text-red-500 bg-red-100 rounded-2xl px-4 py-1 border border-red-500 font-bold">
                POS Desconectado
              </span>
            )}
          </p>
        </div>
      </div>
      <div className="pos-container">
        <div className="product-container">
          <ProductCard
            price={3990}
            imagePath={burgerImg}
            handleClick={() => {
              responseHandler(async () => {
                return await POS.doSale(3990, "ticket123", (status) => {
                  setIntermediateMessage(status.responseMessage);
                  console.log(status);
                });
              });
            }}
          >
            Hamburguesa
          </ProductCard>
          <ProductCard
            price={1990}
            imagePath={friesImg}
            handleClick={() => {
              responseHandler(async () => {
                return await POS.doSale(1990, "ticket123", (status) => {
                  setIntermediateMessage(status.responseMessage);
                });
              });
            }}
          >
            Papas fritas
          </ProductCard>
          <ProductCard
            price={1750}
            imagePath={iceCreamImg}
            handleClick={() => {
              responseHandler(async () => {
                return await POS.doSale(1750, "ticket123", (status) => {
                  setIntermediateMessage(status.responseMessage);
                });
              });
            }}
          >
            Helado
          </ProductCard>
          <ProductCard
            price={990}
            imagePath={coffeeImg}
            handleClick={() => {
              responseHandler(async () => {
                return await POS.doSale(990, "ticket123", (status) => {
                  setIntermediateMessage(status.responseMessage);
                });
              });
            }}
          >
            Café Latte
          </ProductCard>
        </div>
        <div className="operations-container">
          <div className="flex flex-col">
            <div className="div1">
              <p className="text-light bg-grey p-2">Operaciones</p>
              <div className="button-container">
                <Button
                  width={148}
                  height={40}
                  type={ButtonType.POS}
                  handleClick={() => {
                    responseHandler(setNormalMode);
                  }}
                >
                  Modo normal
                </Button>
                <Button
                  width={148}
                  height={40}
                  type={ButtonType.POS}
                  handleClick={() => {
                    responseHandler(poll);
                  }}
                >
                  Poll
                </Button>
                <Button
                  width={148}
                  height={40}
                  type={ButtonType.POS}
                  handleClick={() => {
                    responseHandler(loadKeys);
                  }}
                >
                  Carga llaves
                </Button>
              </div>
            </div>
            <div className="div2 border-t-blue flex justify-between">
              <div className="flex flex-col pos-field-container">
                <span className="operation-title mb-4">Venta normal</span>
                <input
                  className="pos-input"
                  type="number"
                  placeholder="Monto ($)"
                  name="saleAmount"
                  ref={saleAmountRef}
                />
                <Button
                  additionalClass="mt-auto mb-7"
                  height={40}
                  type={ButtonType.POS}
                  handleClick={() => {
                    responseHandler(normalSale);
                  }}
                >
                  Venta
                </Button>
              </div>
              <div className="flex flex-col pos-field-container">
                <span className="operation-title mb-4">Venta multicódigo</span>
                <input
                  className="pos-input"
                  type="number"
                  placeholder="Monto ($)"
                  name="multiCodeSaleAmount"
                  ref={multiCodeSaleAmountRef}
                />
                <input
                  className="pos-input mt-4 mb-4"
                  type="number"
                  placeholder="Cod. Comercio"
                  name="multiCodeSaleCommerce"
                  ref={commerceCodeRef}
                />
                <Button
                  additionalClass="mt-auto mb-7"
                  height={40}
                  type={ButtonType.POS}
                  handleClick={() => {
                    responseHandler(multiCodeSale);
                  }}
                >
                  Venta
                </Button>
              </div>
              <div className="flex flex-col pos-field-container">
                <span className="operation-title mb-4">Reembolso</span>
                <input
                  className="pos-input"
                  type="text"
                  placeholder="ID Operación"
                  name="operationId"
                  ref={operationIdRef}
                />
                <Button
                  additionalClass="mt-auto mb-7"
                  height={40}
                  type={ButtonType.POS}
                  handleClick={() => {
                    responseHandler(refund);
                  }}
                >
                  Rembolsar
                </Button>
              </div>
            </div>
            <div className="div3 border-t-blue flex justify-between">
              <div className="flex flex-col pos-field-container">
                <span className="operation-title mb-6">Última venta</span>
                <Button
                  additionalClass="mt-auto"
                  height={40}
                  type={ButtonType.POS}
                  handleClick={() => {
                    responseHandler(lastSale);
                  }}
                >
                  Última venta
                </Button>
              </div>
              <div className="flex flex-col pos-field-container">
                <span className="operation-title mb-6">Detalle venta</span>
                <span className="text-light">Imprimir en POS:</span>
                <div className="flex gap-8">
                  <label className="tbk-radio-label">
                    <input
                      type="radio"
                      name="detail"
                      ref={salesDetailVoucherRef}
                    />
                    Si
                  </label>
                  <label className="tbk-radio-label">
                    <input type="radio" name="detail" defaultChecked={true} />
                    No
                  </label>
                </div>
                <Button
                  additionalClass="mt-auto"
                  height={40}
                  type={ButtonType.POS}
                  handleClick={() => {
                    responseHandler(salesDetails);
                  }}
                >
                  Detalle de venta
                </Button>
              </div>
              <div className="flex flex-col pos-field-container">
                <span className="operation-title mb-6">Total de ventas</span>
                <Button
                  additionalClass="mt-auto"
                  height={40}
                  type={ButtonType.POS}
                  handleClick={() => {
                    responseHandler(totalSales);
                  }}
                >
                  Total ventas
                </Button>
              </div>
            </div>
          </div>
          <div className="div4">
            <Snippet code={response} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalePage;
