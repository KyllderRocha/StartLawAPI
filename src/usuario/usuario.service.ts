import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class UsuarioService {
    
    constructor(private prisma: PrismaService){}

    async create(data: Prisma.UsuarioCreateInput) {
      const usuarioExists = await this.prisma.usuario.findFirst({
        where:{
          nome: data.nome
        }
      });
  
      if(usuarioExists){
        return new Error("usuario já existe")
      }
  
      const usuario = await this.prisma.usuario.create({
        data,
      });
      return usuario;
    }
  
    async findAll() {
      const usuario = await this.prisma.usuario.findMany();
      return usuario;
    }
  
    async findOne(id: number) {
      const usuario = await this.prisma.usuario.findFirst({
        where:{
          id: id
        }
      });
      return usuario;
    }
  
    async login(login: string, senha: string) {
      if(login == "" || senha == ""){
        return new Error("usuario não existe")
      }

      const usuario = await this.prisma.usuario.findFirst({
        where:{
          login: login,
          senha: senha
        }
      });

      if(!usuario){
        return new Error("usuario não existe")
      }
      
      return usuario;
    }

    async update(id: number, data: Prisma.UsuarioUpdateInput) {
      const usuarioExists = await this.prisma.usuario.findFirst({
        where:{
          id,
        }
      }); 
  
      if(!usuarioExists){
        return new Error("usuario não existe")
      }
  
      await this.prisma.usuario.update({
        data,
        where: {
          id
        }
      })
    }
  
    async remove(id: number) {
      const usuarioExists = await this.prisma.usuario.findFirst({
        where:{
          id,
        }
      }); 
  
      if(!usuarioExists){
        return new Error("usuario não existe")
      }
  
      return await this.prisma.usuario.delete({
        where:{
          id,
        }
      })
    }

}
