import api from "../api";

export async function postUser(userData) {
  const { data, status } = await api.post("/user", userData);

  return { data, status };
}
