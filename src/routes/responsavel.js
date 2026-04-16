import { prisma } from "../conectaDB.js";
import express from "express"

const responsavel = express()
responsavel.use(express.json())

export default responsavel

