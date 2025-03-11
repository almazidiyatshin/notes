import { zCreateNoteTrpcInput } from "@notes/backend/src/router/notes/createNote/input";
import { Alert } from "../../../components/Alert";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Segment } from "../../../components/Segment";
import { Textarea } from "../../../components/Textarea";
import { useForm } from "../../../hooks/useForm";
import { trpc } from "../../../lib/trpc";
import { withPageWrapper } from "../../../lib/withPageWrapper";

export const CreateNotePage = withPageWrapper({ authorizedOnly: true })(() => {
  const createNote = trpc.createNote.useMutation();

  const { formik, alertProps, buttonProps } = useForm({
    successMessage: "Idea created!",
    resetOnSuccess: true,
    initialValues: { title: "", text: "" },
    validationSchema: zCreateNoteTrpcInput,
    onSubmit: async (values) => {
      await createNote.mutateAsync(values);
    },
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
        <Alert {...alertProps} />
        <Button {...buttonProps}>Create note</Button>
      </form>
    </Segment>
  );
});
