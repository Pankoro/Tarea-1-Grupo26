-- CreateTable
CREATE TABLE "personajes" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(45) NOT NULL,
    "fuerza" INTEGER NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "objeto" VARCHAR(30) NOT NULL,

    CONSTRAINT "personajes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personaje_tiene_trabajo" (
    "id_trabajo" INTEGER NOT NULL,
    "id_personaje" INTEGER NOT NULL,
    "fecha_inicio" TIMESTAMP(3),
    "fecha_termino" TIMESTAMP(3),

    CONSTRAINT "personaje_tiene_trabajo_pkey" PRIMARY KEY ("id_trabajo","id_personaje")
);

-- CreateTable
CREATE TABLE "trabajos" (
    "id" SERIAL NOT NULL,
    "descripcion" VARCHAR(45) NOT NULL,
    "sueldo" INTEGER NOT NULL,

    CONSTRAINT "trabajos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "karts" (
    "id" SERIAL NOT NULL,
    "modelo" VARCHAR(45) NOT NULL,
    "color" VARCHAR(45) NOT NULL,
    "velocidad_maximo" INTEGER,
    "kartId" INTEGER NOT NULL,

    CONSTRAINT "karts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reinos" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(45) NOT NULL,
    "ubicacion" VARCHAR(45) NOT NULL,
    "superficie" INTEGER NOT NULL,

    CONSTRAINT "reinos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diplomacias" (
    "id_reino_1" INTEGER NOT NULL,
    "id_reino_2" INTEGER NOT NULL,
    "es_aliado" BOOLEAN NOT NULL,

    CONSTRAINT "diplomacias_pkey" PRIMARY KEY ("id_reino_1","id_reino_2")
);

-- AddForeignKey
ALTER TABLE "personaje_tiene_trabajo" ADD CONSTRAINT "personaje_tiene_trabajo_id_personaje_fkey" FOREIGN KEY ("id_personaje") REFERENCES "personajes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personaje_tiene_trabajo" ADD CONSTRAINT "personaje_tiene_trabajo_id_trabajo_fkey" FOREIGN KEY ("id_trabajo") REFERENCES "trabajos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "karts" ADD CONSTRAINT "karts_kartId_fkey" FOREIGN KEY ("kartId") REFERENCES "personajes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diplomacias" ADD CONSTRAINT "diplomacias_id_reino_1_fkey" FOREIGN KEY ("id_reino_1") REFERENCES "reinos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diplomacias" ADD CONSTRAINT "diplomacias_id_reino_2_fkey" FOREIGN KEY ("id_reino_2") REFERENCES "reinos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
