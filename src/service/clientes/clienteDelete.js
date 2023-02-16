import api from "../api";

export async function deleteCliente(token, cliente) {
  const { data, status } = await api.delete(`/client/${cliente}`, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  return { data, status };
}
