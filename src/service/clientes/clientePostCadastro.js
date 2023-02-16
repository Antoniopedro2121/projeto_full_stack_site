import api from "../api";

export async function postClientesCadastro(token, bodyUser) {
  const { data, status } = await api.post("/client", bodyUser, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  return { data, status };
}
