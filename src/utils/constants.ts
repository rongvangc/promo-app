import { Roles } from "./types";

export const HOST = "http://localhost:4000";

export const userList = [
  {
    value: Roles.DEFAULT,
    label: "Default",
  },
  {
    value: Roles.MICROSOFT,
    label: "Microsoft",
  },
  {
    value: Roles.AMAZON,
    label: "Amazon",
  },
  {
    value: Roles.FACEBOOK,
    label: "Facebook",
  },
];
