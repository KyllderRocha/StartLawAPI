/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class StatusService {

  constructor(private prisma: PrismaService){}

  async create(data: Prisma.StatusCreateInput) {
    const statusExists = await this.prisma.status.findFirst({
      where:{
        nome: data.nome
      }
    });

    if(statusExists){
      return new Error("Status já existe")
    }

    const status = await this.prisma.status.create({
      data,
    });
    return status;
  }

  async findAll() {
    const status = await this.prisma.status.findMany();
    return status;
  }

  async findOne(id: number) {
    const status = await this.prisma.status.findFirst({
      where:{
        id: id
      }
    });
    return status;
  }

  async update(id: number, data: Prisma.StatusUpdateInput) {
    const statusExists = await this.prisma.status.findFirst({
      where:{
        id,
      }
    }); 

    if(!statusExists){
      return new Error("Status não existe")
    }

    await this.prisma.status.update({
      data,
      where: {
        id
      }
    })
  }

  async remove(id: number) {
    const statusExists = await this.prisma.status.findFirst({
      where:{
        id,
      }
    }); 

    if(!statusExists){
      return new Error("Status não existe")
    }

    return await this.prisma.status.delete({
      where:{
        id,
      }
    })
  }
}
