/*
  Warnings:

  - Made the column `fecha_inicio` on table `personaje_tiene_trabajo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "personaje_tiene_trabajo" ALTER COLUMN "fecha_inicio" SET NOT NULL;
