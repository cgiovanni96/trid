import Image from "next/image";
import { SignedIn, SignOutButton } from "@clerk/nextjs";

import { svgDimensions } from "@/lib/constants";

type Props = {
  withLabel?: boolean;
  onClick?: () => void;
};

export const SignOut = ({ withLabel, onClick }: Props) => {
  return (
    <SignedIn>
      <SignOutButton signOutCallback={onClick && onClick}>
        <div className={`flex cursor-pointer ${withLabel && "gap-4 p-4"}`}>
          <Image
            src="/assets/logout.svg"
            alt="logout"
            {...svgDimensions.default}
          />
          {withLabel && <p className="text-light-2 max-lg:hidden">Logout</p>}
        </div>
      </SignOutButton>
    </SignedIn>
  );
};
