/*
  Warnings:

  - You are about to drop the `_defensas_del_reino` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_defensas_del_reino" DROP CONSTRAINT "_defensas_del_reino_A_fkey";

-- DropForeignKey
ALTER TABLE "_defensas_del_reino" DROP CONSTRAINT "_defensas_del_reino_B_fkey";

-- DropTable
DROP TABLE "_defensas_del_reino";

-- CreateTable
CREATE TABLE "defensas_del_reino" (
    "id_defensa" INTEGER NOT NULL,
    "id_reino" INTEGER NOT NULL,
    "fecha_comienzo" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "defensas_del_reino_pkey" PRIMARY KEY ("id_defensa","id_reino")
);

-- AddForeignKey
ALTER TABLE "defensas_del_reino" ADD CONSTRAINT "defensas_del_reino_id_defensa_fkey" FOREIGN KEY ("id_defensa") REFERENCES "defensas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "defensas_del_reino" ADD CONSTRAINT "defensas_del_reino_id_reino_fkey" FOREIGN KEY ("id_reino") REFERENCES "reinos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
