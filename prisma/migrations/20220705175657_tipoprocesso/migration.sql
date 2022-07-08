/*
  Warnings:

  - Added the required column `descricao` to the `TipoProcesso` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TipoProcesso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "criadoPor" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoPor" INTEGER,
    "atualizadoEm" DATETIME,
    "removidoPor" INTEGER,
    "removidoEm" DATETIME,
    CONSTRAINT "TipoProcesso_criadoPor_fkey" FOREIGN KEY ("criadoPor") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TipoProcesso" ("atualizadoEm", "atualizadoPor", "criadoEm", "criadoPor", "id", "nome", "removidoEm", "removidoPor") SELECT "atualizadoEm", "atualizadoPor", "criadoEm", "criadoPor", "id", "nome", "removidoEm", "removidoPor" FROM "TipoProcesso";
DROP TABLE "TipoProcesso";
ALTER TABLE "new_TipoProcesso" RENAME TO "TipoProcesso";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
