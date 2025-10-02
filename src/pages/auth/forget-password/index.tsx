import AuthLayout from "@/components/layouts/AuthLayout";
import ForgotPassword from "@/components/views/Auth/RequestResetPassword";

const RequestPasswordPage = () => {
  return (
    <AuthLayout title="Forget Password | Tiket">
      <ForgotPassword />
    </AuthLayout>
  );
};
export default RequestPasswordPage;
