import { format } from "date-fns/format";
import { useParams } from "react-router-dom";
import { Segment } from "../../components/Segment";
import { TNoteRouteParams } from "../../lib/routes";
import { trpc } from "../../lib/trpc";

export const NotePage = () => {
  const { id } = useParams() as TNoteRouteParams;
  const { data, isError, isFetching, isLoading } = trpc.getNote.useQuery({ id });

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!data.note) {
    return <div>Empty</div>;
  }

  return (
    <div>
      <p>{`Note ID ${data.note.id}`}</p>
      <p>{`Created at ${format(data.note.createdAt, "dd-MM-yyyy kk:mm")}`}</p>
      <Segment title={data.note.title} description={data.note.text} size={2} />
    </div>
  );
};
