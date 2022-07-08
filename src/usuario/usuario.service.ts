import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
    
    constructor(private prisma: PrismaService){}

    async create(createUsuarioDto: CreateUsuarioDto) {
      const usuarioExists = await this.prisma.usuario.findFirst({
        where:{
          login: createUsuarioDto.login,
          cpf: createUsuarioDto.cpf,
          removidoEm: null
        }
      });

      if(usuarioExists){
        throw new Error("usuario já existe")
      }
      

      const usuario = await this.prisma.usuario.create({
        data: {
          nome:createUsuarioDto.nome,
          email:createUsuarioDto.email,
          login:createUsuarioDto.login,
          senha:createUsuarioDto.senha,
          telefone:createUsuarioDto.telefone,
          cpf:createUsuarioDto.cpf,
          rg:createUsuarioDto.rg,
          cep:createUsuarioDto.cep,
          rua:createUsuarioDto.rua,
          cidade:createUsuarioDto.cidade,
          estado:createUsuarioDto.estado,
          numero:createUsuarioDto.numero,
          bairro:createUsuarioDto.bairro,
          cargo:createUsuarioDto.cargo,
          criadoPor:createUsuarioDto.criadoPor,
          firma: {
            connect: {
              id: createUsuarioDto.firmaID,
            },
          }
        }
      });
      return usuario;
    }
  
    async findAll() {
      const usuario = await this.prisma.usuario.findMany();
      return usuario;
    }

    async findAllFirma(firmaID: number, createUsuarioDto: CreateUsuarioDto) {
      const usuario = await this.prisma.usuario.findMany({
        where:{
          firmaID: firmaID,
          nome: {
            contains:createUsuarioDto.nome,
          },
          email: {
            contains:createUsuarioDto.email,
          },
          cpf: {
            contains:createUsuarioDto.cpf,
          },
          rg: {
            contains:createUsuarioDto.rg,
          },
          cargo: {
            contains:createUsuarioDto.cargo,
          },
          removidoEm: null
        }
      });
      return usuario;
    }
  
    async findOne(id: number) {
      const usuario = await this.prisma.usuario.findFirst({
        where:{
          id: id,
          removidoEm: null
        }
      });
      return usuario;
    }
  
    async login(login: string, senha: string) {
      if(login == "" || senha == ""){
        throw new Error("usuario não existe")
      }

      const usuario = await this.prisma.usuario.findFirst({
        where:{
          login: login,
          senha: senha,
          removidoEm: null
        }
      });

      if(!usuario){
        throw new Error("usuario não existe")
      }
      
      return usuario;
    }

    async update(id: number, data: UpdateUsuarioDto) {
      const usuarioExists = await this.prisma.usuario.findFirst({
        where:{
          id,
          removidoEm: null
        }
      }); 
  
      if(!usuarioExists){
        throw new Error("usuario não existe")
      }
  
      await this.prisma.usuario.update({
        data: {
          nome: data.nome,
          email: data.email,
          login: data.login,
          telefone: data.telefone,
          cpf: data.cpf,
          rg: data.rg,
          cep: data.cep,
          rua: data.rua,
          cidade: data.cidade,
          estado: data.estado,
          numero: data.numero,
          bairro: data.bairro,
          cargo: data.cargo,
          atualizadoPor:data.atualizadoPor,
          atualizadoEm: new Date()
          
        },
        where: {
          id
        }
      })
    }
  
    async remove(id: number, removidoPor: number) {
      const usuarioExists = await this.prisma.usuario.findFirst({
        where:{
          id,
          removidoEm: null
        }
      }); 
  
      if(!usuarioExists){
        throw new Error("usuario não existe")
      }

      await this.prisma.usuario.update({
        data: {
          removidoPor: removidoPor,
          removidoEm: new Date()
          
        },
        where: {
          id
        }
      })
      // return await this.prisma.usuario.delete({
      //   where:{
      //     id,
      //   }
      // })
    }

    async deletarRevert(id: number) {
      const usuarioExists = await this.prisma.usuario.findFirst({
        where:{
          id
        }
      }); 
  
      if(!usuarioExists){
        throw new Error("usuario não existe")
      }

      await this.prisma.usuario.update({
        data: {
          removidoPor: null,
          removidoEm: null
        },
        where: {
          id
        }
      })
    }
    
}
