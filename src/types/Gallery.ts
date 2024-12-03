import { Assistant } from "./Assistant";

export type Gallery = {
  ID?: number;
  GalleryTitle: string;
  GalleryStatus?: "rejected" | "pending" | "accepted";
  GalleryImages: string[];
  Assistant?: Assistant;
  CreatedAt?: string;
  UpdatedAt?: string;
};
