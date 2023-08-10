"use client";

import { useRouter } from "next/navigation";
import { SignOut } from "../auth/sign-out";
import { SideLinks } from "../ui";

export const LeftSideBar = () => {
  const router = useRouter();

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        <SideLinks />
      </div>

      <div className="mt-10 px-6">
        <SignOut
          withLabel
          onClick={() => {
            router.push("/sign-in");
          }}
        />
      </div>
    </section>
  );
};
