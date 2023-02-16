import { createContext, useState } from "react";

export const GlobalContext = createContext({});

export const ContextProvider = ({ children }) => {
  const [page, setPage] = useState(0);

  return (
    <GlobalContext.Provider value={{ page, setPage }}>
      {children}
    </GlobalContext.Provider>
  );
};
