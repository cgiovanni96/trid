export type TridCommunityTab = {
  value: string;
  label: string;
  icon: string;
};

export const communityTabs: Array<TridCommunityTab> = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "members", label: "Members", icon: "/assets/members.svg" },
  { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];
