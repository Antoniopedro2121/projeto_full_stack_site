import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { patchContato } from "../../service/contatos/contatoPatch";
import { deleteContato } from "../../service/contatos/contatoDelete";
import Button from "../../components/button/Button";

const AtualizarContato = ({ actionUm, token, clienteData, refleshStart }) => {
  const navegar = useNavigate();

  const schema = yup.object({
    email: yup.string().email("Deve ser um E-mail valido"),
    telefone: yup.string(),
    nome_completo: yup.string(),
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
    const onlyNumbers = new RegExp("^[0-9]+$");
    const reslt = onlyNumbers.test(data.telefone);

    if (reslt || data.telefone === "") {
      toast.promise(
        patchContato(token, data, clienteData.id)
          .then(() => {
            toast.success("contato atualizado com sucesso");
            refleshStart();
            actionUm();
          })
          .catch((err) => {
            if (err.response.status === 401) {
              localStorage.clear();
              navegar("/Login", { replace: false });
            }
            console.log(err);
            toast.error(err.response.data.message);
          }),
        {
          pending: "Promise is pending",
        }
      );
    } else {
      toast.error("Telefone so e permitido números");
    }
  }

  return (
    <form action="" onSubmit={handleSubmit(cadastro)}>
      <div className="intputConteiner">
        <label htmlFor="emailCadastro">Seu email</label>
        <input
          type="text"
          id="emailCadastro"
          placeholder={clienteData.email}
          {...register("email")}
        />
        <p>{errors.email?.message}</p>
      </div>

      <div className="intputConteiner">
        <label htmlFor="telefoneCadastro">Seu telefone</label>
        <input
          type="text"
          id="telefoneCadastro"
          placeholder={clienteData.telefone}
          {...register("telefone")}
        />
        <p>{errors.telefone?.message}</p>
      </div>

      <div className="intputConteiner">
        <label htmlFor="nome_completoCadastro">Seu nome completo</label>
        <input
          type="text"
          id="nome_completoCadastro"
          placeholder={clienteData.nome_completo}
          {...register("nome_completo")}
        />
        <p>{errors.nome_completo?.message}</p>
      </div>

      <div className="intputConteiner">
        <label htmlFor="apelidoCadastro">Seu apelido</label>
        <input
          type="text"
          id="apelidoCadastro"
          placeholder={clienteData.apelido}
          {...register("apelido")}
        />
        <p>{errors.apelido?.message}</p>
      </div>

      <div className="buttonConteiner">
        <Button>Atualizar</Button>
        <Button onClick={actionUm}>cancelar</Button>
        <Button
          onClick={() => {
            actionUm();
            toast.promise(
              deleteContato(token, clienteData.id)
                .then(() => {
                  toast.success("Cliente deletado com sucesso");
                  refleshStart();
                  actionUm();
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
          }}
        >
          Excluir
        </Button>
      </div>
    </form>
  );
};
export default AtualizarContato;
