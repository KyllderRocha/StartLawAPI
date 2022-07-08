import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ConflictException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateLancamentoProcessoDto } from './dto/create-lancamento-processo.dto';
import { UpdateLancamentoProcessoDto } from './dto/update-lancamento-processo.dto';
import { LancamentoProcessoService } from './lancamento-processo.service';

@Controller('lancamento-processo')
export class LancamentoProcessoController {
  constructor(private readonly lancamentoProcessoService: LancamentoProcessoService) {}

  @Post()
  create(@Body() createLancamentoProcessoDto: CreateLancamentoProcessoDto) {
    const user = {
      ...createLancamentoProcessoDto,
      criadoPor: +createLancamentoProcessoDto.criadoPor,
      statusID: +createLancamentoProcessoDto.statusID,
      processoID: +createLancamentoProcessoDto.processoID
    }
    return this.lancamentoProcessoService.create(user)
    .catch(e => {
      console.log(e)
      throw new ConflictException(e.message);
    });
  }

  @Get()
  findAll() {
    return this.lancamentoProcessoService.findAll();
  }

  @Post('/processo/:processoID')
  findAllFirma(@Param('processoID') processoID: number, @Body() createLancamentoProcessoDto: CreateLancamentoProcessoDto) {
    return this.lancamentoProcessoService.findAllProcesso(+processoID, createLancamentoProcessoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.lancamentoProcessoService.findOne(+id);
  }

  @Post('/atualizar/:id')
  atualizar(@Param('id') id: number, @Body() updateLancamentoProcessoDto: UpdateLancamentoProcessoDto) {
    const user = {
      ...updateLancamentoProcessoDto,
      atualizadoPor: +updateLancamentoProcessoDto.criadoPor,
      statusID: +updateLancamentoProcessoDto.statusID,
      processoID: +updateLancamentoProcessoDto.processoID
    }
    return this.lancamentoProcessoService.update(+id, user)
    .catch(e => {
      throw new NotFoundException(e.message);
    });
  }

  @Post('/deletar/:id/:removidoPor')
  remove(@Param('id') id: number, @Param('removidoPor') removidoPor: number) {
    return this.lancamentoProcessoService.remove(+id, +removidoPor);
  }
  
  @Post('/deletarRevert/:id')
  deletarRevert(@Param('id') id: number) {
    return this.lancamentoProcessoService.deletarRevert(+id);
  }
}
