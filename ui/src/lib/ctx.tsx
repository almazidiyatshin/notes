import { type TTrpcRouterOutput } from "@notes/backend/src/router";
import { createContext, useContext } from "react";
import { trpc } from "./trpc";

export type TAppContext = {
  me: TTrpcRouterOutput["getMe"]["me"];
};

const AppContext = createContext<TAppContext>({
  me: null,
});

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, isFetching, isError, error } = trpc.getMe.useQuery();

  return (
    <AppContext.Provider value={{ me: data?.me || null }}>
      {isLoading || isFetching ? <div>Loading...</div> : isError ? <div>{error.message}</div> : children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
