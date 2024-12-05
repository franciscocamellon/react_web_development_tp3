import { Alert, AlertProps, AlertColor } from "@mui/material";

interface IAlertProps extends AlertProps {
  severity: AlertColor;
}

const AlertComponent: React.FC<IAlertProps> = ({ children, ...props }) => {
  return <Alert {...props}>{children}</Alert>;
};

export default AlertComponent;
