import API from "./api.service";

async function login({ email, password }) {
  return API.call({
    uri: "usuarios/iniciar-sesion",
    method: "POST",
    body: {
      email,
      password,
    },
  });
}

export default {
    login
}

export {
    login
}