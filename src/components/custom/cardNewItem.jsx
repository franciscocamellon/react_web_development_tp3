import { useNavigate } from "react-router-dom";
import { Box, Card, Fab, Typography } from "..";
import AddIcon from "@mui/icons-material/Add";
import { useAppContext } from "../../Context";

const cardNewItem = ({ title, actionType, Icon, color }) => {
  const navigate = useNavigate();
  const { translate } = useAppContext();
  return (
    <Card sx={{ borderRadius: "10%", overflow: "visible" }}>
      <Box sx={{ ...styles.centerBox }}>
        <Icon sx={{ color: color, fontSize: "2.5em" }} />
        <Typography
          sx={{
            fontSize: ".85em",
            marginTop: "0.5em",
            fontWeight: "700",
            textAlign: "center",
            wordWrap: "break-word",
            width: "90%",
          }}
        >
          {translate(title)}
        </Typography>
      </Box>
      <Box sx={{ ...styles.centerBox }}>
        <Typography
          sx={{
            marginTop: "0.5em",
            fontSize: "0.8em",
            fontWeight: "400",
            color: "#8f8f8f",
          }}
        >
          {translate("add-some")}
        </Typography>
      </Box>
      <Box sx={{ ...styles.centerBox }}>
        <Fab
          sx={{
            color: color,
            background: "#fff",
            position: "relative",
            bottom: "-20px",
          }}
          onClick={() => {
            navigate(`new/${actionType}`);
          }}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Card>
  );
};

const styles = {
  centerBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

export default cardNewItem;
