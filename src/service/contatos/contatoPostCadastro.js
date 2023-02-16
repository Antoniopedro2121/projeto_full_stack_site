import api from "../api";

export async function postContatosCadastro(token, bodyUser, id) {
  const { data, status } = await api.post(`/contato/${id}`, bodyUser, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  return { data, status };
}
