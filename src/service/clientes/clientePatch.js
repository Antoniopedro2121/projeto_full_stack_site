import api from "../api";

export async function patchCliente(token, bodyUser, cliente) {
  const { data, status } = await api.patch(`/client/${cliente}`, bodyUser, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  return { data, status };
}
