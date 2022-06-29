/*
  Warnings:

  - Added the required column `firmaID` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "enderecoID" INTEGER NOT NULL,
    "firmaID" INTEGER NOT NULL,
    "criadoPor" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoPor" INTEGER,
    "atualizadoEm" DATETIME,
    "removidoPor" INTEGER,
    "removidoEm" DATETIME,
    CONSTRAINT "Usuario_enderecoID_fkey" FOREIGN KEY ("enderecoID") REFERENCES "Endereco" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Usuario_firmaID_fkey" FOREIGN KEY ("firmaID") REFERENCES "Firma" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Usuario" ("atualizadoEm", "atualizadoPor", "cargo", "cpf", "criadoEm", "criadoPor", "email", "enderecoID", "id", "login", "nome", "removidoEm", "removidoPor", "rg", "senha", "telefone") SELECT "atualizadoEm", "atualizadoPor", "cargo", "cpf", "criadoEm", "criadoPor", "email", "enderecoID", "id", "login", "nome", "removidoEm", "removidoPor", "rg", "senha", "telefone" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
CREATE UNIQUE INDEX "Usuario_login_key" ON "Usuario"("login");
CREATE UNIQUE INDEX "Usuario_telefone_key" ON "Usuario"("telefone");
CREATE UNIQUE INDEX "Usuario_cpf_key" ON "Usuario"("cpf");
CREATE UNIQUE INDEX "Usuario_rg_key" ON "Usuario"("rg");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
