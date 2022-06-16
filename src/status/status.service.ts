import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class StatusService {

  constructor(private prisma: PrismaService){}

  async create(createStatusDto: CreateStatusDto) {
    const statusExists = await this.prisma.status.findFirst({
      where:{
        nome: createStatusDto.nome
      }
    });

    if(statusExists){
      return new Error("Status já existe")
    }

    const status = await this.prisma.status.create({
      data: createStatusDto
    });
    return status;
  }

  async findAll() {
    const status = await this.prisma.status.findMany();
    return status;
  }

  findOne(id: number) {
    return `This action returns a #${id} status`;
  }

  update(id: number, updateStatusDto: UpdateStatusDto) {
    return `This action updates a #${id} status`;
  }

  remove(id: number) {
    return `This action removes a #${id} status`;
  }
}
