import cx from "classnames";
import "./Button.css";
import Spinner from "./Spinner";

export enum ButtonType {
  WHITE = "white",
  RED = "red",
}

interface ButtonProps {
  width?: number;
  height?: number;
  type: ButtonType;
  isLoading?: boolean;
  handleClick(): void;
  children: React.ReactNode;
}

export default function Button(props: ButtonProps) {
  const {
    width,
    height,
    type,
    handleClick,
    isLoading = false,
    children,
  } = props;

  const buttonClassName = cx("tbk-button", {
    white: type === ButtonType.WHITE,
    red: type === ButtonType.RED,
  });

  return (
    <button
      className={buttonClassName}
      style={{ width: width, height: height }}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
}
