import { verifyJwt } from "@/lib/jwt";
import { ResetPasswordForm } from "../_components/reset-password-form";

type Props = {
  params: {
    jwtUserId: string;
  };
};

const ResetPasswordPage = ({ params: { jwtUserId } }: Props) => {
  const payload = verifyJwt(jwtUserId);

  if (!payload) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-2xl">
        The URL is not valid!
      </div>
    );
  }

  return (
    <div className="flex justify-center ">
      <ResetPasswordForm jwtUserId={jwtUserId} />
    </div>
  );
};

export default ResetPasswordPage;
