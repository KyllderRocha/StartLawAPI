import { TipoProcesso } from '../entities/tipo-processo.entity';
import {
  IsEmail,
  IsString,
} from 'class-validator';

export class CreateTipoProcessoDto extends TipoProcesso {
  @IsString()
  nome: string;
}