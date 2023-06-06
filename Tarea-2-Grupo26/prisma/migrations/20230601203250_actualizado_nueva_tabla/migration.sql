-- CreateTable
CREATE TABLE "personaje_habita_reino" (
    "id_personaje" INTEGER NOT NULL,
    "id_reino" INTEGER NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL,
    "es_gobernante" BOOLEAN NOT NULL,

    CONSTRAINT "personaje_habita_reino_pkey" PRIMARY KEY ("id_personaje","id_reino")
);

-- AddForeignKey
ALTER TABLE "personaje_habita_reino" ADD CONSTRAINT "personaje_habita_reino_id_personaje_fkey" FOREIGN KEY ("id_personaje") REFERENCES "personajes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personaje_habita_reino" ADD CONSTRAINT "personaje_habita_reino_id_reino_fkey" FOREIGN KEY ("id_reino") REFERENCES "reinos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
