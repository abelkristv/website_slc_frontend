import { AssistantExperience } from "./AssistantExperience";
import { SLCPosition } from "./SLCPosition";
import { SocialMedia } from "./SocialMedia";
import { TeachingHistory } from "./TeachingHistory";

export type Assistant = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  Email: string;
  Bio: string;
  FullName: string;
  ProfilePicture: string;
  Initial: string;
  Generation: string;
  CarrerPath: string | null;
  Award: string | null;
  Status: string;
  TeachingHistories: TeachingHistory[];
  AssistantExperiences: AssistantExperience[];
  SLCPosition: SLCPosition;
  SocialMedia: SocialMedia;
};
