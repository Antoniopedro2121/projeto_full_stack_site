import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { postContatosCadastro } from "../../service/contatos/contatoPostCadastro";
import Button from "../../components/button/Button";

const ContatoFormulario = ({ actionUm, token, refleshStart }) => {
  const { id } = useParams();

  const navegar = useNavigate();
  const schema = yup.object({
    email: yup
      .string()
      .required("Campo obrigatorio")
      .email("Deve ser um E-mail valido"),
    telefone: yup.number().required("Campo obrigatorio"),
    nome_completo: yup.string().required("Campo obrigatorio"),
    apelido: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function cadastro({ ...data }) {
    console.log(data);
    toast.promise(
      postContatosCadastro(token, data, id)
        .then(() => {
          actionUm();
          toast.success("Cadastro realizado com sucesso");
          refleshStart();
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

      <div className="intputConteiner">
        <label htmlFor="apelidoCadastro">Seu apelido</label>
        <input type="text" id="apelidoCadastro" {...register("apelido")} />
        <p>{errors.apelido?.message}</p>
      </div>

      <div className="buttonConteiner">
        <Button>Cadastrar</Button>
        <Button onClick={actionUm}>cancelar</Button>
      </div>
    </form>
  );
};
export default ContatoFormulario;
