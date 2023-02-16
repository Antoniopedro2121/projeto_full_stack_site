import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { postClientesCadastro } from "../../service/clientes/clientePostCadastro";
import Button from "../../components/button/Button";

const ClienteFormulario = ({ actionUm, token }) => {
  const navegar = useNavigate();
  const schema = yup.object({
    email: yup
      .string()
      .required("Campo obrigatorio")
      .email("Deve ser um E-mail valido"),
    telefone: yup.number().required("Campo obrigatorio"),
    nome_completo: yup.string().required("Campo obrigatorio"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function cadastro({ ...data }) {
    toast.promise(
      postClientesCadastro(token, data)
        .then(() => {
          navegar("/Login", { replace: false });
          toast.success("Cadastro realizado com sucesso");
        })
        .catch((err) => {
          if (err.response.status === 401) {
            localStorage.clear();
            navegar("/Login", { replace: false });
          }
          toast.error(err.response.data.message);
        }),
      {
        pending: "Promise is pending",
      }
    );
  }

  return (
    <form action="" className="Cadastro" onSubmit={handleSubmit(cadastro)}>
      <div className="intputConteiner">
        <label htmlFor="emailCadastro">Seu email</label>
        <input type="text" id="emailCadastro" {...register("email")} />
        <p>{errors.email?.message}</p>
      </div>

      <div className="intputConteiner">
        <label htmlFor="telefoneCadastro">Seu telefone</label>
        <input type="text" id="telefoneCadastro" {...register("telefone")} />
        <p>{errors.telefone?.message}</p>
      </div>

      <div className="intputConteiner">
        <label htmlFor="nome_completoCadastro">Seu nome completo</label>
        <input
          type="text"
          id="nome_completoCadastro"
          {...register("nome_completo")}
        />
        <p>{errors.nome_completo?.message}</p>
      </div>

      <div className="buttonConteiner">
        <Button>Cadastrar</Button>
        <Button onClick={actionUm}>cancelar</Button>
      </div>
    </form>
  );
};
export default ClienteFormulario;
