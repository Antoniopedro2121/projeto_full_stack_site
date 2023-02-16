import api from "../api";

export async function deleteContato(token, cliente) {
  const { data, status } = await api.delete(`/contato/${cliente}`, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  return { data, status };
}
