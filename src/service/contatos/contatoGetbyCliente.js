import api from "../api";

export async function getContato(token, cliente) {
  const { data, status } = await api.get(`/contato/cliente/${cliente}`, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  return { data, status };
}
