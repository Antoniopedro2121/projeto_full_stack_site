import api from "../api";

export async function postLogin(userData) {
  const { data, status } = await api.post("/login", userData);

  localStorage.setItem("token", JSON.stringify(data.token));

  return { data, status };
}
