import dayjs from "dayjs";

const adjustDateTimeForTimezone = (dateString) => {
  if (!dateString) return new Date().toDateString();
  const dateUTC = dayjs.utc(dateString);
  const dateInUTCMinus = dateUTC.tz("America/Sao_Paulo");
  return dayjs(dateInUTCMinus.format());
};

const handleOnChange = (data, setData, value, field) => {
  const d = data;
  d[field].value = value;
  setData(() => ({
    ...d,
  }));
};

const getUser = () => {
  if (localStorage.getItem("session")) {
    return JSON.parse(localStorage.getItem("session")).user;
  }
};

export { handleOnChange, adjustDateTimeForTimezone, getUser };
