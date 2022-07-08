import { PartialType } from "@nestjs/mapped-types";
import { CreateTipoProcessoDto } from "./create-tipo-processo.dto";


export class UpdateTipoProcessoDto extends PartialType(CreateTipoProcessoDto) {
    
}