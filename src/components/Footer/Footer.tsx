import footerLogo from "../../assets/tbk-developers.png";
import "./Footer.css";
function Footer() {
  return (
    <footer className="tbk-footer">
      <div className="tbk-footer-item">
        <img src={footerLogo} alt="tbk logo" width={181} height={34} />
      </div>
      <span className="border-t-gray3 tbk-footer-item">
        Hecho con amor por Continuum y Transbank.
      </span>
    </footer>
  );
}

export default Footer;
