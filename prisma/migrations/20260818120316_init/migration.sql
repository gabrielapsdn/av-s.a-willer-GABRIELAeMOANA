-- CreateTable
CREATE TABLE "Equipe" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL,

    CONSTRAINT "Equipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Desenvolvedor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "nivel" TEXT NOT NULL,
    "equipeId" INTEGER NOT NULL,

    CONSTRAINT "Desenvolvedor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Desenvolvedor" ADD CONSTRAINT "Desenvolvedor_equipeId_fkey" FOREIGN KEY ("equipeId") REFERENCES "Equipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
