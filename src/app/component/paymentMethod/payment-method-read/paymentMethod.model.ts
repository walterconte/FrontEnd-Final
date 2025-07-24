export interface PaymentMethod{
    fpgId?: number
    fpgDescricao: string
    fpgTipo: string
    fpgPermiteParcelamento:boolean
    fpgNumMaxParcelas: number | null
    fpgTaxaAdicional:string
    fpgNome: string
}