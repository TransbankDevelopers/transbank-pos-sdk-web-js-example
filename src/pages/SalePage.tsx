import ProductCard from "../components/ProductCard/ProductCard";
import burgerImg from "../assets/burger.png";
import friesImg from "../assets/french-fries.png";
import iceCreamImg from "../assets/ice-cream.png";
import coffeeImg from "../assets/coffee.png";
import Button, { ButtonType } from "../components/Button/Button";
import Snippet from "../components/Snippet/Snippet";
import "./SalePage.css";

const SalePage = () => {
  return (
    <div className="sales-flex-container">
      <div className="status-bar">
        <p>
          <span className="tbk-bold">Estado de conexión con agente: </span>
          Conectado
        </p>
        <div className="flex">
          <p className="border-r-gray5">
            <span className="tbk-bold">Estado de punto de venta: </span>
            Conectado al POS
          </p>
          <p>
            <span className="tbk-bold">Estado de venta: </span>
          </p>
        </div>
      </div>
      <div className="pos-container">
        <div className="product-container">
          <ProductCard price={3990} imagePath={burgerImg}>
            Hamburguesa
          </ProductCard>
          <ProductCard price={1990} imagePath={friesImg}>
            Papas fritas
          </ProductCard>
          <ProductCard price={1750} imagePath={iceCreamImg}>
            Helado
          </ProductCard>
          <ProductCard price={990} imagePath={coffeeImg}>
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
                    console.log("click");
                  }}
                >
                  Modo normal
                </Button>
                <Button
                  width={148}
                  height={40}
                  type={ButtonType.POS}
                  handleClick={() => {
                    console.log("click");
                  }}
                >
                  Poll
                </Button>
                <Button
                  width={148}
                  height={40}
                  type={ButtonType.POS}
                  handleClick={() => {
                    console.log("click");
                  }}
                >
                  Carga llaves
                </Button>
              </div>
            </div>
            <div className="div2 border-t-blue flex justify-between">
              <div className="flex flex-col pos-field-container">
                <span className="operation-title mb-4">Venta normal</span>
                <input className="pos-input" type="text" placeholder="Monto" />
                <Button
                  additionalClass="mt-auto mb-7"
                  height={40}
                  type={ButtonType.POS}
                  handleClick={() => {
                    console.log("click");
                  }}
                >
                  Venta
                </Button>
              </div>
              <div className="flex flex-col pos-field-container">
                <span className="operation-title mb-4">Venta multicódigo</span>
                <input className="pos-input" type="text" placeholder="Monto" />
                <input
                  className="pos-input mt-4 mb-4"
                  type="text"
                  placeholder="Cod. Comercio"
                />
                <Button
                  additionalClass="mt-auto mb-7"
                  height={40}
                  type={ButtonType.POS}
                  handleClick={() => {
                    console.log("click");
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
                />
                <Button
                  additionalClass="mt-auto mb-7"
                  height={40}
                  type={ButtonType.POS}
                  handleClick={() => {
                    console.log("click");
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
                    console.log("click");
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
                    <input type="radio" name="option" value={1} />
                    Si
                  </label>
                  <label className="tbk-radio-label">
                    <input type="radio" name="option" value={0} />
                    No
                  </label>
                </div>
                <Button
                  additionalClass="mt-auto"
                  height={40}
                  type={ButtonType.POS}
                  handleClick={() => {
                    console.log("click");
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
                    console.log("click");
                  }}
                >
                  Total ventas
                </Button>
              </div>
            </div>
          </div>
          <div className="div4">
            <Snippet code="{test: test}" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalePage;
