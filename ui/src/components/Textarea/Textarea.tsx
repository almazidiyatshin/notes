import { FormikProps } from "formik";

type TProps = {
  name: string;
  label: string;
  formik: FormikProps<any>;
};

export const Textarea = ({ name, label, formik }: TProps) => {
  const error = formik.errors[name] as string | undefined;
  const touched = formik.touched[name];

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <br />
      <textarea
        id={name}
        name={name}
        value={formik.values[name]}
        disabled={formik.isSubmitting}
        onBlur={() => formik.setFieldTouched(name)}
        onChange={(e) => formik.setFieldValue(name, e.target.value)}
      />
      {error && touched && <p>{error}</p>}
    </div>
  );
};
