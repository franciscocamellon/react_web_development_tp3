const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    return { error: true, heperText: "O campo de email é obrigatório" };
  } else if (!emailRegex.test(email)) {
    return { error: true, heperText: "Email inválido" };
  } else {
    return { error: false, heperText: null };
  }
};

const validatePassword = (password) => {
  if (password === "") {
    return { error: true, heperText: "O campo password é obrigatório" };
  } else if (password.length > 5) {
    return { error: false, heperText: null };
  } else {
    return { error: true, heperText: "A senha precisa ter 6 ou mais caracteres." };
  }
};

export { validateEmail, validatePassword };
