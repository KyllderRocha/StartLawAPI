import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class TipoProcessoService {
    
  constructor(private prisma: PrismaService){}

  async create(data: Prisma.TipoProcessoCreateInput) {
    const tipoProcessoExists = await this.prisma.tipoProcesso.findFirst({
      where:{
        nome: data.nome
      }
    });

    if(tipoProcessoExists){
      return new Error("Tipo do processo já existe")
    }

    const tipoProcesso = await this.prisma.tipoProcesso.create({
      data,
    });
    return tipoProcesso;
  }

  async findAll() {
    const tipoProcesso = await this.prisma.tipoProcesso.findMany();
    return tipoProcesso;
  }

  async findOne(id: number) {
    const tipoProcesso = await this.prisma.tipoProcesso.findFirst({
      where:{
        id: id
      }
    });
    return tipoProcesso;
  }

  async update(id: number, data: Prisma.TipoProcessoUpdateInput) {
    const tipoProcessoExists = await this.prisma.tipoProcesso.findFirst({
      where:{
        id,
      }
    }); 

    if(!tipoProcessoExists){
      return new Error("Tipo do processo não existe")
    }

    await this.prisma.tipoProcesso.update({
      data,
      where: {
        id
      }
    })
  }

  async remove(id: number) {
    const tipoProcessoExists = await this.prisma.tipoProcesso.findFirst({
      where:{
        id,
      }
    }); 

    if(!tipoProcessoExists){
      return new Error("Tipo do processo não existe")
    }

    return await this.prisma.tipoProcesso.delete({
      where:{
        id,
      }
    })
  }
}
