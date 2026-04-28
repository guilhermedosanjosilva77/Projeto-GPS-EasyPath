import { PrismaClient } from "../generated/prisma/index.js";
import PG from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString= "postgresql://postgres:aluno@localhost:5432/projeto?schema=public";
const pool = new PG.Pool({connectionString})
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({adapter})