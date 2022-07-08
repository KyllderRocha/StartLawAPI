import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    const user = {
      ...createUsuarioDto,
      firmaID: +createUsuarioDto.firmaID,
      criadoPor: +createUsuarioDto.criadoPor
    }
    return this.usuarioService.create(user)
    .catch(e => {
      throw new ConflictException(e.message);
    });
  }

  @Post('/login')
  login(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.login(createUsuarioDto.login, createUsuarioDto.senha);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Post('/firma/:firmaID')
  findAllFirma(@Param('firmaID') firmaID: number, @Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.findAllFirma(+firmaID, createUsuarioDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usuarioService.findOne(+id);
  }

  @Post('/atualizar/:id')
  atualizar(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    const user = {
      ...updateUsuarioDto,
      atualizadoPor: +updateUsuarioDto.criadoPor
    }
    return this.usuarioService.update(+id, user)
    .catch(e => {
      throw new NotFoundException(e.message);
    });
  }

  @Post('/deletar/:id/:removidoPor')
  remove(@Param('id') id: number, @Param('removidoPor') removidoPor: number) {
    return this.usuarioService.remove(+id, +removidoPor);
  }
  
  @Post('/deletarRevert/:id')
  deletarRevert(@Param('id') id: number) {
    return this.usuarioService.deletarRevert(+id);
  }
}
