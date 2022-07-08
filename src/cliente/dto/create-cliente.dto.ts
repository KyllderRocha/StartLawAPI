import { Cliente } from '../entities/cliente.entity';
import {
  IsEmail,
  IsString,
} from 'class-validator';

export class CreateClienteDto extends Cliente {
  @IsEmail()
  email: string;

  @IsString()
  nome: string;
}