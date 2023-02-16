import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import ClienteCard from "../../components/cliente/cliente";
import { ModalClientes } from "../../components/modalClientes/modalClientes";
import AtualizarContato from "../../forms/atualizarContato/atualizarContato";
import ContatoFormulario from "../../forms/formularioContato/formularioContato";

import { getContato } from "../../service/contatos/contatoGetbyCliente";

const Contato = () => {
  const navegar = useNavigate();

  const { id } = useParams();

  const tokenJson = localStorage.getItem("token");

  const [contatos, setContatos] = useState([]);
  const [token, setToken] = useState("");

  const [page, setPage] = useState(0);
  const [edicao, setEdicao] = useState(false);
  const [modalCliente, setModalCliente] = useState("desativar");

  const [clienteData, setClienteData] = useState(false);
  const [reflesh, setReflesh] = useState(false);

  useEffect(() => {
    if (!tokenJson) {
      navegar("/Login", { replace: false });
    }

    const token = JSON.parse(tokenJson);
    setToken(token);

    getContato(token, id)
      .then(({ data }) => {
        const newData = [];
        for (var i = 0; i < data.length; i = i + 4) {
          newData.push(data.slice(i, i + 4));
        }

        setContatos(newData);
      })
      .catch((err) => console.log(err));
  }, [reflesh]);

  return (
    <>
      <header>
        <h1>contatos adiministração</h1>
        <button
          className="voltar"
          onClick={() => {
            navegar("/Dashboard", { replace: false });
          }}
          id="voltar"
        >
          Voltar
        </button>
      </header>

      <main>
        <ul className="conteinerClientes">
          <nav>
            {page > 0 ? (
              <button className="proximaPag" onClick={() => setPage(page - 1)}>
                Anterior
              </button>
            ) : (
              <button disabled>Anterior</button>
            )}
            <p>{page + 1}</p>
            {page !== contatos.length - 1 ? (
              <button className="proximaPag" onClick={() => setPage(page + 1)}>
                Proxima
              </button>
            ) : (
              <button disabled>Proxima</button>
            )}
          </nav>

          {contatos[page]?.map((cliente) => (
            <ClienteCard
              cliente={cliente}
              key={cliente.id}
              edicao={setEdicao}
              modal={() => setModalCliente("ativo")}
              clienteData={setClienteData}
              contato={true}
            />
          ))}
        </ul>

        <div className="conteinerClienteButton">
          <Button
            onClick={() => {
              setEdicao(false);
              setModalCliente("ativo");
            }}
          >
            Adicionar contatos
          </Button>
        </div>

        {edicao === true ? (
          <ModalClientes status={modalCliente} state={setModalCliente}>
            <AtualizarContato
              actionUm={() => {
                setEdicao(false);
                setModalCliente("desativar");
              }}
              token={token}
              edicao={setEdicao}
              clienteData={clienteData}
              refleshStart={() => setReflesh(!reflesh)}
            ></AtualizarContato>
          </ModalClientes>
        ) : (
          <ModalClientes status={modalCliente} state={setModalCliente}>
            <ContatoFormulario
              actionUm={() => setModalCliente("desativar")}
              token={token}
              refleshStart={() => setReflesh(!reflesh)}
            />
          </ModalClientes>
        )}
      </main>
    </>
  );
};
export default Contato;
