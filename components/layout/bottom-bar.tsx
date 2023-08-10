import { SideLinks } from "../ui";

export const BottomBar = () => {
  return (
    <section className="fixed bottom-0 z-10 w-full rounded-t-3xl bg-glassmorphism p-4 backdrop-blur-lg xs:px-7 md:hidden">
      <div className="flex items-center justify-between gap-3 xs:gap-5">
        <SideLinks />
      </div>
    </section>
  );
};
