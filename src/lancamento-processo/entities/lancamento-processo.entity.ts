export class LancamentoProcesso {
    id: number
    nome: string
    descricao: string
    statusID: number
    prazo: Date | string
    processoID: number
    criadoPor: number
    criadoEm?: Date | string
    atualizadoPor?: number | null
    atualizadoEm?: Date | string | null
    removidoPor?: number | null
    removidoEm?: Date | string | null
}