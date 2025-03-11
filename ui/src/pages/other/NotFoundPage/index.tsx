import { Error } from "../../../components/Error";

export const NotFoundPage = ({
  title = "Not Found",
  message = "This page does not exist",
}: {
  title?: string;
  message?: string;
}) => <Error title={title} message={message} />;
