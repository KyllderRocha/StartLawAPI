export class Processo {
    id: number
    nome: string
    descricao: string
    observacao: string
    statusID: number
    clienteID: number
    prazo: Date
    prazoInicial: Date
    prazoFinal: Date
    tipoProcessoID: number
    criadoPor: number
    criadoEm?: Date | string
    atualizadoPor?: number | null
    atualizadoEm?: Date | string | null
    removidoPor?: number | null
    removidoEm?: Date | string | null
}