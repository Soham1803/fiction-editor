
export interface Entity {
  name: string;
  type: string;
  description: string;
  aliases: string[];
  inspiration: string;
  image: string;
  mentions: string[];
}

export type EntityType = "Character" | "Location" | "Item/Object" | "Lore" | "Other";