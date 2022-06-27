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
    "criadoPor" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoPor" INTEGER,
    "atualizadoEm" DATETIME,
    "removidoPor" INTEGER,
    "removidoEm" DATETIME,
    CONSTRAINT "Usuario_enderecoID_fkey" FOREIGN KEY ("enderecoID") REFERENCES "Endereco" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Usuario" ("atualizadoEm", "atualizadoPor", "cargo", "cpf", "criadoEm", "criadoPor", "email", "enderecoID", "id", "login", "nome", "removidoEm", "removidoPor", "rg", "senha", "telefone") SELECT "atualizadoEm", "atualizadoPor", "cargo", "cpf", "criadoEm", "criadoPor", "email", "enderecoID", "id", "login", "nome", "removidoEm", "removidoPor", "rg", "senha", "telefone" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
CREATE UNIQUE INDEX "Usuario_login_key" ON "Usuario"("login");
CREATE UNIQUE INDEX "Usuario_telefone_key" ON "Usuario"("telefone");
CREATE UNIQUE INDEX "Usuario_cpf_key" ON "Usuario"("cpf");
CREATE UNIQUE INDEX "Usuario_rg_key" ON "Usuario"("rg");
CREATE UNIQUE INDEX "Usuario_enderecoID_key" ON "Usuario"("enderecoID");
CREATE TABLE "new_TipoProcesso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "criadoPor" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoPor" INTEGER,
    "atualizadoEm" DATETIME,
    "removidoPor" INTEGER,
    "removidoEm" DATETIME
);
INSERT INTO "new_TipoProcesso" ("atualizadoEm", "atualizadoPor", "criadoEm", "criadoPor", "id", "nome", "removidoEm", "removidoPor") SELECT "atualizadoEm", "atualizadoPor", "criadoEm", "criadoPor", "id", "nome", "removidoEm", "removidoPor" FROM "TipoProcesso";
DROP TABLE "TipoProcesso";
ALTER TABLE "new_TipoProcesso" RENAME TO "TipoProcesso";
CREATE TABLE "new_Status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "criadoPor" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoPor" INTEGER,
    "atualizadoEm" DATETIME,
    "removidoPor" INTEGER,
    "removidoEm" DATETIME
);
INSERT INTO "new_Status" ("atualizadoEm", "atualizadoPor", "criadoEm", "criadoPor", "id", "nome", "removidoEm", "removidoPor") SELECT "atualizadoEm", "atualizadoPor", "criadoEm", "criadoPor", "id", "nome", "removidoEm", "removidoPor" FROM "Status";
DROP TABLE "Status";
ALTER TABLE "new_Status" RENAME TO "Status";
CREATE TABLE "new_Processo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "statusID" INTEGER NOT NULL,
    "prazo" DATETIME NOT NULL,
    "tipoProcessoID" INTEGER NOT NULL,
    "criadoPor" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoPor" INTEGER,
    "atualizadoEm" DATETIME,
    "removidoPor" INTEGER,
    "removidoEm" DATETIME,
    CONSTRAINT "Processo_tipoProcessoID_fkey" FOREIGN KEY ("tipoProcessoID") REFERENCES "TipoProcesso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Processo_statusID_fkey" FOREIGN KEY ("statusID") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Processo" ("atualizadoEm", "atualizadoPor", "criadoEm", "criadoPor", "descricao", "id", "nome", "observacao", "prazo", "removidoEm", "removidoPor", "statusID", "tipoProcessoID") SELECT "atualizadoEm", "atualizadoPor", "criadoEm", "criadoPor", "descricao", "id", "nome", "observacao", "prazo", "removidoEm", "removidoPor", "statusID", "tipoProcessoID" FROM "Processo";
DROP TABLE "Processo";
ALTER TABLE "new_Processo" RENAME TO "Processo";
CREATE TABLE "new_FormularioPreenchido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "formato" TEXT NOT NULL,
    "processoID" INTEGER NOT NULL,
    "criadoPor" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoPor" INTEGER,
    "atualizadoEm" DATETIME,
    "removidoPor" INTEGER,
    "removidoEm" DATETIME,
    CONSTRAINT "FormularioPreenchido_processoID_fkey" FOREIGN KEY ("processoID") REFERENCES "Processo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FormularioPreenchido" ("atualizadoEm", "atualizadoPor", "criadoEm", "criadoPor", "formato", "id", "nome", "processoID", "removidoEm", "removidoPor", "url") SELECT "atualizadoEm", "atualizadoPor", "criadoEm", "criadoPor", "formato", "id", "nome", "processoID", "removidoEm", "removidoPor", "url" FROM "FormularioPreenchido";
