import { activateUser } from "@/actions/auth-actions";

type Props = {
  params: {
    jwtUserId: string;
  };
};

const ActovationPage = async ({ params: { jwtUserId } }: Props) => {
  const result = await activateUser(jwtUserId);

  let display: JSX.Element = <p>Oops! Something went wrong.</p>;

  switch (result) {
    case "userNotExist":
      display = <p>User does not exist</p>;
      break;

    case "alreadyActivated":
      display = (
        <p className="text-red-500 text-2xl">The user is already activated</p>
      );
      break;

    case "success":
      display = (
        <p className="text-green-500 text-2xl">
          Success! The user is activated now
        </p>
      );

    default:
      <p>Oops! Something went wrong.</p>;
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      {display}
    </div>
  );
};

export default ActovationPage;
