import { Snackbar, SnackbarProps } from "@mui/material";

interface ISnackbarProps extends SnackbarProps {
  autoHideDuration: number;
  message: string;
}

const SnackbarComponent: React.FC<ISnackbarProps> = ({ children, ...props }) => {
  return <Snackbar {...props}>{children}</Snackbar>;
};

export default SnackbarComponent;
