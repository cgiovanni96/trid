type TridProfileTab = {
  value: string;
  label: string;
  icon: string;
};

export const profileTabs: Array<TridProfileTab> = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "replies", label: "Replies", icon: "/assets/members.svg" },
  { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
];
