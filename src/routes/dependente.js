    import { prisma } from "../conectaDB.js";
    import express from "express";

    const dependente = express()
    dependente.use(express.json)

    export default dependente;