DROP TABLE "FormularioPreenchido";
ALTER TABLE "new_FormularioPreenchido" RENAME TO "FormularioPreenchido";
CREATE TABLE "new_Documento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "formato" TEXT NOT NULL,
    "clienteID" INTEGER NOT NULL,
    "criadoPor" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoPor" INTEGER,
    "atualizadoEm" DATETIME,
    "removidoPor" INTEGER,
    "removidoEm" DATETIME,
    CONSTRAINT "Documento_clienteID_fkey" FOREIGN KEY ("clienteID") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Documento" ("atualizadoEm", "atualizadoPor", "clienteID", "criadoEm", "criadoPor", "formato", "id", "nome", "removidoEm", "removidoPor", "url") SELECT "atualizadoEm", "atualizadoPor", "clienteID", "criadoEm", "criadoPor", "formato", "id", "nome", "removidoEm", "removidoPor", "url" FROM "Documento";
DROP TABLE "Documento";
ALTER TABLE "new_Documento" RENAME TO "Documento";
CREATE TABLE "new_LancamentoProcesso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "statusID" INTEGER NOT NULL,
    "prazo" DATETIME NOT NULL,
    "processoID" INTEGER NOT NULL,
    "criadoPor" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoPor" INTEGER,
    "atualizadoEm" DATETIME,
    "removidoPor" INTEGER,
    "removidoEm" DATETIME,
    CONSTRAINT "LancamentoProcesso_processoID_fkey" FOREIGN KEY ("processoID") REFERENCES "Processo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LancamentoProcesso_statusID_fkey" FOREIGN KEY ("statusID") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LancamentoProcesso" ("atualizadoEm", "atualizadoPor", "criadoEm", "criadoPor", "descricao", "id", "nome", "prazo", "processoID", "removidoEm", "removidoPor", "statusID") SELECT "atualizadoEm", "atualizadoPor", "criadoEm", "criadoPor", "descricao", "id", "nome", "prazo", "processoID", "removidoEm", "removidoPor", "statusID" FROM "LancamentoProcesso";
DROP TABLE "LancamentoProcesso";
ALTER TABLE "new_LancamentoProcesso" RENAME TO "LancamentoProcesso";
CREATE TABLE "new_Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "enderecoID" INTEGER NOT NULL,
    "criadoPor" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoPor" INTEGER,
    "atualizadoEm" DATETIME,
    "removidoPor" INTEGER,
    "removidoEm" DATETIME,
    CONSTRAINT "Cliente_enderecoID_fkey" FOREIGN KEY ("enderecoID") REFERENCES "Endereco" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Cliente" ("atualizadoEm", "atualizadoPor", "cnpj", "cpf", "criadoEm", "criadoPor", "email", "enderecoID", "id", "nome", "removidoEm", "removidoPor", "rg", "telefone") SELECT "atualizadoEm", "atualizadoPor", "cnpj", "cpf", "criadoEm", "criadoPor", "email", "enderecoID", "id", "nome", "removidoEm", "removidoPor", "rg", "telefone" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");
CREATE UNIQUE INDEX "Cliente_telefone_key" ON "Cliente"("telefone");
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");
CREATE UNIQUE INDEX "Cliente_rg_key" ON "Cliente"("rg");
CREATE UNIQUE INDEX "Cliente_enderecoID_key" ON "Cliente"("enderecoID");
CREATE TABLE "new_FormularioPadrao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "formato" TEXT NOT NULL,
    "tipoProcessoID" INTEGER NOT NULL,
    "criadoPor" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoPor" INTEGER,
    "atualizadoEm" DATETIME,
    "removidoPor" INTEGER,
    "removidoEm" DATETIME,
    CONSTRAINT "FormularioPadrao_tipoProcessoID_fkey" FOREIGN KEY ("tipoProcessoID") REFERENCES "TipoProcesso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FormularioPadrao" ("atualizadoEm", "atualizadoPor", "criadoEm", "criadoPor", "formato", "id", "nome", "removidoEm", "removidoPor", "tipoProcessoID", "url") SELECT "atualizadoEm", "atualizadoPor", "criadoEm", "criadoPor", "formato", "id", "nome", "removidoEm", "removidoPor", "tipoProcessoID", "url" FROM "FormularioPadrao";
DROP TABLE "FormularioPadrao";
ALTER TABLE "new_FormularioPadrao" RENAME TO "FormularioPadrao";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
