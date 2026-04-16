import { prisma } from "../conectaDB.js";
import express from "express";

const alertas = express()
alertas.use(express.json)

export default alertas;