import { zSignInTrpcInput } from "@notes/backend/src/router/auth/signIn/input";
import Cookies from "js-cookie";
import { Alert } from "../../../components/Alert";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Segment } from "../../../components/Segment";
import { useForm } from "../../../hooks/useForm";
import { trpc } from "../../../lib/trpc";
import { withPageWrapper } from "../../../lib/withPageWrapper";

export const SignInPage = withPageWrapper({ redirectAuthorized: true })(() => {
  const signIn = trpc.signIn.useMutation();
  const trpcUtils = trpc.useUtils();

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: { login: "", password: "" },
    onSubmit: async (values) => {
      const { token } = await signIn.mutateAsync(values);
      Cookies.set("token", token, { expires: 999999 });
      trpcUtils.invalidate();
    },
    validationSchema: zSignInTrpcInput,
  });

  return (
    <Segment title="Sign in" size={1}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Input name="login" label="Login" formik={formik} />
        <Input name="password" label="Password" formik={formik} type="password" />
        <Alert {...alertProps} />
        <Button {...buttonProps}>Sign in</Button>
      </form>
    </Segment>
  );
});
