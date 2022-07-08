// import { Injectable } from '@nestjs/common';
// import { Prisma } from '@prisma/client';
// import { PrismaService } from 'src/database/PrismaService';

// @Injectable()
// export class EnderecoService {


//     constructor(private prisma: PrismaService){}

//     async create(data: Prisma.EnderecoCreateInput) {  
//       const endereco = await this.prisma.endereco.create({
//         data,
//       });
//       return endereco;
//     }
  
//     async findAll() {
//       const endereco = await this.prisma.endereco.findMany();
//       return endereco;
//     }
  
//     async findOne(id: number) {
//       const endereco = await this.prisma.endereco.findFirst({
//         where:{
//           id: id
//         }
//       });
//       return endereco;
//     }
  
//     async update(id: number, data: Prisma.EnderecoUpdateInput) {
//       const enderecoExists = await this.prisma.endereco.findFirst({
//         where:{
//           id,
//         }
//       }); 
  
//       if(!enderecoExists){
//         return new Error("endereco não existe")
//       }
  
//       await this.prisma.endereco.update({
//         data,
//         where: {
//           id
//         }
//       })
//     }
  
//     async remove(id: number) {
//       const enderecoExists = await this.prisma.endereco.findFirst({
//         where:{
//           id,
//         }
//       }); 
  
//       if(!enderecoExists){
//         return new Error("endereco não existe")
//       }
  
//       return await this.prisma.endereco.delete({
//         where:{
//           id,
//         }
//       })
//     }

// }
