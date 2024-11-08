import { User } from "./User";

export type UserPaginate = {
  users: User[];
  total_count: number;
  total_pages: number;
};
