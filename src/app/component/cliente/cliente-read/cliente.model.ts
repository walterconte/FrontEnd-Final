export interface Cliente {
  cliId?: number;
  cliNome: string;
  cliCpf: string;

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