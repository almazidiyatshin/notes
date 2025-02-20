import { FormikProps } from "formik";

type TProps = {
  name: string;
  label: string;
  type?: "text" | "password";
  formik: FormikProps<any>;
};

export const Input = ({ name, label, type = "text", formik }: TProps) => {
  const error = formik.errors[name] as string | undefined;
  const touched = formik.touched[name];

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <br />
      <input
        id={name}
        type={type}
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
