import SignUp from "@/components/auth/sign-up";
import AuthRedirect from "@/components/auth/auth-redirect";

const SignUpPage = async () => {
  return (
    <AuthRedirect redirectTo="/dashboard">
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12">
        <SignUp />
      </div>
    </AuthRedirect>
  );
};

export default SignUpPage;
