import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MainConnection from "./pages/MainConnection";

function App() {
  return (
    <div className="App">
      <Header />
      <MainConnection />
      <Footer />
    </div>
  );
}

export default App;
