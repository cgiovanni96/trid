import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { PostThread } from "@/components/forms";
import { USER_ACTIONS } from "@/lib/actions";

export default async function Page() {
  const user = await currentUser();

  const userInfo = await USER_ACTIONS.fetchUser(user!.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text">
        <div>Create Trid</div>
      </h1>

      <PostThread userId={userInfo._id} />
    </>
  );
}
