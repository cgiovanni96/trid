import { OrganizationSwitcher } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { dark } from "@clerk/themes";

import { svgDimensions } from "@/constants";
import { SignOut } from "../auth/sign-out";

export const TopBar = () => {
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="./assets/logo.svg" alt="logo" {...svgDimensions.logo} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Trid</p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignOut />
        </div>

        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
      </div>
    </nav>
  );
};
