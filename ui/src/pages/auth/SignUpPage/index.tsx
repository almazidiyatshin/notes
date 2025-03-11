import { zSignUpTrpcInput } from "@notes/backend/src/router/auth/signUp/input";
import Cookies from "js-cookie";
import { z } from "zod";
import { Alert } from "../../../components/Alert";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Segment } from "../../../components/Segment";
import { useForm } from "../../../hooks/useForm";
import { trpc } from "../../../lib/trpc";
import { withPageWrapper } from "../../../lib/withPageWrapper";

export const SignUpPage = withPageWrapper({ redirectAuthorized: true })(() => {
  const signUp = trpc.signUp.useMutation();
  const trpcUtils = trpc.useUtils();

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: { login: "", password: "", passwordAgain: "" },
    onSubmit: async (values) => {
      const { token } = await signUp.mutateAsync(values);
      Cookies.set("token", token, { expires: 999999 });
      trpcUtils.invalidate();
    },
    validationSchema: zSignUpTrpcInput
      .extend({ passwordAgain: z.string().min(1, "Repeat password!") })
      .superRefine((val, ctx) => {
        if (val.password !== val.passwordAgain) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Passwords must be the same",
            path: ["passwordAgain"],
          });
        }
      }),
  });

  return (
    <Segment title="Sign up" size={1}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Input name="login" label="Login" formik={formik} />
        <Input name="password" label="Password" formik={formik} type="password" />
        <Input name="passwordAgain" label="Password again" formik={formik} type="password" />
        <Alert {...alertProps} />
        <Button {...buttonProps}>Sign up</Button>
      </form>
    </Segment>
  );
});
