import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class FirmaService {

    constructor(private prisma: PrismaService){}

    async create(data: Prisma.FirmaCreateInput) {
      const statusExists = await this.prisma.firma.findFirst({
        where:{
          nome: data.nome
        }
      });
  
      if(statusExists){
        return new Error("Firma já existe")
      }
  
      const status = await this.prisma.firma.create({
        data,
      });
      return status;
    }
  
    async findAll() {
      const status = await this.prisma.firma.findMany();
      return status;
    }
  
    async findOne(id: number) {
      const status = await this.prisma.firma.findFirst({
        where:{
          id: id
        }
      });
      return status;
    }
  
    async update(id: number, data: Prisma.FirmaUpdateInput) {
      const statusExists = await this.prisma.firma.findFirst({
        where:{
          id,
        }
      }); 
  
      if(!statusExists){
        return new Error("Firma não existe")
      }
  
      await this.prisma.firma.update({
        data,
        where: {
          id
        }
      })
    }
  
    async remove(id: number) {
      const statusExists = await this.prisma.firma.findFirst({
        where:{
          id,
        }
      }); 
  
      if(!statusExists){
        return new Error("Status não existe")
      }
  
      return await this.prisma.firma.delete({
        where:{
          id,
        }
      })
    }
}
