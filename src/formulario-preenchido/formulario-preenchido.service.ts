import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class FormularioPreenchidoService {

    constructor(private prisma: PrismaService){}

    async create(data: Prisma.FormularioPreenchidoCreateInput) {
      const formularioPreenchidoExists = await this.prisma.formularioPreenchido.findFirst({
        where:{
          nome: data.nome
        }
      });
  
      if(formularioPreenchidoExists){
        return new Error("formularioPreenchido já existe")
      }
  
      const formularioPreenchido = await this.prisma.formularioPreenchido.create({
        data,
      });
      return formularioPreenchido;
    }
  
    async findAll() {
      const formularioPreenchido = await this.prisma.formularioPreenchido.findMany();
      return formularioPreenchido;
    }
  
    async findOne(id: number) {
      const formularioPreenchido = await this.prisma.formularioPreenchido.findFirst({
        where:{
          id: id
        }
      });
      return formularioPreenchido;
    }
  
    async update(id: number, data: Prisma.FormularioPreenchidoUpdateInput) {
      const formularioPreenchidoExists = await this.prisma.formularioPreenchido.findFirst({
        where:{
          id,
        }
      }); 
  
      if(!formularioPreenchidoExists){
        return new Error("formularioPreenchido não existe")
      }
  
      await this.prisma.formularioPreenchido.update({
        data,
        where: {
          id
        }
      })
    }
  
    async remove(id: number) {
      const formularioPreenchidoExists = await this.prisma.formularioPreenchido.findFirst({
        where:{
          id,
        }
      }); 
  
      if(!formularioPreenchidoExists){
        return new Error("formularioPreenchido não existe")
      }
  
      return await this.prisma.formularioPreenchido.delete({
        where:{
          id,
        }
      })
    }

}
