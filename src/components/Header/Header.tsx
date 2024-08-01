import TbkLogo from "../../assets/tbk-logo.svg";
import "./Header.css";

export default function Header() {
  return (
    <div className="tbk-header">
      <img src={TbkLogo} alt="tbk logo" width={181} height={34} />
      <button
        className="tbk-header-button"
        onClick={() =>
          (window.location.href =
            "https://transbank.continuumhq.dev/slack_community")
        }
      >
        <span className="tbk-button-text">Comunidad Slack</span>
      </button>
    </div>
  );
}
