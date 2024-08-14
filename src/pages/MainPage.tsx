import Connection from "../components/Connection/Connection";
import "./MainPage.css";

export default function MainPage() {
  return (
    <section className="main">
      <section className="main-text">
        <p>Demo: Punto de Venta - SDK web POS</p>
        <p>Conexión con agente</p>
      </section>
      <Connection />
    </section>
  );
}
