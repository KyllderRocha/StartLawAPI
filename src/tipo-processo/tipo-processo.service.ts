import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';
import { CreateTipoProcessoDto } from './dto/create-tipo-processo.dto';
import { UpdateTipoProcessoDto } from './dto/update-tipo-processo.dto';

@Injectable()
export class TipoProcessoService {
    
  constructor(private prisma: PrismaService){}

 
  async create(createTipoProcessoDto: CreateTipoProcessoDto) {
    const TipoProcessoExists = await this.prisma.tipoProcesso.findFirst({
      where:{
        nome: createTipoProcessoDto.nome,
        removidoEm: null
      }
    });

    if(TipoProcessoExists){
      throw new Error("Tipo Processo não já existe")
    }
    

    const TipoProcesso = await this.prisma.tipoProcesso.create({
      data: {
        nome:createTipoProcessoDto.nome,
        descricao:createTipoProcessoDto.descricao,
        userCriador: {
          connect: {
            id: createTipoProcessoDto.criadoPor,
          },
        }
      }
    });
    return TipoProcesso;
  }

  async findAll() {
    const TipoProcesso = await this.prisma.tipoProcesso.findMany();
    return TipoProcesso;
  }

  async findAllFirma(firmaID: number, createTipoProcessoDto: CreateTipoProcessoDto) {
    const TipoProcesso = await this.prisma.tipoProcesso.findMany({
      where:{
        nome: {
          contains:createTipoProcessoDto.nome,
        },
        descricao: {
          contains:createTipoProcessoDto.descricao,
        },
        removidoEm: null,
        userCriador: {
          firmaID: firmaID
        }
      }
    });
    return TipoProcesso;
  }

  async findOne(id: number) {
    const TipoProcesso = await this.prisma.tipoProcesso.findFirst({
      where:{
        id: id,
        removidoEm: null
      }
    });
    return TipoProcesso;
  }

  async update(id: number, data: UpdateTipoProcessoDto) {
    const TipoProcessoExists = await this.prisma.tipoProcesso.findFirst({
      where:{
        id,
        removidoEm: null
      }
    }); 

    if(!TipoProcessoExists){
      throw new Error("Tipo Processo não não existe")
    }

    await this.prisma.tipoProcesso.update({
      data: {
        nome: data.nome,
        descricao: data.descricao,
        atualizadoPor:data.atualizadoPor,
        atualizadoEm: new Date()
        
      },
      where: {
        id
      }
    })
  }

  async remove(id: number, removidoPor: number) {
    const TipoProcessoExists = await this.prisma.tipoProcesso.findFirst({
      where:{
        id,
        removidoEm: null
      }
    }); 

    if(!TipoProcessoExists){
      throw new Error("Tipo Processo não não existe")
    }

    await this.prisma.tipoProcesso.update({
      data: {
        removidoPor: removidoPor,
        removidoEm: new Date()
        
      },
      where: {
        id
      }
    })
    // return await this.prisma.TipoProcesso.delete({
    //   where:{
    //     id,
    //   }
    // })
  }

  async deletarRevert(id: number) {
    const TipoProcessoExists = await this.prisma.tipoProcesso.findFirst({
      where:{
        id
      }
    }); 

    if(!TipoProcessoExists){
      throw new Error("Tipo Processo não existe")
    }

    await this.prisma.tipoProcesso.update({
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
