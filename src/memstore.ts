import { v4 as uuid } from "uuid";
import type { Project, Storyboard, Render } from "./types.js";

export const db = {
  projects: new Map<string, Project>(),
  storyboards: new Map<string, Storyboard>(),
  renders: new Map<string, Render>(),
  webhooks: new Map<string, { webhookId: string; url: string; events: string[]; createdAt: string; secret?: string }>(),

  newId: () => uuid(),
};

export function nowISO() { return new Date().toISOString(); }
