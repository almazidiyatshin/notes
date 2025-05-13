import { createRef } from "react";
import { Link, Outlet } from "react-router-dom";
import NotesIcon from "../../assets/notes.svg?react";
import { useAppContext } from "../../lib/ctx";
import { routes } from "../../lib/routes";
import styles from "./styles.module.scss";

export const layoutContentElRef = createRef<HTMLDivElement>();

export const Layout = () => {
  const { me } = useAppContext();

  return (
    <>
      <NotesIcon className={styles.logo} />
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
      <div ref={layoutContentElRef}>
        <Outlet />
      </div>
    </>
  );
};
