import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { LancamentoProcessoService } from './lancamento-processo.service';

@Controller('lancamento-processo')
export class LancamentoProcessoController {
  constructor(private readonly lancamentoProcessoService: LancamentoProcessoService) {}

  @Post()
  create(@Body() createlancamentoProcessoDto: Prisma.LancamentoProcessoCreateInput) {
    return this.lancamentoProcessoService.create(createlancamentoProcessoDto);
  }

  @Get()
  findAll() {
    return this.lancamentoProcessoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lancamentoProcessoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatelancamentoProcessoDto: Prisma.LancamentoProcessoUpdateInput) {
    return this.lancamentoProcessoService.update(+id, updatelancamentoProcessoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lancamentoProcessoService.remove(+id);
  }
}
