import { LancamentoProcesso } from '../entities/lancamento-processo.entity';
import {
  IsString,
} from 'class-validator';

export class CreateLancamentoProcessoDto extends LancamentoProcesso {
  @IsString()
  nome: string;
}