import { Link } from "react-router-dom";

const ClienteCard = ({ cliente, edicao, modal, clienteData, contato }) => {
  const data = new Date(cliente.date_creation);

  return (
    <li id={cliente.id} className="clienteCard">
      <button
        className="Editar"
        onClick={() => {
          edicao(true);
          modal();
          clienteData(cliente);
        }}
      >
        Editar
      </button>
      <p>
        Cliente Nome: <span>{cliente.nome_completo}</span>
      </p>
      <p>
        Cliente Email: <span>{cliente.email}</span>
      </p>
      <p>
        Cliente Telefone: <span>{cliente.telefone}</span>
      </p>
      <p>
        Hora de criação: <span>{data.toLocaleString()}</span>
      </p>
      {contato ? (
        <p>
          Cliente Apelido: <span>{cliente.apelido}</span>
        </p>
      ) : (
        <Link to={`/Contato/${cliente.id}`}>Contatos</Link>
      )}
    </li>
  );
};
export default ClienteCard;
