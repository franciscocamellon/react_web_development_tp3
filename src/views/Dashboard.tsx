import React from "react";
import { useAppContext } from "../Context";
import { AppBar, Grid } from "../components";

const Dashboard: React.FC = () => {
  const { translate } = useAppContext();
  return (
    <>
      <AppBar title={translate("dashboard")} />
      <Grid
        container
        spacing={2}
        sx={{ ...styles.boxAdjustment, ...styles.centerBox }}
      >
        <Grid sx={styles.marginTop} item={true} size={{ xs: 12 }}></Grid>
        <Grid sx={styles.marginTop} item={true} size={{ xs: 12 }}></Grid>
        <Grid sx={styles.marginTop} item={true} size={{ xs: 12 }}></Grid>
        <Grid sx={styles.marginTop} item={true} size={{ xs: 12 }}></Grid>
        <Grid sx={styles.marginTop} item={true} size={{ xs: 12 }}></Grid>
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

export default Dashboard;
