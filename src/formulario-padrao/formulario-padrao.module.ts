import { Module } from '@nestjs/common';
import { FormularioPadraoService } from './formulario-padrao.service';
import { FormularioPadraoController } from './formulario-padrao.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [FormularioPadraoController],
  providers: [FormularioPadraoService, PrismaService]
})
export class FormularioPadraoModule {}
