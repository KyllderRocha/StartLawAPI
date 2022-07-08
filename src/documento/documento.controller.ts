import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DocumentoService } from './documento.service';

@Controller('documento')
export class DocumentoController {
  constructor(private readonly documentoService: DocumentoService) {}
  
  @Post()
  create(@Body() createDocumentoDto: Prisma.DocumentoCreateInput) {
    return this.documentoService.create(createDocumentoDto);
  }

  @Get()
  findAll() {
    return this.documentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.documentoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDocumentoDto: Prisma.DocumentoUpdateInput) {
    return this.documentoService.update(+id, updateDocumentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.documentoService.remove(+id);
  }
}
