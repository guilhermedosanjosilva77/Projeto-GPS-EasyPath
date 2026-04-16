import "dotenv/config";
import { defineConfig } from "@prisma/config"; 

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: "postgresql://postgres:0912@localhost:5432/projeto?schema=public"
  },
});