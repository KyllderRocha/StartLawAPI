import { Module } from '@nestjs/common';
import { FormularioPreenchidoService } from './formulario-preenchido.service';
import { FormularioPreenchidoController } from './formulario-preenchido.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [FormularioPreenchidoController],
  providers: [FormularioPreenchidoService, PrismaService]
})
export class FormularioPreenchidoModule {}
