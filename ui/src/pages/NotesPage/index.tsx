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
          <h2>{note.title}</h2>
          <p>{note.text}</p>
        </div>
      ))}
    </div>
  );
};
