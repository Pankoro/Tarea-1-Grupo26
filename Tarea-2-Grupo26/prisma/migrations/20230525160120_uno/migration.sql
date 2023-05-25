-- DropForeignKey
ALTER TABLE "karts" DROP CONSTRAINT "karts_kartId_fkey";

-- AlterTable
ALTER TABLE "karts" ALTER COLUMN "kartId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "karts" ADD CONSTRAINT "karts_kartId_fkey" FOREIGN KEY ("kartId") REFERENCES "personajes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
