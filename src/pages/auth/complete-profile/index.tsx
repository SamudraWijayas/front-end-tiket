import AuthLayout from "@/components/layouts/AuthLayout";
import CompleteProfile from "@/components/views/Auth/CompleteProfile";

const LoginPage = () => {
  return (
    <AuthLayout title="Tiket | CompleteProfile">
      <CompleteProfile />
    </AuthLayout>
  );
};
export default LoginPage;
