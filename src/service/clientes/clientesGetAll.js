import api from "../api";

export async function getClientes(token) {
  const { data, status } = await api.get("/client/all", {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  return { data, status };
}
