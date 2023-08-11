import { AccountProfile } from "@/components/forms";
import { User } from "@/types";

import { currentUser } from "@clerk/nextjs";

async function Page() {
  const user = await currentUser();
  console.log('user', user);

  const userInfo: Partial<User> = {};

  const userData = {
    id: user?.id,
    objectId: userInfo?.id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.name,
    bio: userInfo?.bio || user?.bio,
    image: userInfo?.image || user?.imageUrl,
  };
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Auth</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile now to use Trids
      </p>

      <section className="mt-0 bg-dark-2 p-10">
        <AccountProfile
          user={userData}
        />
      </section>
    </main>
  );
}

export default Page;
