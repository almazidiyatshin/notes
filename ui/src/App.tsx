import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { AppContextProvider } from "./lib/ctx";
import { noteRouteParams, routes } from "./lib/routes";
import { SentryUser } from "./lib/sentry";
import { TrpcProvider } from "./lib/trpc";
import { SignInPage } from "./pages/auth/SignInPage";
import { SignOutPage } from "./pages/auth/SignOutPage";
import { SignUpPage } from "./pages/auth/SignUpPage";
import { UpdateProfilePage } from "./pages/auth/UpdateProfilePage";
import { CreateNotePage } from "./pages/notes/CreateNotePage";
import { DeleteNotePage } from "./pages/notes/DeleteNotePage";
import { NotePage } from "./pages/notes/NotePage";
import { NotesPage } from "./pages/notes/NotesPage";

import "./styles/global.scss";
import { UpdateNotePage } from "./pages/notes/UpdateNotePage";
import { NotFoundPage } from "./pages/other/NotFoundPage";

export const App = () => (
  <HelmetProvider>
    <TrpcProvider>
      <AppContextProvider>
        <BrowserRouter>
          <SentryUser />
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
              <Route path={routes.deleteNote(noteRouteParams)} element={<DeleteNotePage />} />
              <Route path={"*"} element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  </HelmetProvider>
);
