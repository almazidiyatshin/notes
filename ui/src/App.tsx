import { TrpcProvider } from "./lib/trpc";
import { NotesPage } from "./pages/NotesPage";

export const App = () => (
  <TrpcProvider>
    <NotesPage />
  </TrpcProvider>
);
