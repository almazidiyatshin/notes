import { Link } from "react-router-dom";
import { Segment } from "../../components/Segment";
import { routes } from "../../lib/routes";
import { trpc } from "../../lib/trpc";

export const NotesPage = () => {
  const { data, isError, isFetching, isLoading } = trpc.getNotes.useQuery();

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      {data?.notes.map((note) => (
        <div key={note.id}>
          <Segment title={<Link to={routes.note({ id: note.id })}>{note.title}</Link>} size={2} />
        </div>
      ))}
    </div>
  );
};
