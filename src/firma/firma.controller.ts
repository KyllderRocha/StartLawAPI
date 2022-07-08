import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FirmaService } from './firma.service';

@Controller('firma')
export class FirmaController {
  constructor(private readonly firmaService: FirmaService) {}

  @Post()
    create(@Body() createFirmaDto: Prisma.FirmaCreateInput) {
      return this.firmaService.create(createFirmaDto);
    }

    @Get()
    findAll() {
      return this.firmaService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
      return this.firmaService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateFirmaDto: Prisma.FirmaUpdateInput) {
      return this.firmaService.update(+id, updateFirmaDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.firmaService.remove(+id);
    }
}
