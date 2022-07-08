/*
  Warnings:

  - You are about to drop the `Endereco` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `enderecoID` on the `Firma` table. All the data in the column will be lost.
  - You are about to drop the column `enderecoID` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `enderecoID` on the `Cliente` table. All the data in the column will be lost.
  - Added the required column `bairro` to the `Firma` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `Firma` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `Firma` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Firma` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `Firma` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rua` to the `Firma` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bairro` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rua` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bairro` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rua` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Endereco";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Firma" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME,
    "removidoEm" DATETIME
);
INSERT INTO "new_Firma" ("atualizadoEm", "criadoEm", "email", "id", "nome", "removidoEm", "telefone") SELECT "atualizadoEm", "criadoEm", "email", "id", "nome", "removidoEm", "telefone" FROM "Firma";
DROP TABLE "Firma";
ALTER TABLE "new_Firma" RENAME TO "Firma";
CREATE UNIQUE INDEX "Firma_email_key" ON "Firma"("email");
CREATE UNIQUE INDEX "Firma_telefone_key" ON "Firma"("telefone");
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
    "rua" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "firmaID" INTEGER NOT NULL,
    "criadoPor" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoPor" INTEGER,
    "atualizadoEm" DATETIME,
    "removidoPor" INTEGER,
    "removidoEm" DATETIME,
    CONSTRAINT "Usuario_firmaID_fkey" FOREIGN KEY ("firmaID") REFERENCES "Firma" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Usuario" ("atualizadoEm", "atualizadoPor", "cargo", "cpf", "criadoEm", "criadoPor", "email", "firmaID", "id", "login", "nome", "removidoEm", "removidoPor", "rg", "senha", "telefone") SELECT "atualizadoEm", "atualizadoPor", "cargo", "cpf", "criadoEm", "criadoPor", "email", "firmaID", "id", "login", "nome", "removidoEm", "removidoPor", "rg", "senha", "telefone" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
CREATE UNIQUE INDEX "Usuario_login_key" ON "Usuario"("login");
CREATE UNIQUE INDEX "Usuario_telefone_key" ON "Usuario"("telefone");
CREATE UNIQUE INDEX "Usuario_cpf_key" ON "Usuario"("cpf");
CREATE UNIQUE INDEX "Usuario_rg_key" ON "Usuario"("rg");
CREATE TABLE "new_Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "criadoPor" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoPor" INTEGER,
    "atualizadoEm" DATETIME,
    "removidoPor" INTEGER,
    "removidoEm" DATETIME
);
INSERT INTO "new_Cliente" ("atualizadoEm", "atualizadoPor", "cnpj", "cpf", "criadoEm", "criadoPor", "email", "id", "nome", "removidoEm", "removidoPor", "rg", "telefone") SELECT "atualizadoEm", "atualizadoPor", "cnpj", "cpf", "criadoEm", "criadoPor", "email", "id", "nome", "removidoEm", "removidoPor", "rg", "telefone" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");
CREATE UNIQUE INDEX "Cliente_telefone_key" ON "Cliente"("telefone");
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");
CREATE UNIQUE INDEX "Cliente_rg_key" ON "Cliente"("rg");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
