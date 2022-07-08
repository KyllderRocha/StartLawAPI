export class Cliente {
    nome: string
    email: string
    telefone: string
    cpf: string
    rg: string
    cnpj: string
    rua: string
    cidade: string
    estado: string
    bairro: string
    cep: string
    numero: string

    criadoPor: number
    criadoEm?: Date | string
    atualizadoPor?: number | null
    atualizadoEm?: Date | string | null
    removidoPor?: number | null
    removidoEm?: Date | string | null
}