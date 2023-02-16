import "../src/global/global_style.css";

import { ContextProvider } from "./context/GlobalContext";

import MainRoute from "./routes/Route";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <MainRoute />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </ContextProvider>
    </div>
  );
}

export default App;
