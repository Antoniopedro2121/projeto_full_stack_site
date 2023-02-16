import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AtualizarCliente from "../../forms/atualizarCliente/atualizarCliente";
import Button from "../../components/button/Button";
import ClienteCard from "../../components/cliente/cliente";
import { ModalClientes } from "../../components/modalClientes/modalClientes";
import { GlobalContext } from "../../context/GlobalContext";
import { getClientes } from "../../service/clientes/clientesGetAll";
import ClienteFormulario from "../../forms/formularioCliente/formularioCliente";

const Dashboard = () => {
  const navegar = useNavigate();

  const tokenJson = localStorage.getItem("token");

  const [clientes, setClientes] = useState([]);
  const [modalCliente, setModalCliente] = useState("desativar");
  const [token, setToken] = useState("");

  const { page, setPage } = useContext(GlobalContext);

  const [edicao, setEdicao] = useState(false);

  const [clienteData, setClienteData] = useState(false);

  useEffect(() => {
    if (!tokenJson) {
      navegar("/Login", { replace: false });
    }

    const token = JSON.parse(tokenJson);
    setToken(token);

    getClientes(token)
      .then(({ data }) => {
        const newData = [];
        for (var i = 0; i < data.length; i = i + 4) {
          newData.push(data.slice(i, i + 4));
        }
        setClientes(newData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <header>
        <h1>clientes adiministração</h1>
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
            {page !== clientes.length - 1 ? (
              <button className="proximaPag" onClick={() => setPage(page + 1)}>
                Proxima
              </button>
            ) : (
              <button disabled>Proxima</button>
            )}
          </nav>
          {clientes[page]?.map((cliente) => (
            <ClienteCard
              cliente={cliente}
              key={cliente.id}
              edicao={setEdicao}
              modal={() => setModalCliente("ativo")}
              clienteData={setClienteData}
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
            Adicionar clientes
          </Button>
        </div>

        {edicao === true ? (
          <ModalClientes status={modalCliente} state={setModalCliente}>
            <AtualizarCliente
              actionUm={() => {
                setEdicao(false);
                setModalCliente("desativar");
              }}
              token={token}
              edicao={setEdicao}
              clienteData={clienteData}
            ></AtualizarCliente>
          </ModalClientes>
        ) : (
          <ModalClientes status={modalCliente} state={setModalCliente}>
            <ClienteFormulario
              actionUm={() => setModalCliente("desativar")}
              token={token}
            />
          </ModalClientes>
        )}
      </main>
    </>
  );
};
export default Dashboard;
