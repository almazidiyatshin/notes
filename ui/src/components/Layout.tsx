import { Link, Outlet } from "react-router-dom";
import { routes } from "../lib/routes";
import { trpc } from "../lib/trpc";

export const Layout = () => {
  const { data, isLoading, isFetching, isError } = trpc.getMe.useQuery();

  if (isLoading || isFetching || isError) {
    return null;
  }

  return (
    <>
      <Link to={routes.notes()}>All notes</Link>
      {data.me ? (
        <>
          <Link to={routes.createNote()}>Create note</Link>
          <Link to={routes.signOut()}>Sign out</Link>
        </>
      ) : (
        <>
          <Link to={routes.signIn()}>Sign in</Link>
          <Link to={routes.signUp()}>Sign up</Link>
        </>
      )}
      <hr />
      <Outlet />
    </>
  );
};
