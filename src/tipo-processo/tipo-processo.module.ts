import { Module } from '@nestjs/common';
import { TipoProcessoService } from './tipo-processo.service';
import { TipoProcessoController } from './tipo-processo.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [TipoProcessoController],
  providers: [TipoProcessoService, PrismaService]
})
export class TipoProcessoModule {}
