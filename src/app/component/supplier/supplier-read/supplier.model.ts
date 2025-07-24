export interface Supplier {
  forId?: number;
  forRazaoSocial: string;
  forNomeFantasia: string;
  forCnpj: string; 
  forAtivo: Boolean;

  // Contato
  conCelular: string;
  conTelefoneComercial: string;
  conEmail: string;

  // Endereço
  endRua: string;
  endNumero: string;
  endCidade: string;
  endCep: string;
  endEstado: string;

}