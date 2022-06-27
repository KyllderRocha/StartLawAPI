import { Module } from '@nestjs/common';
import { StatusModule } from './status/status.module';
import { EnderecoModule } from './endereco/endereco.module';
import { FirmaModule } from './firma/firma.module';
import { UsuarioModule } from './usuario/usuario.module';
import { TipoProcessoModule } from './tipo-processo/tipo-processo.module';
import { FormularioPadraoModule } from './formulario-padrao/formulario-padrao.module';
import { ProcessoModule } from './processo/processo.module';
import { FormularioPreenchidoModule } from './formulario-preenchido/formulario-preenchido.module';
import { ClienteModule } from './cliente/cliente.module';
import { DocumentoModule } from './documento/documento.module';
import { LancamentoProcessoModule } from './lancamento-processo/lancamento-processo.module';

@Module({
  imports: [StatusModule, EnderecoModule, FirmaModule, UsuarioModule, TipoProcessoModule, FormularioPadraoModule, ProcessoModule, FormularioPreenchidoModule, ClienteModule, DocumentoModule, LancamentoProcessoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
