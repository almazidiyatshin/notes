import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../lib/routes";
import { trpc } from "../../../lib/trpc";
import { withPageWrapper } from "../../../lib/withPageWrapper";

export const SignOutPage = withPageWrapper({ authorizedOnly: true })(() => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();

  useEffect(() => {
    Cookies.remove("token");
    trpcUtils.invalidate().then(() => {
      navigate(routes.signIn());
    });
  }, []);

  return <p>Loading...</p>;
});
