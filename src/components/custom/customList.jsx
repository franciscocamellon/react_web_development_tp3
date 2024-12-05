import { Avatar, List, ListItem, ListItemAvatar, ListItemText, useTheme } from "@mui/material";

import CribIcon from "@mui/icons-material/Crib";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import SpaIcon from "@mui/icons-material/Spa";
import { useAppContext } from "../../Context";
import { useNavigate } from "react-router-dom";

const CustomList = ({ items, ...props }) => {
  const navigate = useNavigate();
  const { translate } = useAppContext();
  const theme = useTheme();

  const typeString = {
    1: "sleep",
    2: "eat",
    3: "diaper",
  };

  const typeColor = {
    1: "#4b10a9",
    2: "#47c869",
    3: "#f4cc1d",
  };

  const getIcon = (action_type) => {
    switch (action_type) {
      case 1:
        return <CribIcon />;
      case 2:
        return <RestaurantMenuIcon />;
      case 3:
        return <SpaIcon />;
      default:
        return <RestaurantMenuIcon />;
    }
  };

  const subtitleSleep = (item) => {
    const duration = 0;
    return `${duration} ${translate("min")} ${translate("from")} ${item.start_date} ${translate("to")} ${
      item.end_date
    }`;
  };
  const subtitleEat = (item) => {
    return "O bebe está comendo";
  };
  const subtitleDiaper = (item) => {
    return "O bebe está trocando a fralda";
  };

  const generateSubtitle = (item) => {
    switch (item.action_type) {
      case 1:
        return subtitleSleep(item);
      case 2:
        return subtitleEat(item);
      case 3:
        return subtitleDiaper(item);
      default:
        return subtitleEat(item);
    }
  };

  return (
    <List
      {...props}
      sx={{
        paddingLeft: "1em",
        paddingRight: "1em",
        ...props.sx,
      }}
    >
      {items.map((item, idx) => {
        const typeStr = typeString[item.action_type];
        return (
          <ListItem
            sx={{ backgroundColor: theme.palette.common.white, borderRadius: "60px", marginTop: "1em" }}
            id={`new-item-list-${idx}`}
            onClick={() => navigate(`/${item.action_type}/${item.id}`)}
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  backgroundColor: typeColor[item.action_type],
                }}
              >
                {getIcon(item.action_type)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={translate(typeString[item.action_type])} secondary={generateSubtitle(item)} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default CustomList;
