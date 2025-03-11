import { Link } from "react-router-dom";
import { Alert } from "../../../components/Alert";
import { Segment } from "../../../components/Segment";
import { routes } from "../../../lib/routes";
import { trpc } from "../../../lib/trpc";
// import { withPageWrapper } from "../../../lib/withPageWrapper";

// export const NotesPage = withPageWrapper({
//   useQuery: () => {
//     return trpc.getNotes.useInfiniteQuery({ limit: 2 }, { getNextPageParam: (lastPage) => lastPage.nextCursor });
//   },
//   checkExists: ({ queryResult }) => !!queryResult.data.pages,
//   checkExistsMessage: "Notes has not found",
//   setProps: ({ queryResult }) => ({
//     notes: queryResult.data.pages.flatMap((page) => page.notes),
//     hasNextPage: queryResult.has,
//   }),
// })(({ notes }) => {
//   return (
//     <div>
//       {notes.map((note) => (
//         <div key={note.id}>
//           <Segment title={<Link to={routes.note({ id: note.id })}>{note.title}</Link>} size={2} />
//         </div>
//       ))}
//     </div>
//   );
// });

export const NotesPage = () => {
  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getNotes.useInfiniteQuery(
      {
        limit: 2,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor;
        },
      }
    );

  return (
    <Segment title="All notes" size={1}>
      {isLoading || isRefetching ? (
        <div>Loading...</div>
      ) : isError ? (
        <Alert color="error">{error.message}</Alert>
      ) : (
        <>
          {data.pages
            .flatMap((page) => page.notes)
            .map((note) => (
              <div key={note.id}>
                <Segment size={2} title={<Link to={routes.note({ id: note.id })}>{note.title}</Link>} />
              </div>
            ))}
          <div>
            {hasNextPage && !isFetchingNextPage && (
              <button
                onClick={() => {
                  fetchNextPage();
                }}
              >
                Load more
              </button>
            )}
            {isFetchingNextPage && <span>Loading...</span>}
          </div>
        </>
      )}
    </Segment>
  );
};
