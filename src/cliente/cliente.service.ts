import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClienteService {
    

  constructor(private prisma: PrismaService){}

  
  async create(createClienteDto: CreateClienteDto) {
    const ClienteExists = await this.prisma.cliente.findFirst({
      where:{
        cpf: createClienteDto.cpf,
        removidoEm: null
      }
    });

    if(ClienteExists){
      throw new Error("Cliente já existe")
    }
    

    const Cliente = await this.prisma.cliente.create({
      data: {
        nome:createClienteDto.nome,
        email:createClienteDto.email,
        telefone:createClienteDto.telefone,
        cpf:createClienteDto.cpf,
        rg:createClienteDto.rg,
        cep:createClienteDto.cep,
        rua:createClienteDto.rua,
        cnpj:createClienteDto.cnpj,
        cidade:createClienteDto.cidade,
        estado:createClienteDto.estado,
        numero:createClienteDto.numero,
        bairro:createClienteDto.bairro,
        userCriador: {
          connect: {
            id: createClienteDto.criadoPor,
          },
        }
      }
    });
    return Cliente;
  }

  async findAll() {
    const Cliente = await this.prisma.cliente.findMany();
    return Cliente;
  }

  async findAllFirma(firmaID: number, createClienteDto: CreateClienteDto) {
    const Cliente = await this.prisma.cliente.findMany({
      where:{
        nome: {
          contains:createClienteDto.nome,
        },
        email: {
          contains:createClienteDto.email,
        },
        cpf: {
          contains:createClienteDto.cpf,
        },
        rg: {
          contains:createClienteDto.rg,
        },
        cnpj: {
          contains:createClienteDto.cnpj,
        },
        removidoEm: null,
        userCriador: {
          firmaID: firmaID
        }
      }
    });
    return Cliente;
  }

  async findOne(id: number) {
    const Cliente = await this.prisma.cliente.findFirst({
      where:{
        id: id,
        removidoEm: null
      }
    });
    return Cliente;
  }

  async update(id: number, data: UpdateClienteDto) {
    const ClienteExists = await this.prisma.cliente.findFirst({
      where:{
        id,
        removidoEm: null
      }
    }); 

    if(!ClienteExists){
      throw new Error("Cliente não existe")
    }

    await this.prisma.cliente.update({
      data: {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        cpf: data.cpf,
        rg: data.rg,
        cep: data.cep,
        rua: data.rua,
        cidade: data.cidade,
        estado: data.estado,
        numero: data.numero,
        bairro: data.bairro,
        atualizadoPor:data.atualizadoPor,
        atualizadoEm: new Date()
        
      },
      where: {
        id
      }
    })
  }

  async remove(id: number, removidoPor: number) {
    const ClienteExists = await this.prisma.cliente.findFirst({
      where:{
        id,
        removidoEm: null
      }
    }); 

    if(!ClienteExists){
      throw new Error("Cliente não existe")
    }

    await this.prisma.cliente.update({
      data: {
        removidoPor: removidoPor,
        removidoEm: new Date()
        
      },
      where: {
        id
      }
    })
    // return await this.prisma.Cliente.delete({
    //   where:{
    //     id,
    //   }
    // })
  }

  async deletarRevert(id: number) {
    const ClienteExists = await this.prisma.cliente.findFirst({
      where:{
        id
      }
    }); 

    if(!ClienteExists){
      throw new Error("Cliente não existe")
    }

    await this.prisma.cliente.update({
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
