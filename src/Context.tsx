import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert, Grid, Snackbar } from "./components";
import { useTranslation } from "react-i18next";
import { createClient } from "@supabase/supabase-js";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

interface AppProviderProps {
  children: ReactNode;
}

interface AppContextInterface {
  changeLanguage: void;
  showSnackMessage: (message: string) => void;
  showAlertMessage: (message: string, severity: string) => void;
  translate: string;
  supabase: {};
}

const AppContext = createContext<AppContextInterface | null>(null);

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { t: translate, i18n } = useTranslation();
  const timeoutDuration = 6000;

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("info");
  const [alertMessage, setAlertMessage] = useState("");

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const showSnackMessage = (message: string) => {
    setSnackMessage(message);
    setSnackOpen(true);
  };

  const showAlertMessage = (message: string, severity: string) => {
    setAlertSeverity(severity);
    setAlertMessage(message);

    setTimeout(() => {
      setAlertMessage("");
    }, timeoutDuration);
  };

  const handleClose = () => {
    setSnackMessage("");
    setSnackOpen(false);
  };

  const sharedState = {
    changeLanguage,
    showSnackMessage,
    showAlertMessage,
    supabase,
    translate,
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");

    if (storedLanguage) {
      changeLanguage(storedLanguage);
    } else {
      const navLang = navigator.language.split("-")[0];
      changeLanguage(navLang);
    }
  }, []);

  return (
    <div className="app-background">
      <AppContext.Provider value={sharedState}>
        {children}

        <Snackbar
          autoHideDuration={timeoutDuration}
          onClose={handleClose}
          open={snackOpen}
          message={snackMessage}
        />

        {alertMessage ? (
          <Grid
            container={true}
            sx={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%",
              padding: 2,
            }}
          >
            <Grid item={true} size={{ xs: 12 }}>
              <Alert severity={alertSeverity}>{alertMessage}</Alert>
            </Grid>
          </Grid>
        ) : null}
      </AppContext.Provider>
    </div>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export default AppProvider;
