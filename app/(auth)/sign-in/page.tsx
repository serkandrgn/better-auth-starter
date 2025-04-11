import SignIn from "@/components/auth/sign-in";
import AuthRedirect from "@/components/auth/auth-redirect";

const SignInPage = async () => {
  return (
    <AuthRedirect redirectTo="/dashboard">
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12">
        <SignIn />
      </div>
    </AuthRedirect>
  );
};

export default SignInPage;
