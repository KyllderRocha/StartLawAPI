import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FormularioPreenchidoService } from './formulario-preenchido.service';

@Controller('formulario-preenchido')
export class FormularioPreenchidoController {
  constructor(private readonly formularioPreenchidoService: FormularioPreenchidoService) {}

  
  @Post()
  create(@Body() createFormularioPreenchidoDto: Prisma.FormularioPreenchidoCreateInput) {
    return this.formularioPreenchidoService.create(createFormularioPreenchidoDto);
  }

  @Get()
  findAll() {
    return this.formularioPreenchidoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formularioPreenchidoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormularioPreenchidoDto: Prisma.FormularioPreenchidoUpdateInput) {
    return this.formularioPreenchidoService.update(+id, updateFormularioPreenchidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formularioPreenchidoService.remove(+id);
  }
}
