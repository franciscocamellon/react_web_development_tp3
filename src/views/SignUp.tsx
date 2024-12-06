import React, { useState } from "react";
import { useAppContext } from "../Context";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "../components";
import logo from "../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../services/authentication";
import { handleOnChange } from "../utils/core";
import { validateEmail, validatePassword } from "../utils/validators";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { showSnackMessage, showAlertMessage, supabase, translate } =
    useAppContext();
  const [data, setData] = useState({
    email: {
      value: "",
      error: null,
      helperText: null,
    },
    password: {
      value: "",
      error: null,
      helperText: null,
    },
    confirm_password: {
      value: "",
      error: null,
      helperText: null,
    },
  });

  const verifyRegister = async () => {
    const emailValidation = validateEmail(data.email.value);
    const passwordValidation = validatePassword(data.password.value);

    setData((v) => ({
      ...v,
      email: {
        value: v.email.value,
        error: emailValidation.error,
        helperText: emailValidation.heperText,
      },
      password: {
        value: v.password.value,
        error: passwordValidation.error,
        helperText: passwordValidation.heperText,
      },
    }));

    if (emailValidation.error || passwordValidation.error) {
      return;
    }

    if (data.password.value !== data.confirm_password.value) {
      showAlertMessage("As senhas não coincidem!", "warning");
    }

    let { data: response, error } = await signUp(
      data.email.value,
      data.password.value,
      supabase
    );

    if (error) {
      if (
        error.toString().indexOf("AuthApiError: User already registered") !== -1
      ) {
        showSnackMessage("Usuário já cadastrado");
      } else {
        showSnackMessage(error.toString());
      }
    } else {
      showSnackMessage("Usuário criado com sucesso!");
      return navigate("/signin");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        paddingTop: 8,
      }}
    >
      <Grid sx={styles.boxAdjustment} container={true}>
        <Grid sx={styles.centerBox} item={true} size={{ xs: 12 }}>
          <Avatar sx={{ width: 100, height: 100 }} src={logo} />
        </Grid>
        <Grid
          sx={{ ...styles.centerBox, ...styles.marginTop }}
          item={true}
          size={{ xs: 12 }}
        >
          <Typography variant={"h3"}>{translate("register")}</Typography>
        </Grid>
        <Grid sx={styles.centerBox} item={true} size={{ xs: 12 }}>
          <Typography variant={"h5"}>{translate("welcome")}</Typography>
        </Grid>
        <Grid sx={styles.marginTop} item={true} size={{ xs: 12 }}>
          <TextField
            label={translate("email")}
            fullWidth={true}
            onChange={(event) =>
              handleOnChange(data, setData, event.target.value, "email")
            }
            value={data.email.value}
            error={data.email.error}
            helperText={data.email.helperText}
          />
        </Grid>
        <Grid sx={styles.marginTop} item={true} size={{ xs: 12 }}>
          <TextField
            label={translate("password")}
            fullWidth={true}
            onChange={(event) =>
              handleOnChange(data, setData, event.target.value, "password")
            }
            type="password"
            value={data.password.value}
            error={data.password.error}
            helperText={data.password.helperText}
          />
        </Grid>
        <Grid sx={styles.marginTop} item={true} size={{ xs: 12 }}>
          <TextField
            label={translate("confirm-password")}
            fullWidth={true}
            onChange={(event) =>
              handleOnChange(
                data,
                setData,
                event.target.value,
                "confirm_password"
              )
            }
            type="password"
            value={data.confirm_password.value}
          />
        </Grid>
        <Grid
          sx={{ ...styles.centerBox, ...styles.marginTop }}
          item={true}
          size={{ xs: 12 }}
        >
          <Link to="/signin">{translate("sign-in")}</Link>
        </Grid>
        <Grid sx={styles.marginTop} item={true} size={{ xs: 12 }}>
          <Button fullWidth={true} onClick={verifyRegister}>
            {translate("register")}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const styles = {
  centerBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  boxAdjustment: {
    padding: 2,
  },
  marginTop: {
    marginTop: 4,
  },
};

export default SignUp;
