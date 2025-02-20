import { zCreateNoteTrpcInput } from "@notes/backend/src/router/createNote/input";
import { useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { useActionState } from "react";
import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Segment } from "../../components/Segment";
import { Textarea } from "../../components/Textarea";
import { trpc } from "../../lib/trpc";

export const CreateNotePage = () => {
  const createNote = trpc.createNote.useMutation();

  const [{ isSuccessMessageVisible, errorMessage }, dispatch] = useActionState<
    {
      isSuccessMessageVisible: boolean;
      errorMessage: string | null;
    },
    { type: "success" | "error"; payload: any }
  >(
    (prevState, action) => {
      switch (action.type) {
        case "success": {
          return { isSuccessMessageVisible: action.payload, errorMessage: null };
        }
        case "error": {
          return { isSuccessMessageVisible: false, errorMessage: action.payload };
        }
        default: {
          return prevState;
        }
      }
    },
    { isSuccessMessageVisible: false, errorMessage: null }
  );

  const handleSuccess = (value: boolean) => dispatch({ type: "success", payload: value });
  const handleError = (message: string | null) => dispatch({ type: "error", payload: message });

  const formik = useFormik({
    initialValues: { title: "", text: "" },
    onSubmit: async (values) => {
      try {
        await createNote.mutateAsync(values);
        formik.resetForm();
        handleSuccess(true);
        setTimeout(() => {
          handleSuccess(false);
        }, 3000);
      } catch (e: any) {
        handleError(e.message);
        setTimeout(() => {
          handleError(null);
        }, 3000);
      }
    },
    validate: withZodSchema(zCreateNoteTrpcInput),
  });

  return (
    <Segment title="Create note" size={1}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Input name="title" label="Title" formik={formik} />
        <Textarea name="text" label="Text" formik={formik} />
        {isSuccessMessageVisible && (
          <Alert color="success">
            <p>Idea created!</p>
          </Alert>
        )}
        {!!errorMessage && (
          <Alert color="error">
            <p>{errorMessage}</p>
          </Alert>
        )}
        <Button isLoading={formik.isSubmitting}>Create note</Button>
      </form>
    </Segment>
  );
};
