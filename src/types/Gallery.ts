import { Assistant } from "./Assistant";

export type Gallery = {
  ID?: number;
  GalleryTitle: string;
  GalleryNotes?: string;
  GalleryStatus?: "not accepted" | "pending" | "accepted";
  GalleryImages: string[];
  Assistant?: Assistant;
  CreatedAt?: string;
  UpdatedAt?: string;
};
