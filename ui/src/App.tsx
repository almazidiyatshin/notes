import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { noteRouteParams, routes } from "./lib/routes";
import { TrpcProvider } from "./lib/trpc";
import { CreateNotePage } from "./pages/CreateNotePage";
import { NotePage } from "./pages/NotePage";
import { NotesPage } from "./pages/NotesPage";

import "./styles/global.scss";

export const App = () => (
  <TrpcProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={routes.notes()} element={<NotesPage />} />
          <Route path={routes.createNote()} element={<CreateNotePage />} />
          <Route path={routes.note(noteRouteParams)} element={<NotePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </TrpcProvider>
);
