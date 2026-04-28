import "dotenv/config";
import { defineConfig } from "@prisma/config"; 

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: "postgresql://postgres:aluno@localhost:5432/projeto?schema=public"
  },
});