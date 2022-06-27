import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class ProcessoService {

    constructor(private prisma: PrismaService){}
  
    async create(data: Prisma.ProcessoCreateInput) {
      const processoExists = await this.prisma.processo.findFirst({
        where:{
          nome: data.nome
        }
      });
  
      if(processoExists){
        return new Error("processo já existe")
      }
  
      const processo = await this.prisma.processo.create({
        data,
      });
      return processo;
    }
  
    async findAll() {
      const processo = await this.prisma.processo.findMany();
      return processo;
    }
  
    async findOne(id: number) {
      const processo = await this.prisma.processo.findFirst({
        where:{
          id: id
        }
      });
      return processo;
    }
  
    async update(id: number, data: Prisma.ProcessoUpdateInput) {
      const processoExists = await this.prisma.processo.findFirst({
        where:{
          id,
        }
      }); 
  
      if(!processoExists){
        return new Error("processo não existe")
      }
  
      await this.prisma.processo.update({
        data,
        where: {
          id
        }
      })
    }
  
    async remove(id: number) {
      const processoExists = await this.prisma.processo.findFirst({
        where:{
          id,
        }
      }); 
  
      if(!processoExists){
        return new Error("processo não existe")
      }
  
      return await this.prisma.processo.delete({
        where:{
          id,
        }
      })
    }}
