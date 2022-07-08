import { Processo } from '../entities/processo.entity';
import {
  IsString,
} from 'class-validator';

export class CreateProcessoDto extends Processo {
  @IsString()
  nome: string;
}