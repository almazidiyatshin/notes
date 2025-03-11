import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AppContextProvider } from "./lib/ctx";
import { noteRouteParams, routes } from "./lib/routes";
import { TrpcProvider } from "./lib/trpc";
import { SignInPage } from "./pages/auth/SignInPage";
import { SignOutPage } from "./pages/auth/SignOutPage";
import { SignUpPage } from "./pages/auth/SignUpPage";
import { UpdateProfilePage } from "./pages/auth/UpdateProfilePage";
import { CreateNotePage } from "./pages/notes/CreateNotePage";
import { NotePage } from "./pages/notes/NotePage";
import { NotesPage } from "./pages/notes/NotesPage";

import "./styles/global.scss";
import { UpdateNotePage } from "./pages/notes/UpdateNotePage";
import { NotFoundPage } from "./pages/other/NotFoundPage";

export const App = () => (
  <TrpcProvider>
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path={routes.signOut()} element={<SignOutPage />} />
          <Route element={<Layout />}>
            <Route path={routes.updateProfile()} element={<UpdateProfilePage />} />
            <Route path={routes.signIn()} element={<SignInPage />} />
            <Route path={routes.signUp()} element={<SignUpPage />} />
            <Route path={routes.notes()} element={<NotesPage />} />
            <Route path={routes.createNote()} element={<CreateNotePage />} />
            <Route path={routes.note(noteRouteParams)} element={<NotePage />} />
            <Route path={routes.updateNote(noteRouteParams)} element={<UpdateNotePage />} />
            <Route path={"*"} element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  </TrpcProvider>
);
