import { ReactNode } from "react";
import "./Alert.css";

export enum AlertType {
  SUCCESS = "success",
  FAILED = "failed",
}

interface AlertProps {
  children: ReactNode;
  type: AlertType;
  onClose: () => void;
  showButton?: boolean;
  title?: string;
}

export default function Alert(props: AlertProps) {
  const {
    type,
    children,
    onClose,
    title = "Conexión con agente",
    showButton,
  } = props;
  const handleButtonClick = async () => {
    window.location.href =
      "https://github.com/TransbankDevelopers/transbank-pos-sdk-web-agent/releases";
  };
  const isSuccessAlert = type === AlertType.SUCCESS;
  const alertColor = isSuccessAlert ? "success" : "failed";
  const fillColor = isSuccessAlert
    ? { icon: "#15CC96", close: "#0A9285" }
    : { icon: "#FF4B4B", close: "#B7253F" };
  return (
    <div
      className={`border px-4 py-4 rounded alert ml-10 ${alertColor}`}
      role="alert"
    >
      <svg
        className="mr-2"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 9C11.448 9 11 8.552 11 8C11 7.448 11.448 7 12 7C12.552 7 13 7.448 13 8C13 8.552 12.552 9 12 9ZM13 16C13 16.552 12.552 17 12 17C11.448 17 11 16.552 11 16V11C11 10.448 11.448 10 12 10C12.552 10 13 10.448 13 11V16ZM12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.522 22 22 17.523 22 12C22 6.477 17.522 2 12 2Z"
          fill={fillColor.icon}
        />
      </svg>
      <div className="alert-text">
        <strong className="text-lg">{title}</strong>
        <span className="text-sm">{children}</span>
      </div>
      {showButton && (
        <button onClick={handleButtonClick} className="alert-btn">
          <span className="btn-text">Descargar agente</span>
        </button>
      )}

      <span className="ml-2">
        <svg
          className="pointer"
          onClick={onClose}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.4142 12.0002L17.7072 7.70725C18.0982 7.31625 18.0982 6.68425 17.7072 6.29325C17.3162 5.90225 16.6842 5.90225 16.2933 6.29325L12.0002 10.5862L7.70725 6.29325C7.31625 5.90225 6.68425 5.90225 6.29325 6.29325C5.90225 6.68425 5.90225 7.31625 6.29325 7.70725L10.5862 12.0002L6.29325 16.2933C5.90225 16.6842 5.90225 17.3162 6.29325 17.7072C6.48825 17.9022 6.74425 18.0002 7.00025 18.0002C7.25625 18.0002 7.51225 17.9022 7.70725 17.7072L12.0002 13.4142L16.2933 17.7072C16.4882 17.9022 16.7443 18.0002 17.0002 18.0002C17.2562 18.0002 17.5122 17.9022 17.7072 17.7072C18.0982 17.3162 18.0982 16.6842 17.7072 16.2933L13.4142 12.0002Z"
            fill={fillColor.close}
          />
        </svg>
      </span>
    </div>
  );
}
