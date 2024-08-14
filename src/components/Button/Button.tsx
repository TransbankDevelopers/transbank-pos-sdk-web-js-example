import cx from "classnames";
import "./Button.css";
import Spinner from "./Spinner";

export enum ButtonType {
  WHITE = "white",
  RED = "red",
  POS = "pos",
}

interface ButtonProps {
  width?: number;
  height?: number;
  type: ButtonType;
  isLoading?: boolean;
  handleClick(): void;
  children: React.ReactNode;
  additionalClass?: string;
}

export default function Button(props: ButtonProps) {
  const {
    width,
    height,
    type,
    handleClick,
    isLoading = false,
    children,
    additionalClass = "",
  } = props;

  let buttonClassName = cx("tbk-button", {
    white: type === ButtonType.WHITE,
    red: type === ButtonType.RED,
    pos: type === ButtonType.POS,
  });

  if (additionalClass) {
    buttonClassName += " " + additionalClass;
  }

  return (
    <button
      className={buttonClassName}
      style={{ width: width, height: height }}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <span className="tbk-button-text">{children}</span>
      )}
    </button>
  );
}
