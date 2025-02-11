import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { Router, RouterProvider } from "react-router-dom";
import { rooter } from "./assets/routes/index.jsx";
import DataUserContextProvider from "./context/sortingcontext/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataUserContextProvider>
      <RouterProvider router={rooter} />
    </DataUserContextProvider>
  </StrictMode>
);
