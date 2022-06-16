/*
  Warnings:

  - Added the required column `criadoEm` to the `Status` table without a default value. This is not possible if the table is not empty.
  - Added the required column `criadoPor` to the `Status` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "criadoPor" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL,
    "atualizadoPor" INTEGER,
    "atualizadoEm" DATETIME,
    "removidoPor" INTEGER,
    "removidoEm" DATETIME
);
INSERT INTO "new_Status" ("id", "nome") SELECT "id", "nome" FROM "Status";
DROP TABLE "Status";
ALTER TABLE "new_Status" RENAME TO "Status";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
