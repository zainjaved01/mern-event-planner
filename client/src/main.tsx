import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import EventsPage from "./pages/EventsPage";
import EditPage from "./pages/EditPage";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />} path="/">
          <Route index element={<EventsPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/new" element={<EditPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
