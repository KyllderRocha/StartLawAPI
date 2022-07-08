/*
  Warnings:

  - The primary key for the `Documento` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Status` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Firma` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `FormularioPadrao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Cliente` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `FormularioPreenchido` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `LancamentoProcesso` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TipoProcesso` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Processo` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Documento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "formato" TEXT NOT NULL,
    "clienteID" TEXT NOT NULL,
    "criadoPor" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoPor" TEXT,
    "atualizadoEm" DATETIME,
    "removidoPor" TEXT,
    "removidoEm" DATETIME,
    CONSTRAINT "Documento_clienteID_fkey" FOREIGN KEY ("clienteID") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Documento" ("atualizadoEm", "atualizadoPor", "clienteID", "criadoEm", "criadoPor", "formato", "id", "nome", "removidoEm", "removidoPor", "url") SELECT "atualizadoEm", "atualizadoPor", "clienteID", "criadoEm", "criadoPor", "formato", "id", "nome", "removidoEm", "removidoPor", "url" FROM "Documento";
DROP TABLE "Documento";
ALTER TABLE "new_Documento" RENAME TO "Documento";
CREATE TABLE "new_Status" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "criadoPor" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoPor" TEXT,
    "atualizadoEm" DATETIME,
    "removidoPor" TEXT,
    "removidoEm" DATETIME
);
INSERT INTO "new_Status" ("atualizadoEm", "atualizadoPor", "criadoEm", "criadoPor", "id", "nome", "removidoEm", "removidoPor") SELECT "atualizadoEm", "atualizadoPor", "criadoEm", "criadoPor", "id", "nome", "removidoEm", "removidoPor" FROM "Status";
DROP TABLE "Status";
ALTER TABLE "new_Status" RENAME TO "Status";
CREATE TABLE "new_Firma" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
INSERT INTO "new_Firma" ("atualizadoEm", "bairro", "cep", "cidade", "criadoEm", "email", "estado", "id", "nome", "numero", "removidoEm", "rua", "telefone") SELECT "atualizadoEm", "bairro", "cep", "cidade", "criadoEm", "email", "estado", "id", "nome", "numero", "removidoEm", "rua", "telefone" FROM "Firma";
DROP TABLE "Firma";
ALTER TABLE "new_Firma" RENAME TO "Firma";
CREATE UNIQUE INDEX "Firma_email_key" ON "Firma"("email");
CREATE UNIQUE INDEX "Firma_telefone_key" ON "Firma"("telefone");
CREATE TABLE "new_Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
    "firmaID" TEXT NOT NULL,
    "criadoPor" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoPor" TEXT,
    "atualizadoEm" DATETIME,
    "removidoPor" TEXT,
    "removidoEm" DATETIME,
    CONSTRAINT "Usuario_firmaID_fkey" FOREIGN KEY ("firmaID") REFERENCES "Firma" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Usuario" ("atualizadoEm", "atualizadoPor", "bairro", "cargo", "cep", "cidade", "cpf", "criadoEm", "criadoPor", "email", "estado", "firmaID", "id", "login", "nome", "numero", "removidoEm", "removidoPor", "rg", "rua", "senha", "telefone") SELECT "atualizadoEm", "atualizadoPor", "bairro", "cargo", "cep", "cidade", "cpf", "criadoEm", "criadoPor", "email", "estado", "firmaID", "id", "login", "nome", "numero", "removidoEm", "removidoPor", "rg", "rua", "senha", "telefone" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
CREATE UNIQUE INDEX "Usuario_login_key" ON "Usuario"("login");
CREATE UNIQUE INDEX "Usuario_telefone_key" ON "Usuario"("telefone");
CREATE UNIQUE INDEX "Usuario_cpf_key" ON "Usuario"("cpf");
CREATE UNIQUE INDEX "Usuario_rg_key" ON "Usuario"("rg");
CREATE TABLE "new_FormularioPadrao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "formato" TEXT NOT NULL,
    "tipoProcessoID" TEXT NOT NULL,
    "criadoPor" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoPor" TEXT,
    "atualizadoEm" DATETIME,
    "removidoPor" TEXT,
    "removidoEm" DATETIME,
    CONSTRAINT "FormularioPadrao_tipoProcessoID_fkey" FOREIGN KEY ("tipoProcessoID") REFERENCES "TipoProcesso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FormularioPadrao" ("atualizadoEm", "atualizadoPor", "criadoEm", "criadoPor", "formato", "id", "nome", "removidoEm", "removidoPor", "tipoProcessoID", "url") SELECT "atualizadoEm", "atualizadoPor", "criadoEm", "criadoPor", "formato", "id", "nome", "removidoEm", "removidoPor", "tipoProcessoID", "url" FROM "FormularioPadrao";
DROP TABLE "FormularioPadrao";
ALTER TABLE "new_FormularioPadrao" RENAME TO "FormularioPadrao";
CREATE TABLE "new_Cliente" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
    "criadoPor" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoPor" TEXT,
    "atualizadoEm" DATETIME,
    "removidoPor" TEXT,
    "removidoEm" DATETIME
);
INSERT INTO "new_Cliente" ("atualizadoEm", "atualizadoPor", "bairro", "cep", "cidade", "cnpj", "cpf", "criadoEm", "criadoPor", "email", "estado", "id", "nome", "numero", "removidoEm", "removidoPor", "rg", "rua", "telefone") SELECT "atualizadoEm", "atualizadoPor", "bairro", "cep", "cidade", "cnpj", "cpf", "criadoEm", "criadoPor", "email", "estado", "id", "nome", "numero", "removidoEm", "removidoPor", "rg", "rua", "telefone" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");
CREATE UNIQUE INDEX "Cliente_telefone_key" ON "Cliente"("telefone");
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");
CREATE UNIQUE INDEX "Cliente_rg_key" ON "Cliente"("rg");
CREATE TABLE "new_FormularioPreenchido" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "formato" TEXT NOT NULL,
    "processoID" TEXT NOT NULL,
    "criadoPor" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoPor" TEXT,
    "atualizadoEm" DATETIME,
    "removidoPor" TEXT,
    "removidoEm" DATETIME,
    CONSTRAINT "FormularioPreenchido_processoID_fkey" FOREIGN KEY ("processoID") REFERENCES "Processo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FormularioPreenchido" ("atualizadoEm", "atualizadoPor", "criadoEm", "criadoPor", "formato", "id", "nome", "processoID", "removidoEm", "removidoPor", "url") SELECT "atualizadoEm", "atualizadoPor", "criadoEm", "criadoPor", "formato", "id", "nome", "processoID", "removidoEm", "removidoPor", "url" FROM "FormularioPreenchido";
DROP TABLE "FormularioPreenchido";
ALTER TABLE "new_FormularioPreenchido" RENAME TO "FormularioPreenchido";
CREATE TABLE "new_LancamentoProcesso" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "statusID" TEXT NOT NULL,
    "prazo" DATETIME NOT NULL,
    "processoID" TEXT NOT NULL,
    "criadoPor" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoPor" TEXT,
    "atualizadoEm" DATETIME,
    "removidoPor" TEXT,
    "removidoEm" DATETIME,
    CONSTRAINT "LancamentoProcesso_processoID_fkey" FOREIGN KEY ("processoID") REFERENCES "Processo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LancamentoProcesso_statusID_fkey" FOREIGN KEY ("statusID") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LancamentoProcesso" ("atualizadoEm", "atualizadoPor", "criadoEm", "criadoPor", "descricao", "id", "nome", "prazo", "processoID", "removidoEm", "removidoPor", "statusID") SELECT "atualizadoEm", "atualizadoPor", "criadoEm", "criadoPor", "descricao", "id", "nome", "prazo", "processoID", "removidoEm", "removidoPor", "statusID" FROM "LancamentoProcesso";
DROP TABLE "LancamentoProcesso";
ALTER TABLE "new_LancamentoProcesso" RENAME TO "LancamentoProcesso";
CREATE TABLE "new_TipoProcesso" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "criadoPor" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoPor" TEXT,
    "atualizadoEm" DATETIME,
    "removidoPor" TEXT,
    "removidoEm" DATETIME
);
INSERT INTO "new_TipoProcesso" ("atualizadoEm", "atualizadoPor", "criadoEm", "criadoPor", "id", "nome", "removidoEm", "removidoPor") SELECT "atualizadoEm", "atualizadoPor", "criadoEm", "criadoPor", "id", "nome", "removidoEm", "removidoPor" FROM "TipoProcesso";
DROP TABLE "TipoProcesso";
ALTER TABLE "new_TipoProcesso" RENAME TO "TipoProcesso";
CREATE TABLE "new_Processo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "statusID" TEXT NOT NULL,
    "prazo" DATETIME NOT NULL,
    "tipoProcessoID" TEXT NOT NULL,
    "criadoPor" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoPor" TEXT,
    "atualizadoEm" DATETIME,
    "removidoPor" TEXT,
    "removidoEm" DATETIME,
    CONSTRAINT "Processo_tipoProcessoID_fkey" FOREIGN KEY ("tipoProcessoID") REFERENCES "TipoProcesso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Processo_statusID_fkey" FOREIGN KEY ("statusID") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Processo" ("atualizadoEm", "atualizadoPor", "criadoEm", "criadoPor", "descricao", "id", "nome", "observacao", "prazo", "removidoEm", "removidoPor", "statusID", "tipoProcessoID") SELECT "atualizadoEm", "atualizadoPor", "criadoEm", "criadoPor", "descricao", "id", "nome", "observacao", "prazo", "removidoEm", "removidoPor", "statusID", "tipoProcessoID" FROM "Processo";
DROP TABLE "Processo";
ALTER TABLE "new_Processo" RENAME TO "Processo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
