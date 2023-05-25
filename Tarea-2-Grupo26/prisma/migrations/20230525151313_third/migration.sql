/*
  Warnings:

  - You are about to drop the column `velocidad_maximo` on the `karts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "karts" DROP COLUMN "velocidad_maximo",
ADD COLUMN     "velocidad_maxima" INTEGER;
