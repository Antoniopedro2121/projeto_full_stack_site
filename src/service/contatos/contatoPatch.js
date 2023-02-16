import api from "../api";

export async function patchContato(token, bodyUser, cliente) {
  const { data, status } = await api.patch(`/contato/${cliente}`, bodyUser, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  return { data, status };
}
