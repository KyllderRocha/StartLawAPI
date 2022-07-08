export class TipoProcesso {
    id: number
    nome: string
    descricao: string
    criadoPor?: number
    criadoEm?: Date | string
    atualizadoPor?: number | null
    atualizadoEm?: Date | string | null
    removidoPor?: number | null
    removidoEm?: Date | string | null
}