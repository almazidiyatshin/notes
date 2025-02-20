import { zSignUpTrpcInput } from "@notes/backend/src/router/signUp/input";
import { useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import Cookies from "js-cookie";
import { useActionState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Segment } from "../../components/Segment";
import { routes } from "../../lib/routes";
import { trpc } from "../../lib/trpc";

export const SignUpPage = () => {
  const signUp = trpc.signUp.useMutation();
  const trpcUtils = trpc.useUtils();
  const navigate = useNavigate();

  const [{ errorMessage }, dispatch] = useActionState<
    {
      errorMessage: string | null;
    },
    { type: "error"; payload: any }
  >(
    (prevState, action) => {
      switch (action.type) {
        case "error": {
          return { errorMessage: action.payload };
        }
        default: {
          return prevState;
        }
      }
    },
    { errorMessage: null }
  );

  const handleError = (message: string | null) => dispatch({ type: "error", payload: message });

  const formik = useFormik({
    initialValues: { login: "", password: "", passwordAgain: "" },
    onSubmit: async (values) => {
      try {
        const { token } = await signUp.mutateAsync(values);
        Cookies.set("token", token, { expires: 999999 });
        trpcUtils.invalidate();
        navigate(routes.notes());
      } catch (e: any) {
        handleError(e.message);
        setTimeout(() => {
          handleError(null);
        }, 3000);
      }
    },
    validate: withZodSchema(
      zSignUpTrpcInput.extend({ passwordAgain: z.string().min(1, "Repeat password!") }).superRefine((val, ctx) => {
        if (val.password !== val.passwordAgain) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Passwords must be the same",
            path: ["passwordAgain"],
          });
        }
      })
    ),
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
        {!!errorMessage && (
          <Alert color="error">
            <p>{errorMessage}</p>
          </Alert>
        )}
        <Button isLoading={formik.isSubmitting}>Sign up</Button>
      </form>
    </Segment>
  );
};
