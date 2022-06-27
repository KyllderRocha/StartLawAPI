import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class ClienteService {
    

  constructor(private prisma: PrismaService){}

  async create(data: Prisma.ClienteCreateInput) {
    const clienteExists = await this.prisma.cliente.findFirst({
      where:{
        nome: data.nome
      }
    });

    if(clienteExists){
      return new Error("Cliente já existe")
    }

    const cliente = await this.prisma.cliente.create({
      data,
    });
    return cliente;
  }

  async findAll() {
    const cliente = await this.prisma.cliente.findMany();
    return cliente;
  }

  async findOne(id: number) {
    const cliente = await this.prisma.cliente.findFirst({
      where:{
        id: id
      }
    });
    return cliente;
  }

  async update(id: number, data: Prisma.ClienteUpdateInput) {
    const clienteExists = await this.prisma.cliente.findFirst({
      where:{
        id,
      }
    }); 

    if(!clienteExists){
      return new Error("Cliente não existe")
    }

    await this.prisma.cliente.update({
      data,
      where: {
        id
      }
    })
  }

  async remove(id: number) {
    const clienteExists = await this.prisma.cliente.findFirst({
      where:{
        id,
      }
    }); 

    if(!clienteExists){
      return new Error("cliente não existe")
    }

    return await this.prisma.cliente.delete({
      where:{
        id,
      }
    })
  }
}
