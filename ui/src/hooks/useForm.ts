import { FormikHelpers, useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { useActionState, useMemo } from "react";
import { z } from "zod";
import { TAlertProps } from "../components/Alert/Alert";
import { TButtonProps } from "../components/Button/Button";

export const useForm = <TZodSchema extends z.ZodTypeAny>({
  initialValues = {},
  successMessage = "",
  validationSchema,
  resetOnSuccess = false,
  onSubmit,
}: {
  successMessage?: string;
  resetOnSuccess?: boolean;
  initialValues?: z.infer<TZodSchema>;
  validationSchema?: TZodSchema;
  onSubmit?: (values: z.infer<TZodSchema>, actions: FormikHelpers<z.infer<TZodSchema>>) => Promise<any> | any;
}) => {
  const [{ isSuccessMessageVisible, errorMessage }, dispatch] = useActionState<
    {
      isSuccessMessageVisible: boolean;
      errorMessage: string | null;
    },
    { type: "success" | "error"; payload: any }
  >(
    (prevState, action) => {
      switch (action.type) {
        case "success": {
          return { isSuccessMessageVisible: action.payload, errorMessage: null };
        }
        case "error": {
          return { isSuccessMessageVisible: false, errorMessage: action.payload };
        }
        default: {
          return prevState;
        }
      }
    },
    { isSuccessMessageVisible: false, errorMessage: null }
  );

  const handleSuccess = (value: boolean) => dispatch({ type: "success", payload: value });
  const handleError = (message: string | null) => dispatch({ type: "error", payload: message });

  const formik = useFormik<z.infer<TZodSchema>>({
    initialValues,
    ...(validationSchema && { validate: withZodSchema(validationSchema) }),
    onSubmit: async (values, formikHelpers) => {
      if (!onSubmit) {
        return;
      }

      try {
        await onSubmit(values, formikHelpers);

        if (resetOnSuccess) {
          formik.resetForm();
        }

        handleSuccess(true);
        setTimeout(() => {
          handleSuccess(false);
        }, 3000);
      } catch (e: any) {
        handleError(e.message);
        setTimeout(() => {
          handleError(null);
        }, 3000);
      }
    },
  });

  const alertProps: TAlertProps = useMemo(() => {
    if (isSuccessMessageVisible && !!successMessage) {
      return { hidden: false, color: "success", children: successMessage };
    }

    if (errorMessage) {
      return { hidden: false, color: "error", children: errorMessage };
    }

    return { color: "success", hidden: true, children: "" };
  }, [isSuccessMessageVisible, successMessage, errorMessage]);

  const buttonProps: Omit<TButtonProps, "children"> = useMemo(
    () => ({ isLoading: formik.isSubmitting }),
    [formik.isSubmitting]
  );

  return { formik, alertProps, buttonProps };
};
