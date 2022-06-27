import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class DocumentoService {

  constructor(private prisma: PrismaService){}

  async create(data: Prisma.DocumentoCreateInput) {
    const documentoExists = await this.prisma.documento.findFirst({
      where:{
        nome: data.nome
      }
    });

    if(documentoExists){
      return new Error("documento já existe")
    }

    const documento = await this.prisma.documento.create({
      data,
    });
    return documento;
  }

  async findAll() {
    const documento = await this.prisma.documento.findMany();
    return documento;
  }

  async findOne(id: number) {
    const documento = await this.prisma.documento.findFirst({
      where:{
        id: id
      }
    });
    return documento;
  }

  async update(id: number, data: Prisma.DocumentoUpdateInput) {
    const documentoExists = await this.prisma.documento.findFirst({
      where:{
        id,
      }
    }); 

    if(!documentoExists){
      return new Error("documento não existe")
    }

    await this.prisma.documento.update({
      data,
      where: {
        id
      }
    })
  }

  async remove(id: number) {
    const documentoExists = await this.prisma.documento.findFirst({
      where:{
        id,
      }
    }); 

    if(!documentoExists){
      return new Error("documento não existe")
    }

    return await this.prisma.documento.delete({
      where:{
        id,
      }
    })
  }
}
