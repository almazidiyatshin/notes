import { Link, Outlet } from "react-router-dom";
import { useAppContext } from "../lib/ctx";
import { routes } from "../lib/routes";

export const Layout = () => {
  const { me } = useAppContext();

  return (
    <>
      <Link to={routes.notes()}>All notes</Link>
      {me ? (
        <>
          <Link to={routes.createNote()}>Create note</Link>
          <Link to={routes.signOut()}>{`Sign out (${me.login})`}</Link>
          <Link to={routes.updateProfile()}>Update profile</Link>
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
