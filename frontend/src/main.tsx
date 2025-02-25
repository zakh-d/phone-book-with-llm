import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App/App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
