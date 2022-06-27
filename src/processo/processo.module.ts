import { Module } from '@nestjs/common';
import { ProcessoService } from './processo.service';
import { ProcessoController } from './processo.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [ProcessoController],
  providers: [ProcessoService, PrismaService]
})
export class ProcessoModule {}
