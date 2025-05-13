import { type TTrpcRouterOutput } from "@notes/backend/src/router";
import { zUpdatePasswordTrpcInput } from "@notes/backend/src/router/auth/updatePassword/input";
import { zUpdateProfileTrpcInput } from "@notes/backend/src/router/auth/updateProfile/input";
import { zPasswordsMustBeTheSame, zStringRequired } from "@notes/shared/src/zod";
import { Alert } from "../../../components/Alert";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Segment } from "../../../components/Segment";
import { useForm } from "../../../hooks/useForm";
import { trpc } from "../../../lib/trpc";
import { withPageWrapper } from "../../../lib/withPageWrapper";

const General = ({ me }: { me: NonNullable<TTrpcRouterOutput["getMe"]["me"]> }) => {
  const trpcUtils = trpc.useUtils();
  const updateProfile = trpc.updateProfile.useMutation();
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      login: me.login,
      name: me.name,
      email: me.email,
    },
    validationSchema: zUpdateProfileTrpcInput,
    onSubmit: async (values) => {
      const updatedMe = await updateProfile.mutateAsync(values);
      trpcUtils.getMe.setData(undefined, { me: updatedMe });
    },
    successMessage: "Profile updated",
    resetOnSuccess: false,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input label="Login" name="login" formik={formik} />
      <Input label="Name" name="name" formik={formik} />
      <Input label="Email" name="email" formik={formik} />
      <Alert {...alertProps} />
      <Button {...buttonProps}>Update Profile</Button>
    </form>
  );
};

const Password = () => {
  const updatePassword = trpc.updatePassword.useMutation();
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordAgain: "",
    },
    validationSchema: zUpdatePasswordTrpcInput
      .extend({
        newPasswordAgain: zStringRequired,
      })
      .superRefine(zPasswordsMustBeTheSame("newPassword", "newPasswordAgain")),
    onSubmit: async ({ newPassword, oldPassword }) => {
      await updatePassword.mutateAsync({ newPassword, oldPassword });
    },
    successMessage: "Password updated",
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input label="Old password" name="oldPassword" type="password" formik={formik} />
      <Input label="New password" name="newPassword" type="password" formik={formik} />
      <Input label="New password again" name="newPasswordAgain" type="password" formik={formik} />
      <Alert {...alertProps} />
      <Button {...buttonProps}>Update password</Button>
    </form>
  );
};

export const UpdateProfilePage = withPageWrapper({
  authorizedOnly: true,
  setProps: ({ getAuthorizedMe }) => ({
    me: getAuthorizedMe(),
  }),
  title: "Update profile",
})(({ me }) => {
  return (
    <Segment title="Update profile" size={1}>
      <Segment title="General" size={2}>
        <General me={me} />
      </Segment>
      <Segment title="Password" size={2}>
        <Password />
      </Segment>
    </Segment>
  );
});
