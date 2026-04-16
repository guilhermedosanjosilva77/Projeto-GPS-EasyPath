import express from "express";
import { prisma } from "./conectaDB.js";
import responsavel from "./routes/responsavel.js";
import dependente from "./routes/dependente.js";
import alertas from "./routes/alertas.js";

const app = express()

app.use('/responsaveis', responsavel);
app.use('/dependentes', dependente);
app.use('/alertas', alertas);

app.listen(3000, () => {
  console.log("🚀 Servidor rodando na porta 3000! Todas as rotas estão ativas.");
});