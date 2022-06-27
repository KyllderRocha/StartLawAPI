import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class FormularioPadraoService {


    constructor(private prisma: PrismaService){}

    async create(data: Prisma.FormularioPadraoCreateInput) {
      const formularioPadraoExists = await this.prisma.formularioPadrao.findFirst({
        where:{
          nome: data.nome
        }
      });
  
      if(formularioPadraoExists){
        return new Error("formularioPadrao já existe")
      }
  
      const formularioPadrao = await this.prisma.formularioPadrao.create({
        data,
      });
      return formularioPadrao;
    }
  
    async findAll() {
      const formularioPadrao = await this.prisma.formularioPadrao.findMany();
      return formularioPadrao;
    }
  
    async findOne(id: number) {
      const formularioPadrao = await this.prisma.formularioPadrao.findFirst({
        where:{
          id: id
        }
      });
      return formularioPadrao;
    }
  
    async update(id: number, data: Prisma.FormularioPadraoUpdateInput) {
      const formularioPadraoExists = await this.prisma.formularioPadrao.findFirst({
        where:{
          id,
        }
      }); 
  
      if(!formularioPadraoExists){
        return new Error("formularioPadrao não existe")
      }
  
      await this.prisma.formularioPadrao.update({
        data,
        where: {
          id
        }
      })
    }
  
    async remove(id: number) {
      const formularioPadraoExists = await this.prisma.formularioPadrao.findFirst({
        where:{
          id,
        }
      }); 
  
      if(!formularioPadraoExists){
        return new Error("formularioPadrao não existe")
      }
  
      return await this.prisma.formularioPadrao.delete({
        where:{
          id,
        }
      })
    }

}
