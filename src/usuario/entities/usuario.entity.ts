export class Usuario {
    id?: number
    nome: string
    email: string
    login: string
    senha: string
    telefone: string
    cpf: string
    rg: string
    cargo: string
    
    rua: string
    cidade: string
    estado: string
    bairro: string
    cep: string
    numero: string
    
    firmaID: number
    criadoPor: number
    criadoEm?: Date | string
    atualizadoPor?: number | null
    atualizadoEm?: Date | string | null
    removidoPor?: number | null
    removidoEm?: Date | string | null
}