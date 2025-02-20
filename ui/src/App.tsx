import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { noteRouteParams, routes } from "./lib/routes";
import { TrpcProvider } from "./lib/trpc";
import { CreateNotePage } from "./pages/CreateNotePage";
import { NotePage } from "./pages/NotePage";
import { NotesPage } from "./pages/NotesPage";

import "./styles/global.scss";
import { SignInPage } from "./pages/SignInPage";
import { SignOutPage } from "./pages/SignOutPage";
import { SignUpPage } from "./pages/SignUpPage";

export const App = () => (
  <TrpcProvider>
    <BrowserRouter>
      <Routes>
        <Route path={routes.signOut()} element={<SignOutPage />} />
        <Route element={<Layout />}>
          <Route path={routes.signIn()} element={<SignInPage />} />
          <Route path={routes.signUp()} element={<SignUpPage />} />
          <Route path={routes.notes()} element={<NotesPage />} />
          <Route path={routes.createNote()} element={<CreateNotePage />} />
          <Route path={routes.note(noteRouteParams)} element={<NotePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </TrpcProvider>
);
