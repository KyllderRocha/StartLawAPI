import { Module } from '@nestjs/common';
import { LancamentoProcessoService } from './lancamento-processo.service';
import { LancamentoProcessoController } from './lancamento-processo.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [LancamentoProcessoController],
  providers: [LancamentoProcessoService, PrismaService]
})
export class LancamentoProcessoModule {}
