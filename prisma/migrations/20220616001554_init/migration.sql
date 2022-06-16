-- CreateTable
CREATE TABLE "Endereco" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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

-- CreateTable
CREATE TABLE "Firma" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "enderecoID" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME,
    "removidoEm" DATETIME,
    CONSTRAINT "Firma_enderecoID_fkey" FOREIGN KEY ("enderecoID") REFERENCES "Endereco" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Usuario" (
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
    "criadoEm" DATETIME NOT NULL,
    "atualizadoPor" INTEGER,
    "atualizadoEm" DATETIME,
    "removidoPor" INTEGER,
    "removidoEm" DATETIME,
    CONSTRAINT "Usuario_enderecoID_fkey" FOREIGN KEY ("enderecoID") REFERENCES "Endereco" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TipoProcesso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "criadoPor" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL,
    "atualizadoPor" INTEGER,
    "atualizadoEm" DATETIME,
    "removidoPor" INTEGER,
    "removidoEm" DATETIME
);

-- CreateTable
CREATE TABLE "FormularioPadrao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "formato" TEXT NOT NULL,
    "tipoProcessoID" INTEGER NOT NULL,
    "criadoPor" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL,
    "atualizadoPor" INTEGER,
    "atualizadoEm" DATETIME,
    "removidoPor" INTEGER,
    "removidoEm" DATETIME,
    CONSTRAINT "FormularioPadrao_tipoProcessoID_fkey" FOREIGN KEY ("tipoProcessoID") REFERENCES "TipoProcesso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Processo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "statusID" INTEGER NOT NULL,
    "prazo" DATETIME NOT NULL,
    "tipoProcessoID" INTEGER NOT NULL,
    "criadoPor" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL,
    "atualizadoPor" INTEGER,
    "atualizadoEm" DATETIME,
    "removidoPor" INTEGER,
    "removidoEm" DATETIME,
    CONSTRAINT "Processo_tipoProcessoID_fkey" FOREIGN KEY ("tipoProcessoID") REFERENCES "TipoProcesso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Processo_statusID_fkey" FOREIGN KEY ("statusID") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FormularioPreenchido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "formato" TEXT NOT NULL,
    "processoID" INTEGER NOT NULL,
    "criadoPor" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL,
    "atualizadoPor" INTEGER,
    "atualizadoEm" DATETIME,
    "removidoPor" INTEGER,
    "removidoEm" DATETIME,
    CONSTRAINT "FormularioPreenchido_processoID_fkey" FOREIGN KEY ("processoID") REFERENCES "Processo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "enderecoID" INTEGER NOT NULL,
    "criadoPor" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL,
    "atualizadoPor" INTEGER,
    "atualizadoEm" DATETIME,
    "removidoPor" INTEGER,
    "removidoEm" DATETIME,
    CONSTRAINT "Cliente_enderecoID_fkey" FOREIGN KEY ("enderecoID") REFERENCES "Endereco" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Documento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "formato" TEXT NOT NULL,
    "clienteID" INTEGER NOT NULL,
    "criadoPor" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL,
    "atualizadoPor" INTEGER,
    "atualizadoEm" DATETIME,
    "removidoPor" INTEGER,
    "removidoEm" DATETIME,
    CONSTRAINT "Documento_clienteID_fkey" FOREIGN KEY ("clienteID") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LancamentoProcesso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "statusID" INTEGER NOT NULL,
    "prazo" DATETIME NOT NULL,
    "processoID" INTEGER NOT NULL,
    "criadoPor" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL,
    "atualizadoPor" INTEGER,
    "atualizadoEm" DATETIME,
    "removidoPor" INTEGER,
    "removidoEm" DATETIME,
    CONSTRAINT "LancamentoProcesso_processoID_fkey" FOREIGN KEY ("processoID") REFERENCES "Processo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LancamentoProcesso_statusID_fkey" FOREIGN KEY ("statusID") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Firma_email_key" ON "Firma"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Firma_telefone_key" ON "Firma"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Firma_enderecoID_key" ON "Firma"("enderecoID");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_login_key" ON "Usuario"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_telefone_key" ON "Usuario"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cpf_key" ON "Usuario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_rg_key" ON "Usuario"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_enderecoID_key" ON "Usuario"("enderecoID");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_telefone_key" ON "Cliente"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cpf_key" ON "Cliente"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_rg_key" ON "Cliente"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_enderecoID_key" ON "Cliente"("enderecoID");
