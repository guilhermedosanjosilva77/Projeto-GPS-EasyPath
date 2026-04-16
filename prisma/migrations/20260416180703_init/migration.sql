-- CreateTable
CREATE TABLE "Responsavel" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Responsavel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dependente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "parentesco" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3),
    "latitudeCentro" DOUBLE PRECISION,
    "longitudeCentro" DOUBLE PRECISION,
    "raioSeguranca" DOUBLE PRECISION NOT NULL DEFAULT 500,
    "responsavelID" INTEGER NOT NULL,

    CONSTRAINT "Dependente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alerta" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "latitudeAtual" DOUBLE PRECISION NOT NULL,
    "longitudeAtual" DOUBLE PRECISION NOT NULL,
    "dependenteId" INTEGER NOT NULL,

    CONSTRAINT "Alerta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Responsavel_email_key" ON "Responsavel"("email");

-- AddForeignKey
ALTER TABLE "Dependente" ADD CONSTRAINT "Dependente_responsavelID_fkey" FOREIGN KEY ("responsavelID") REFERENCES "Responsavel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alerta" ADD CONSTRAINT "Alerta_dependenteId_fkey" FOREIGN KEY ("dependenteId") REFERENCES "Dependente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
