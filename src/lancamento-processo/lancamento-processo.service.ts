import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';
import { CreateLancamentoProcessoDto } from './dto/create-lancamento-processo.dto';
import { UpdateLancamentoProcessoDto } from './dto/update-lancamento-processo.dto';

@Injectable()
export class LancamentoProcessoService {

    constructor(private prisma: PrismaService){}

    async create(createLancamentoProcessoDto: CreateLancamentoProcessoDto) {
        const LancamentoProcessoExists = await this.prisma.lancamentoProcesso.findFirst({
          where:{
            nome: createLancamentoProcessoDto.nome,
            removidoEm: null
          }
        });
    
        if(LancamentoProcessoExists){
          throw new Error("Lancamento já existe")
        }
        
    
        const LancamentoProcesso = await this.prisma.lancamentoProcesso.create({
          data: {
            nome:createLancamentoProcessoDto.nome,
            descricao:createLancamentoProcessoDto.descricao,
            prazo: new Date(createLancamentoProcessoDto.prazo),
            userCriador: {
              connect: {
                id: createLancamentoProcessoDto.criadoPor,
              },
            },
            status: {
              connect: {
                id: createLancamentoProcessoDto.statusID,
              },
            },
            processo: {
              connect: {
                id: createLancamentoProcessoDto.processoID,
              },
            },
          }
        });

        await this.prisma.processo.update({
            data: {
              prazo: new Date(createLancamentoProcessoDto.prazo),
              statusID: createLancamentoProcessoDto.statusID
            },
            where: {
                id: createLancamentoProcessoDto.processoID
            }
        });
          
        return LancamentoProcesso;
      }
    
      async findAll() {
        const Processo = await this.prisma.lancamentoProcesso.findMany();
        return Processo;
      }
    
      async findAllProcesso(processoID: number, createLancamentoProcessoDto: CreateLancamentoProcessoDto) {
        
        const Processo = await this.prisma.lancamentoProcesso.findMany({
          where:{
            nome: {
              contains:createLancamentoProcessoDto.nome,
            },
            descricao: {
              contains:createLancamentoProcessoDto.descricao,
            },
            // prazo: {
            //   contains:createLancamentoProcessoDto.prazo,
            // },
            removidoEm: null,
            processo: {
              id: processoID
            },
          },
          include: {
            processo: true, 
            status: true,
            userCriador: true
          }
        });
        return Processo;
      }
    
      async findOne(id: number) {
        const Processo = await this.prisma.lancamentoProcesso.findFirst({
          where:{
            id: id,
            removidoEm: null
          }
        });
        return Processo;
      }
    
      async update(id: number, data: UpdateLancamentoProcessoDto) {
        const ProcessoExists = await this.prisma.lancamentoProcesso.findFirst({
          where:{
            id,
            removidoEm: null
          }
        }); 
    
        if(!ProcessoExists){
          throw new Error("Lancamento não existe")
        }
    
        await this.prisma.lancamentoProcesso.update({
          data: {
            nome: data.nome,
            descricao: data.descricao,
            prazo: data.prazo,
            statusID: data.statusID,
            atualizadoPor:data.atualizadoPor,
            atualizadoEm: new Date()
            
          },
          where: {
            id
          }
        })
      }
    
      async remove(id: number, removidoPor: number) {
        const ProcessoExists = await this.prisma.lancamentoProcesso.findFirst({
          where:{
            id,
            removidoEm: null
          }
        }); 
    
        if(!ProcessoExists){
          throw new Error("Lancamento não existe")
        }
    
        await this.prisma.lancamentoProcesso.update({
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
        const ProcessoExists = await this.prisma.lancamentoProcesso.findFirst({
          where:{
            id
          }
        }); 
    
        if(!ProcessoExists){
          throw new Error("Lancamento não existe")
        }
    
        await this.prisma.lancamentoProcesso.update({
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
