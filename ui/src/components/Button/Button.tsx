import { Link } from "react-router-dom";

export type TButtonProps = { isLoading: boolean; children: React.ReactNode };

export const Button = ({ isLoading, children }: TButtonProps) => (
  <button type="submit" disabled={isLoading}>
    {isLoading ? "Submitting..." : children}
  </button>
);

type TLinkButtonProps = { children: React.ReactNode; to: string };

export const LinkButton = ({ children, to }: TLinkButtonProps) => <Link to={to}>{children}</Link>;
