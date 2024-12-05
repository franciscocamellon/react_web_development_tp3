const handleInputChange = (field, value, data, setData) => {
  setData({ ...data, [field]: value });
};

const generarteSubtitle = (item, translate) => {
  return "oi";
};

const selectItem = (value, key, data, setData) => {
  setData({ ...data, [key]: value });
};

const getTitle = (action_type) => {
  switch (action_type) {
    case "1":
      return "sleep";
    case "2":
      return "eat";
    case "3":
      return "diaper";
    default:
      return "eat";
  }
};

const validateDiaper = (data) => {
  return [];
};
const validateSleep = (data) => {
  return [];
};
const validateEat = (data) => {
  return [];
};

const validateFields = (data, actionType) => {
  switch (actionType) {
    case "1":
      return validateSleep(data);
    case "2":
      return validateEat(data);
    case "3":
      return validateDiaper(data);
    default:
      return validateEat(data);
  }
};

export { handleInputChange, generarteSubtitle, getTitle, selectItem, validateFields };
