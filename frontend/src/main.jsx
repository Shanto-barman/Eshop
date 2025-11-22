import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app.jsx";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { UserProvider } from "./context/userContext";

let persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
     <UserProvider>
          <App />
       </UserProvider>
        <Toaster />
      </PersistGate>
    </Provider>
  </StrictMode>
);
