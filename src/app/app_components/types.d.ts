
export interface Manuscript {
  act: {
    name: string;
    chapters: Chapter[];
  };
}

export interface Chapter {
  name: string;
  scenes: Scene[];
}

export interface Scene {
  scene: string;
  content: string;
  summary: string;
}

export type Mode = "Write" | "Pre-Plan" | "Plan" | "Nexus" | "Chat";