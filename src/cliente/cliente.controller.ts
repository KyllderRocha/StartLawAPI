import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    const user = {
      ...createClienteDto,
      criadoPor: +createClienteDto.criadoPor
    }
    return this.clienteService.create(user)
    .catch(e => {
      throw new ConflictException(e.message);
    });
  }

  @Get()
  findAll() {
    return this.clienteService.findAll();
  }

  @Post('/firma/:firmaID')
  findAllFirma(@Param('firmaID') firmaID: number, @Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.findAllFirma(+firmaID, createClienteDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clienteService.findOne(+id);
  }

  @Post('/atualizar/:id')
  atualizar(@Param('id') id: number, @Body() updateClienteDto: UpdateClienteDto) {
    const user = {
      ...updateClienteDto,
      atualizadoPor: +updateClienteDto.criadoPor
    }
    return this.clienteService.update(+id, user)
    .catch(e => {
      throw new NotFoundException(e.message);
    });
  }

  @Post('/deletar/:id/:removidoPor')
  remove(@Param('id') id: number, @Param('removidoPor') removidoPor: number) {
    return this.clienteService.remove(+id, +removidoPor);
  }
  
  @Post('/deletarRevert/:id')
  deletarRevert(@Param('id') id: number) {
    return this.clienteService.deletarRevert(+id);
  }
}
