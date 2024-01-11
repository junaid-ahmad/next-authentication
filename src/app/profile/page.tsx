import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/next-auth/auth-options";
import { Image } from "@nextui-org/react";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  return (
    <div className="flex gap-2">
      <div>
        <p>
          First Name: <span>{user?.firstName}</span>
        </p>
        <p>
          Last Name: <span>{user?.lastName}</span>
        </p>
        <p>
          Phone: <span>{user?.phone}</span>
        </p>
        <p>
          Email: <span>{user?.email}</span>
        </p>
      </div>
      <Image
        height={300}
        width={300}
        src={user?.image ?? ""}
        alt={user?.firstName ?? ""}
        className="rounded-full"
      />
    </div>
  );
};

export default ProfilePage;
