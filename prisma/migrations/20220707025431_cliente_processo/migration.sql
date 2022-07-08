/*
  Warnings:

  - Added the required column `clienteID` to the `Processo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Processo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "statusID" INTEGER NOT NULL,
    "prazo" DATETIME NOT NULL,
    "tipoProcessoID" INTEGER NOT NULL,
    "clienteID" INTEGER NOT NULL,
    "criadoPor" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoPor" INTEGER,
    "atualizadoEm" DATETIME,
    "removidoPor" INTEGER,
    "removidoEm" DATETIME,
    CONSTRAINT "Processo_criadoPor_fkey" FOREIGN KEY ("criadoPor") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Processo_tipoProcessoID_fkey" FOREIGN KEY ("tipoProcessoID") REFERENCES "TipoProcesso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Processo_clienteID_fkey" FOREIGN KEY ("clienteID") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Processo_statusID_fkey" FOREIGN KEY ("statusID") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Processo" ("atualizadoEm", "atualizadoPor", "criadoEm", "criadoPor", "descricao", "id", "nome", "observacao", "prazo", "removidoEm", "removidoPor", "statusID", "tipoProcessoID") SELECT "atualizadoEm", "atualizadoPor", "criadoEm", "criadoPor", "descricao", "id", "nome", "observacao", "prazo", "removidoEm", "removidoPor", "statusID", "tipoProcessoID" FROM "Processo";
DROP TABLE "Processo";
ALTER TABLE "new_Processo" RENAME TO "Processo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
