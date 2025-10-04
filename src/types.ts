export type UUID = string;

export interface Project {
  projectId: UUID;
  title: string;
  ratio?: "16:9" | "9:16" | "1:1";
  style?: "clean" | "retail" | "luxury";
  voice?: "female-a" | "male-a" | "none";
  script?: string;
  assetIds?: UUID[];
  createdAt: string;
  updatedAt: string;
}

export interface Storyboard {
  storyboardId: UUID;
  projectId: UUID;
  status: "queued" | "running" | "completed" | "failed";
  scenes?: { index: number; text: string; durationSec?: number; voice?: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface Render {
  renderId: UUID;
  projectId: UUID;
  storyboardId: UUID;
  status: "queued" | "encoding" | "completed" | "failed" | "cancelled";
  percent?: number;
  downloadUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}
