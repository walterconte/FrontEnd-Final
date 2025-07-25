export interface PaymentMethod{
    fpgId?: number
    fpgTipo: string
    fpgPermiteParcelamento:boolean
    fpgNumMaxParcelas: number | null
    fpgTaxaAdicional:number
    fpgNome: string
}