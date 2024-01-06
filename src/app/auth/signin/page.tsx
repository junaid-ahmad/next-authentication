import Link from "next/link";
import { SignInForm } from "./_components/signin-form";

type Props = {
  searchParams: {
    callbackUrl?: string;
  };
};
const SignInPage = ({ searchParams }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <SignInForm callbackUrl={searchParams.callbackUrl} />
      <Link href="/auth/forgot-password">Forgot your password?</Link>
    </div>
  );
};

export default SignInPage;
