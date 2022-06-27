import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class LancamentoProcessoService {

    constructor(private prisma: PrismaService){}

    async create(data: Prisma.LancamentoProcessoCreateInput) {
        const lancamentoProcessoExists = await this.prisma.lancamentoProcesso.findFirst({
        where:{
            nome: data.nome
        }
        });

        if(lancamentoProcessoExists){
        return new Error("lancamentoProcesso já existe")
        }

        const lancamentoProcesso = await this.prisma.lancamentoProcesso.create({
        data,
        });
        return lancamentoProcesso;
    }

    async findAll() {
        const lancamentoProcesso = await this.prisma.lancamentoProcesso.findMany();
        return lancamentoProcesso;
    }

    async findOne(id: number) {
        const lancamentoProcesso = await this.prisma.lancamentoProcesso.findFirst({
        where:{
            id: id
        }
        });
        return lancamentoProcesso;
    }

    async update(id: number, data: Prisma.LancamentoProcessoUpdateInput) {
        const lancamentoProcessoExists = await this.prisma.lancamentoProcesso.findFirst({
        where:{
            id,
        }
        }); 

        if(!lancamentoProcessoExists){
        return new Error("lancamento Processo não existe")
        }

        await this.prisma.lancamentoProcesso.update({
        data,
        where: {
            id
        }
        })
    }

    async remove(id: number) {
        const lancamentoProcessoExists = await this.prisma.lancamentoProcesso.findFirst({
        where:{
            id,
        }
        }); 

        if(!lancamentoProcessoExists){
        return new Error("lancamento Processo não existe")
        }

        return await this.prisma.lancamentoProcesso.delete({
        where:{
            id,
        }
        })
    }
}
