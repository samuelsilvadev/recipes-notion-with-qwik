import { Client } from "@notionhq/client";

export const notionClient = new Client({
  auth: import.meta.env.VITE_NOTION_TOKEN,
});
