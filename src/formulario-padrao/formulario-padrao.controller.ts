import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FormularioPadraoService } from './formulario-padrao.service';

@Controller('formulario-padrao')
export class FormularioPadraoController {
  constructor(private readonly formularioPadraoService: FormularioPadraoService) {}

  @Post()
  create(@Body() createFormularioPadraoDto: Prisma.FormularioPadraoCreateInput) {
    return this.formularioPadraoService.create(createFormularioPadraoDto);
  }

  @Get()
  findAll() {
    return this.formularioPadraoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formularioPadraoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormularioPadraoDto: Prisma.FormularioPadraoUpdateInput) {
    return this.formularioPadraoService.update(+id, updateFormularioPadraoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formularioPadraoService.remove(+id);
  }
}
