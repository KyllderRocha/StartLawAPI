import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ProcessoService } from './processo.service';

@Controller('processo')
export class ProcessoController {
  constructor(private readonly processoService: ProcessoService) {}

  @Post()
  create(@Body() createProcessoDto: Prisma.ProcessoCreateInput) {
    return this.processoService.create(createProcessoDto);
  }

  @Get()
  findAll() {
    return this.processoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.processoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcessoDto: Prisma.ProcessoUpdateInput) {
    return this.processoService.update(+id, updateProcessoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.processoService.remove(+id);
  }
}
