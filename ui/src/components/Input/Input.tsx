import { FormikErrors } from "formik";

type TProps = {
  name: string;
  label: string;
  value: string;
  error?: string;
  touched?: boolean;
  handleBlur: () => Promise<FormikErrors<{ title: string; text: string }>> | Promise<void>;
  setValue: (e: any) => void;
};

export const Input = ({ name, label, value, error, touched, handleBlur, setValue }: TProps) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <br />
    <input id={name} type="text" name={name} value={value} onBlur={handleBlur} onChange={(e) => setValue(e)} />
    {error && touched && <p>{error}</p>}
  </div>
);
