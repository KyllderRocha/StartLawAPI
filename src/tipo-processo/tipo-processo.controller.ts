import { Controller } from '@nestjs/common';
import { TipoProcessoService } from './tipo-processo.service';

@Controller('tipo-processo')
export class TipoProcessoController {
  constructor(private readonly tipoProcessoService: TipoProcessoService) {}
}
