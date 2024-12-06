import React, { useEffect, useState } from "react";
import { AppBar, Button, DatePicker, Grid, TextField } from "../components";
import { useAppContext } from "../Context";
import { get, save } from "../services/database";
import { handleInputChange } from "../utils/actions";
import { adjustDateTimeForTimezone, getUser } from "../utils/core";
import { signOut } from "../services/authentication";
import { useNavigate } from "react-router-dom";

const Settings: React.FC = () => {
  const { translate, supabase, showAlertMessage } = useAppContext();
  const navigate = useNavigate();
  const user = getUser();
  const [data, setData] = useState({});

  const loadData = async () => {
    const result = await get("profile_students", [
      { field: "user_id", value: user.id },
    ]);
    setData(result);
  };

  const logout = async () => {
    const { error } = await signOut(supabase);
    if (error) {
      console.error("Erro ao fazer logout:", error.message);
      showAlertMessage("Erro ao sair, tente novamente.", "error");
      return;
    }

    localStorage.clear();
    showAlertMessage("Você saiu com sucesso!", "success");
    navigate("/signin");
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <AppBar title={translate("settings")} />
      <Grid
        container
        spacing={2}
        sx={{ ...styles.boxAdjustment, ...styles.centerBox }}
      >
        <Grid sx={styles.marginTop} item={true} size={{ xs: 12 }}>
          <TextField
            placeholder={translate("name")}
            fullWidth={true}
            onChange={(event) =>
              handleInputChange("name", event.target.value, data, setData)
            }
            value={data.name}
          />
        </Grid>
        <Grid sx={styles.marginTop} item={true} size={{ xs: 12 }}>
          <TextField
            placeholder={translate("height")}
            fullWidth={true}
            onChange={(event) =>
              handleInputChange("height", event.target.value, data, setData)
            }
            value={data.height}
          />
        </Grid>
        <Grid sx={styles.marginTop} item={true} size={{ xs: 12 }}>
          <TextField
            placeholder={translate("weight")}
            fullWidth={true}
            onChange={(event) =>
              handleInputChange("weight", event.target.value, data, setData)
            }
            value={data.weight}
          />
        </Grid>
        <Grid sx={styles.marginTop} item={true} size={{ xs: 12 }}>
          <DatePicker
            value={data?.birth ? adjustDateTimeForTimezone(data?.birth) : null}
            name="birth"
            placeholder={translate("birth")}
            ampm={false}
            format="DD/MM/YYYY"
            fullWidth={true}
            onChange={(value) => {
              handleInputChange(
                "birth",
                new Date(value.toString()),
                data,
                setData
              );
            }}
          />
        </Grid>
        <Grid sx={styles.marginTop} item={true} size={{ xs: 12 }}>
          <Button
            onClick={async () => {
              data.user_id = user.id;
              await save("profile_students", data);
            }}
            fullWidth={true}
          >
            {translate("save")}
          </Button>
        </Grid>
        <Grid sx={styles.marginTop} item={true} size={{ xs: 12 }}>
          <Button
            onClick={async () => {
              await logout();
            }}
            fullWidth={true}
          >
            {translate("logout")}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

const styles = {
  centerBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  boxAdjustment: {
    height: "calc(100vh - 56px)",
    width: "100vw",
    padding: 2,
  },
  marginTop: {
    marginTop: 4,
  },
};

export default Settings;
