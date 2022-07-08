import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateTipoProcessoDto } from './dto/create-tipo-processo.dto';
import { UpdateTipoProcessoDto } from './dto/update-tipo-processo.dto';
import { TipoProcessoService } from './tipo-processo.service';

@Controller('tipo-processo')
export class TipoProcessoController {
  constructor(private readonly tipoProcessoService: TipoProcessoService) {}

  @Post()
  create(@Body() createTipoProcessoDto: CreateTipoProcessoDto) {
    const user = {
      ...createTipoProcessoDto,
      criadoPor: +createTipoProcessoDto.criadoPor
    }
    return this.tipoProcessoService.create(user)
    .catch(e => {
      throw new ConflictException(e.message);
    });
  }

  @Get()
  findAll() {
    return this.tipoProcessoService.findAll();
  }

  @Post('/firma/:firmaID')
  findAllFirma(@Param('firmaID') firmaID: number, @Body() createTipoProcessoDto: CreateTipoProcessoDto) {
    return this.tipoProcessoService.findAllFirma(+firmaID, createTipoProcessoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tipoProcessoService.findOne(+id);
  }

  @Post('/atualizar/:id')
  atualizar(@Param('id') id: number, @Body() updateTipoProcessoDto: UpdateTipoProcessoDto) {
    const user = {
      ...updateTipoProcessoDto,
      atualizadoPor: +updateTipoProcessoDto.criadoPor
    }
    return this.tipoProcessoService.update(+id, user)
    .catch(e => {
      throw new NotFoundException(e.message);
    });
  }

  @Post('/deletar/:id/:removidoPor')
  remove(@Param('id') id: number, @Param('removidoPor') removidoPor: number) {
    return this.tipoProcessoService.remove(+id, +removidoPor);
  }
  
  @Post('/deletarRevert/:id')
  deletarRevert(@Param('id') id: number) {
    return this.tipoProcessoService.deletarRevert(+id);
  }
}
