import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';
import { CreateProcessoDto } from './dto/create-processo.dto';
import { UpdateProcessoDto } from './dto/update-processo.dto';

@Injectable()
export class ProcessoService {

    constructor(private prisma: PrismaService){}
  
    async create(createProcessoDto: CreateProcessoDto) {
      const ProcessoExists = await this.prisma.processo.findFirst({
        where:{
          nome: createProcessoDto.nome,
          removidoEm: null
        }
      });
  
      if(ProcessoExists){
        throw new Error("Processo já existe")
      }
      
  
      const Processo = await this.prisma.processo.create({
        data: {
          nome:createProcessoDto.nome,
          descricao:createProcessoDto.descricao,
          observacao:createProcessoDto.observacao,
          prazo: new Date(createProcessoDto.prazo),
          userCriador: {
            connect: {
              id: createProcessoDto.criadoPor,
            },
          },
          status: {
            connect: {
              id: createProcessoDto.statusID,
            },
          },
          tipoProcesso: {
            connect: {
              id: createProcessoDto.tipoProcessoID,
            },
          },
          cliente: {
            connect: {
              id: createProcessoDto.clienteID,
            },
          }
        }
      });
      return Processo;
    }
  
    async findAll() {
      const Processo = await this.prisma.processo.findMany();
      return Processo;
    }
  
    async findAllFirma(firmaID: number, createProcessoDto: CreateProcessoDto) {
      
      let Processo = await this.prisma.processo.findMany({
        where:{
          nome: {
            contains:createProcessoDto.nome,
          },
          // prazo: {
          //   contains:createProcessoDto.prazo,
          // },
          removidoEm: null,
          userCriador: {
            firmaID: firmaID
          },
          // clienteID: createProcessoDto.clienteID,
          // statusID: createProcessoDto.statusID,
          // tipoProcessoID: createProcessoDto.tipoProcessoID,
        },
        include: {
          cliente: true, 
          status: true, 
          tipoProcesso: true 
        }
      });

      if(createProcessoDto.id > 0)
        Processo = Processo.filter(x => x.id == createProcessoDto.id);

      if(createProcessoDto.clienteID > 0)
        Processo = Processo.filter(x => x.clienteID == createProcessoDto.clienteID);

      if(createProcessoDto.tipoProcessoID > 0)
        Processo = Processo.filter(x => x.tipoProcessoID == createProcessoDto.tipoProcessoID);

      if(createProcessoDto.prazoInicial && createProcessoDto.prazoFinal )
        Processo = Processo.filter(x => x.prazo >= new Date(createProcessoDto.prazoInicial) && x.prazo <= new Date(createProcessoDto.prazoFinal));
      else if(createProcessoDto.prazoInicial)
        Processo = Processo.filter(x => x.prazo >= new Date(createProcessoDto.prazoInicial));
      else if(createProcessoDto.prazoFinal)
        Processo = Processo.filter(x => x.prazo <= new Date(createProcessoDto.prazoFinal));

      return Processo;
    }
  
    async findOne(id: number) {
      const Processo = await this.prisma.processo.findFirst({
        where:{
          id: id,
          removidoEm: null
        }
      });
      return Processo;
    }
  
    async update(id: number, data: UpdateProcessoDto) {
      const ProcessoExists = await this.prisma.processo.findFirst({
        where:{
          id,
          removidoEm: null
        }
      }); 
  
      if(!ProcessoExists){
        throw new Error("Processo não existe")
      }
  
      await this.prisma.processo.update({
        data: {
          nome: data.nome,
          descricao: data.descricao,
          observacao: data.observacao,
          prazo: data.prazo,
          atualizadoPor:data.atualizadoPor,
          atualizadoEm: new Date()
          
        },
        where: {
          id
        }
      })
    }
  
    async remove(id: number, removidoPor: number) {
      const ProcessoExists = await this.prisma.processo.findFirst({
        where:{
          id,
          removidoEm: null
        }
      }); 
  
      if(!ProcessoExists){
        throw new Error("Processo não existe")
      }
  
      await this.prisma.processo.update({
        data: {
          removidoPor: removidoPor,
          removidoEm: new Date()
          
        },
        where: {
          id
        }
      })
    }
  
    async deletarRevert(id: number) {
      const ProcessoExists = await this.prisma.processo.findFirst({
        where:{
          id
        }
      }); 
  
      if(!ProcessoExists){
        throw new Error("Processo não existe")
      }
  
      await this.prisma.processo.update({
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
