-- CreateTable
CREATE TABLE "defensas" (
    "id" SERIAL NOT NULL,
    "defensa" VARCHAR(45) NOT NULL,

    CONSTRAINT "defensas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_defensas_del_reino" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_defensas_del_reino_AB_unique" ON "_defensas_del_reino"("A", "B");

-- CreateIndex
CREATE INDEX "_defensas_del_reino_B_index" ON "_defensas_del_reino"("B");

-- AddForeignKey
ALTER TABLE "_defensas_del_reino" ADD CONSTRAINT "_defensas_del_reino_A_fkey" FOREIGN KEY ("A") REFERENCES "defensas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_defensas_del_reino" ADD CONSTRAINT "_defensas_del_reino_B_fkey" FOREIGN KEY ("B") REFERENCES "reinos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
