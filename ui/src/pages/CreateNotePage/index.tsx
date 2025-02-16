import { zCreateNoteTrpcInput } from "@notes/backend/src/router/createNote/input";
import { useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { trpc } from "../../lib/trpc";

export const CreateNotePage = () => {
  const createNote = trpc.createNote.useMutation();

  const formik = useFormik({
    initialValues: { title: "", text: "" },
    onSubmit: async (values) => {
      await createNote.mutateAsync(values);
    },
    validate: withZodSchema(zCreateNoteTrpcInput),
  });

  return (
    <div>
      <p>Create note</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Input
          name="title"
          label="Title"
          value={formik.values["title"]}
          error={formik.errors["title"]}
          touched={formik.touched["title"]}
          handleBlur={() => formik.setFieldTouched("title")}
          setValue={(e) => formik.setFieldValue("title", e.target.value)}
        />
        <Textarea
          name="text"
          label="Text"
          value={formik.values["text"]}
          error={formik.errors["text"]}
          touched={formik.touched["text"]}
          handleBlur={() => formik.setFieldTouched("text")}
          setValue={(e) => formik.setFieldValue("text", e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};
