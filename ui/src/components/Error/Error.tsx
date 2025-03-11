import { Alert } from "../Alert";
import { Segment } from "../Segment";

export const Error = ({
  title = "Oops, error",
  message = "Something went wrong",
}: {
  title?: string;
  message?: string;
}) => {
  return (
    <Segment title={title} size={1}>
      <Alert color="error">{message}</Alert>
    </Segment>
  );
};
