import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ConflictException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateProcessoDto } from './dto/create-processo.dto';
import { UpdateProcessoDto } from './dto/update-processo.dto';
import { ProcessoService } from './processo.service';

@Controller('processo')
export class ProcessoController {
  constructor(private readonly processoService: ProcessoService) {}
  
  @Post()
  create(@Body() createProcessoDto: CreateProcessoDto) {
    const user = {
      ...createProcessoDto,
      criadoPor: +createProcessoDto.criadoPor,
      statusID: +createProcessoDto.statusID,
      clienteID: +createProcessoDto.clienteID,
      tipoProcessoID: +createProcessoDto.tipoProcessoID
    }
    return this.processoService.create(user)
    .catch(e => {
      console.log(e)
      throw new ConflictException(e.message);
    });
  }

  @Get()
  findAll() {
    return this.processoService.findAll();
  }

  @Post('/firma/:firmaID')
  findAllFirma(@Param('firmaID') firmaID: number, @Body() createProcessoDto: CreateProcessoDto) {
    return this.processoService.findAllFirma(+firmaID, createProcessoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.processoService.findOne(+id);
  }

  @Post('/atualizar/:id')
  atualizar(@Param('id') id: number, @Body() updateProcessoDto: UpdateProcessoDto) {
    const user = {
      ...updateProcessoDto,
      atualizadoPor: +updateProcessoDto.criadoPor,
      statusID: +updateProcessoDto.statusID,
      clienteID: +updateProcessoDto.clienteID,
      tipoProcessoID: +updateProcessoDto.tipoProcessoID
    }
    return this.processoService.update(+id, user)
    .catch(e => {
      throw new NotFoundException(e.message);
    });
  }

  @Post('/deletar/:id/:removidoPor')
  remove(@Param('id') id: number, @Param('removidoPor') removidoPor: number) {
    return this.processoService.remove(+id, +removidoPor);
  }
  
  @Post('/deletarRevert/:id')
  deletarRevert(@Param('id') id: number) {
    return this.processoService.deletarRevert(+id);
  }
}
