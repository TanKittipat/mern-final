import api from "./api";
const baseURL = "/auth";

const checkAuth = async () => {
  return await api.get(`${baseURL}/check`);
};

const signUp = async (data) => {
  return await api.post(`${baseURL}/signup`, data);
};

const signIn = async (data) => {
  return await api.post(`${baseURL}/signin`, data);
};

const logout = async () => {
  return await api.post(`${baseURL}/logout`);
};

const AuthServices = {
  checkAuth,
  signUp,
  signIn,
  logout,
};

export default AuthServices;
