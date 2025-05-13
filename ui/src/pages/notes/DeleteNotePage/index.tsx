import { type TTrpcRouterOutput } from "@notes/backend/src/router";
import { zDeleteNoteTrpcInput } from "@notes/backend/src/router/notes/deleteNote/input";
import { canEditNote } from "@notes/backend/src/utils/permissions";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "../../../components/Alert";
import { Button } from "../../../components/Button";
import { Icon } from "../../../components/Icon";
import { Segment } from "../../../components/Segment";
import { useForm } from "../../../hooks/useForm";
import { routes, TNoteRouteParams } from "../../../lib/routes";
import { trpc } from "../../../lib/trpc";
import { withPageWrapper } from "../../../lib/withPageWrapper";

type TProps = {
  note: NonNullable<TTrpcRouterOutput["getNote"]["note"]>;
};

export const DeleteNotePage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { id } = useParams() as TNoteRouteParams;
    return trpc.getNote.useQuery({ id });
  },
  setProps: ({ queryResult, ctx, checkExists, checkAccess }) => {
    const note = checkExists(queryResult.data.note, "Note has not found");
    checkAccess(canEditNote(ctx.me, note), "An note can only be deleted by the author");
    return {
      note,
    };
  },
  title: "Delete note",
})(({ note }: TProps) => {
  const navigate = useNavigate();
  const deleteNote = trpc.deleteNote.useMutation();

  const { formik, alertProps, buttonProps } = useForm({
    onSubmit: async () => {
      await deleteNote.mutateAsync({ id: note.id });
      navigate(routes.notes());
    },
    validationSchema: zDeleteNoteTrpcInput.omit({ id: true }),
  });

  return (
    <Segment title={`Delete note: ${note.title}`} size={1}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <div>{format(note.createdAt, "dd-MM-yyyy kk:mm")}</div>
        <div>{note.text}</div>
        <Alert {...alertProps} />
        <Button {...buttonProps}>
          <>
            <Icon name="delete" />
            Delete note
          </>
        </Button>
      </form>
    </Segment>
  );
});
