import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Modal from "../../components/userModal/modal";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { postUser } from "../../service/user/createUser";

import { toast } from "react-toastify";

const Cadasto = () => {
  const navegar = useNavigate();

  const schema = yup.object({
    email: yup
      .string()
      .required("Campo obrigatorio")
      .email("Deve ser um E-mail valido"),
    password: yup
      .string()
      .required("Campo obrigatorio")
      .matches(/[A-Z]/, "Deve conter ao menos 1 letra maiúscula")
      .matches(/([a-z])/, "Deve conter ao menos 1 letra minúscula")
      .matches(/(\d)/, "Deve conter ao menos 1 número")
      .matches(/(\W)|_/, "Deve conter ao menos 1 caracter especial")
      .matches(/.{8,}/, "deve conter ao menos 8 dígitos"),
    confirmaSenha: yup
      .string()
      .required("Campo obrigatorio")
      .oneOf([yup.ref("password")], "Deve ser igual a senha"),
    name: yup.string().required("Campo obrigatorio"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function cadastro({ confirmaSenha, ...data }) {
    toast.promise(
      postUser(data)
        .then(() => {
          toast.success("Cadastro realizado com sucesso");

          navegar("/Login", { replace: false });
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Promise is pending",
      }
    );
  }

  return (
    <>
      <Modal>
        <form action="" className="Cadastro" onSubmit={handleSubmit(cadastro)}>
          <div className="Cadastro--intputConteiner">
            <label htmlFor="emailCadastro">Seu email</label>
            <input type="text" id="emailCadastro" {...register("email")} />
            <p>{errors.email?.message}</p>
          </div>

          <div className="Cadastro--intputConteiner">
            <label htmlFor="nameCadastro">Seu nome</label>
            <input type="text" id="nameCadastro" {...register("name")} />
            <p>{errors.name?.message}</p>
          </div>

          <div className="Cadastro--intputConteiner">
            <label htmlFor="senhaCadastro">Sua senha</label>
            <input type="text" id="senhaCadastro" {...register("password")} />
            <p>{errors.password?.message}</p>
          </div>

          <div className="Cadastro--intputConteiner">
            <label htmlFor="senhaConfirmeCadastro">Confirme sua senha</label>
            <input
              type="text"
              id="senhaConfirmeCadastro"
              {...register("confirmaSenha")}
            />
            <p>{errors.confirmaSenha?.message}</p>
          </div>

          <div className="buttonConteiner">
            <Button
              onClick={() => {
                navegar("/Login", { replace: false });
              }}
            >
              Login
            </Button>
            <Button>cadastro</Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default Cadasto;
