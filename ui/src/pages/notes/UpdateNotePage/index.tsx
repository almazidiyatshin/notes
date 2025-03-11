import { type TTrpcRouterOutput } from "@notes/backend/src/router";
import { zUpdateNoteTrpcInput } from "@notes/backend/src/router/notes/updateNote/input";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "../../../components/Alert";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Segment } from "../../../components/Segment";
import { Textarea } from "../../../components/Textarea";
import { useForm } from "../../../hooks/useForm";
import { routes, TNoteRouteParams } from "../../../lib/routes";
import { trpc } from "../../../lib/trpc";
import { withPageWrapper } from "../../../lib/withPageWrapper";

type TProps = {
  note: NonNullable<TTrpcRouterOutput["getNote"]["note"]>;
};

export const UpdateNotePage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { id } = useParams() as TNoteRouteParams;
    return trpc.getNote.useQuery({ id });
  },
  setProps: ({ queryResult, ctx, checkExists, checkAccess }) => {
    const note = checkExists(queryResult.data.note, "Note has not found");
    checkAccess(ctx.me?.id === note.authorId, "An note can only be edited by the author");
    return {
      note,
    };
  },
})(({ note }: TProps) => {
  const navigate = useNavigate();
  const updateNote = trpc.updateNote.useMutation();

  const { formik, alertProps, buttonProps } = useForm({
    initialValues: { title: note.title, text: note.text },
    onSubmit: async (values) => {
      await updateNote.mutateAsync({ id: note.id, ...values });
      navigate(routes.note({ id: note.id }));
    },
    validationSchema: zUpdateNoteTrpcInput.omit({ id: true }),
  });

  return (
    <Segment title={`Edit note: ${note.title}`} size={1}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Input name="title" label="Title" formik={formik} />
        <Textarea name="text" label="Text" formik={formik} />
        <Alert {...alertProps} />
        <Button {...buttonProps}>Edit note</Button>
      </form>
    </Segment>
  );
});
