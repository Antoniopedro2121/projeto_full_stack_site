export const ModalClientes = ({ children, status, state }) => {
  let classeNameDiv = `conteinerModalCliente ${status}`;
  return (
    <div className={classeNameDiv}>
      <div className="modalCliente">
        <button
          className="closeButton"
          onClick={() => {
            state("desativar");
          }}
        >
          x
        </button>
        {children}
      </div>
    </div>
  );
};
