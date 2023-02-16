import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import Modal from "../../components/userModal/modal";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { postLogin } from "../../service/login/login";

import { toast } from "react-toastify";
import { useEffect } from "react";

const Login = () => {
  const navegar = useNavigate();

  const tokenJson = localStorage.getItem("token");

  useEffect(() => {
    if (tokenJson) {
      navegar("/Dashboard", { replace: false });
    }
  }, []);

  const schema = yup.object({
    email: yup.string().required("Campo obrigatorio"),
    password: yup.string().required("Campo obrigatorio"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function login(data) {
    toast.promise(
      postLogin(data)
        .then(() => {
          toast.success("Login realizado com sucesso");
          navegar("/Dashboard", { replace: false });
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
        <form action="" className="Login" onSubmit={handleSubmit(login)}>
          <div className="Login--intputConteiner">
            <label htmlFor="emailLogin">Seu email</label>
            <input type="text" id="emailLogin" {...register("email")} />
            <p>{errors.email?.message}</p>
          </div>

          <div className="Login--intputConteiner">
            <label htmlFor="senhaLogin">Sua senha</label>
            <input type="text" id="senhaLogin" {...register("password")} />
            <p>{errors.password?.message}</p>
          </div>

          <div className="buttonConteiner">
            <Button>Login</Button>
            <Button
              onClick={() => {
                navegar("/Cadastro", { replace: false });
              }}
            >
              cadastro
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default Login;
