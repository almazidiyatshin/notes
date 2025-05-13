import { canEditNote } from "@notes/backend/src/utils/permissions";
import { format } from "date-fns/format";
import { useParams } from "react-router-dom";
import { LinkButton } from "../../../components/Button/Button";
import { Segment } from "../../../components/Segment";
import { routes, TNoteRouteParams } from "../../../lib/routes";
import { trpc } from "../../../lib/trpc";
import { withPageWrapper } from "../../../lib/withPageWrapper";

export const NotePage = withPageWrapper({
  useQuery: () => {
    const { id } = useParams() as TNoteRouteParams;
    return trpc.getNote.useQuery({ id });
  },
  setProps: ({ queryResult, ctx, checkExists }) => {
    const note = checkExists(queryResult.data.note, "Note has not found");
    return {
      note,
      me: ctx.me,
    };
  },
  title: ({ note }) => `${note.title}`,
})(({ note, me }) => {
  return (
    <div>
      <p>{`Note ID ${note.id}`}</p>
      <p>{`Created at ${format(note.createdAt, "dd-MM-yyyy kk:mm")}`}</p>
      <p>
        {`Author ${note.author.login}`}
        {note.author.name ? `(${note.author.name})` : ""}
      </p>
      <Segment title={note.title} description={note.text} size={2} />

      {canEditNote(me, note) && (
        <>
          <LinkButton to={routes.updateNote({ id: note.id })}>Edit</LinkButton>
          <LinkButton to={routes.deleteNote({ id: note.id })}>Delete</LinkButton>
        </>
      )}
    </div>
  );
});
