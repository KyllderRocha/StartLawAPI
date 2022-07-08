import { PartialType } from "@nestjs/mapped-types";
import { CreateLancamentoProcessoDto } from "./create-lancamento-processo.dto";


export class UpdateLancamentoProcessoDto extends PartialType(CreateLancamentoProcessoDto) {
    
}