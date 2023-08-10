"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { links, svgDimensions } from "@/constants";

export const SideLinks = () => {
  const pathName = usePathname();

  return (
    <>
      {links.map((link) => {
        const isActive =
          (pathName.includes(link.route) && link.route.length > 1) ||
          pathName === link.route;

        return (
          <Link
            href={link.route}
            key={link.label}
            className={`leftsidebar_link ${isActive && "bg-primary-500"}`}
          >
            <Image
              src={link.imgURL}
              alt={link.label}
              {...svgDimensions.default}
            />
            <span className="text-light-1 max-lg:hidden">
              {link.label}
            </span>
          </Link>
        );
      })}
    </>
  );
};
