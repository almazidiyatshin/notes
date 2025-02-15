import { Link, Outlet } from "react-router-dom";
import { routes } from "../lib/routes";

export const Layout = () => (
  <>
    <Link to={routes.notes()}>All notes</Link>
    <Link to={routes.createNote()}>Create note</Link>
    <hr />
    <Outlet />
  </>
);
