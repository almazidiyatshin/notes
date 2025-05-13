import { zGetNotesTrpcInput } from "@notes/backend/src/router/notes/getNotes/input";
import InfiniteScroll from "react-infinite-scroller";
import { Link } from "react-router-dom";
import { useDebounceValue } from "usehooks-ts";
import { Alert } from "../../../components/Alert";
import { Input } from "../../../components/Input";
import { layoutContentElRef } from "../../../components/Layout/Layout";
import { Segment } from "../../../components/Segment";
import { useForm } from "../../../hooks/useForm";
import { routes } from "../../../lib/routes";
import { trpc } from "../../../lib/trpc";
// import { withPageWrapper } from "../../../lib/withPageWrapper";

import styles from "./styles.module.scss";

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
  const { formik } = useForm({
    initialValues: { search: "" },
    validationSchema: zGetNotesTrpcInput.pick({ search: true }),
  });
  const [debouncedValue] = useDebounceValue(formik.values.search, 500);

  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getNotes.useInfiniteQuery(
      {
        search: debouncedValue,
        limit: 10,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor;
        },
      }
    );

  return (
    <Segment title="All notes" size={1}>
      <div>
        <Input label="Search" name="search" formik={formik} />
      </div>

      {isLoading || isRefetching ? (
        <div>Loading...</div>
      ) : isError ? (
        <Alert color="error">{error.message}</Alert>
      ) : !data.pages[0].notes.length ? (
        <Alert color="info">Nothing found by search</Alert>
      ) : (
        <InfiniteScroll
          threshold={250}
          loadMore={() => {
            if (!isFetchingNextPage && hasNextPage) {
              fetchNextPage();
            }
          }}
          hasMore={hasNextPage}
          loader={<div key="loader">Loading...</div>}
          getScrollParent={() => layoutContentElRef.current}
          useWindow={(layoutContentElRef.current && getComputedStyle(layoutContentElRef.current).overflow) !== "auto"}
        >
          <div className={styles.notes}>
            {data.pages
              .flatMap((page) => page.notes)
              .map((note) => (
                <div key={note.id} className={styles.note}>
                  <Segment size={2} title={<Link to={routes.note({ id: note.id })}>{note.title}</Link>} />
                </div>
              ))}
          </div>
        </InfiniteScroll>
      )}
    </Segment>
  );
};
