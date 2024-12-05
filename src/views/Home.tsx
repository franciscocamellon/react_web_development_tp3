import React, { useEffect, useState } from "react";
import { Grid, Avatar, Box, Typography, CardNewItem, CustomList } from "../components";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import baby from "../assets/img/baby.png";
import { useNavigate } from "react-router-dom";
import { ACTIONS } from "../constants/actions";
import { list } from "../services/database";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [data, setData] = useState([]);

  const loadData = () => {
    const d = list();

    if (d) {
      setData(d);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const items = [
    { action_type: 1 },
    { action_type: 2 },
    { action_type: 3 },
    { action_type: 3 },
    { action_type: 3 },
    { action_type: 2 },
    { action_type: 2 },
    { action_type: 1 },
    { action_type: 2 },
  ];

  return (
    <>
      <Grid container={true} sx={{ height: "25vh" }}>
        <Grid item={true} size={{ xs: 12 }}>
          <Grid container={true} sx={{ marginTop: "1em" }}>
            <Grid
              item={true}
              size={{ xs: 4 }}
              sx={{
                ...styles.centerBox,
              }}
            >
              <IconButton
                onClick={() => navigate("/dashboard")}
                sx={{ ...styles.iconButton, border: `2px solid ${theme.palette.primary.main}` }}
              >
                <SignalCellularAltIcon sx={{ ...styles.icon, color: `${theme.palette.primary.main}` }} />
              </IconButton>
              <Box sx={styles.boxText}>
                <Typography sx={{ ...styles.centerText, ...styles.text2 }}>52 cm</Typography>
                <Typography sx={{ ...styles.centerText, ...styles.text3 }}>Comprimento</Typography>
              </Box>
            </Grid>
            <Grid
              item={true}
              size={{ xs: 4 }}
              sx={{
                ...styles.centerBox,
              }}
            >
              <Avatar src={baby} sx={{ width: 90, height: 90 }} />
              <Box sx={styles.boxText}>
                <Typography sx={{ ...styles.centerText, ...styles.text1 }}>Noah</Typography>
                <Typography sx={{ ...styles.centerText, ...styles.text3 }}>x dia(s)</Typography>
              </Box>
            </Grid>
            <Grid
              item={true}
              size={{ xs: 4 }}
              sx={{
                ...styles.centerBox,
              }}
            >
              <IconButton
                onClick={() => navigate("/settings")}
                sx={{ ...styles.iconButton, border: `2px solid ${theme.palette.primary.main}` }}
              >
                <SettingsIcon sx={{ ...styles.icon, color: `${theme.palette.primary.main}` }} />
              </IconButton>
              <Box sx={styles.boxText}>
                <Typography sx={{ ...styles.centerText, ...styles.text2 }}>3.80kg</Typography>
                <Typography sx={{ ...styles.centerText, ...styles.text3 }}>Peso</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item={true} size={{ xs: 12 }} sx={{ position: "relative", bottom: "-13px" }}>
          <Grid container={true}>
            {ACTIONS.map((action, idx) => {
              return (
                <Grid index={idx} sx={{ padding: "16px" }} item={true} size={{ xs: 4 }}>
                  <CardNewItem {...action} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container={true}
        sx={{
          height: "75vh",
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Grid item={true} size={{ xs: 12 }} sx={{ height: "58vh", marginTop: "150px", overflow: "auto" }}>
          <CustomList items={data} />
        </Grid>
      </Grid>
    </>
  );
};

const styles = {
  centerBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconButton: {
    height: "2.5em",
    width: "2.5em",
  },
  icon: {
    fontSize: "1.5em",
  },
  centerText: {
    textAlign: "center",
  },
  boxText: {
    marginTop: ".5em",
  },
  text1: {
    wordBreak: "break-all",
    fontSize: "1.2em",
    fontWeight: "500",
    fontFamily: '"Lato", sans-serif',
  },
  text2: {
    wordBreak: "break-all",
    fontSize: ".8em",
    fontWeight: "600",
    fontFamily: '"Lato", sans-serif',
  },
  text3: {
    wordBreak: "break-all",
    fontSize: ".8em",
    fontWeight: "400",
  },
};

export default Home;
