import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../supplier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.css']
})
export class SupplierCreateComponent implements OnInit {
  supplier: any = {
    forRazaoSocial: '',
    forNomeFantasia: '',
    forCnpj: '',
    forAtivo: false,
    conCelular: '',
    conTelefoneComercial: '',
    conEmail: '',
    endRua: '',
    endNumero: '',
    endCidade: '',
    endCep: '',
    endEstado: ''
  };

  // Lista de todos os estados
  estados: string[] = [
    'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo',
    'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná',
    'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima',
    'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
  ];

  // Cidades por estado (5 cidades por estado)
  cidadesPorEstado: { [key: string]: string[] } = {
    'Acre': ['Rio Branco', 'Sena Madureira', 'Tarauacá', 'Feijó', 'Cruzeiro do Sul'],
    'Alagoas': ['Maceió', 'Arapiraca', 'Palmeira dos Índios', 'Delmiro Gouveia', 'Murici'],
    'Amapá': ['Macapá', 'Santana', 'Laranjal do Jari', 'Porto Grande', 'Oiapoque'],
    'Amazonas': ['Manaus', 'Parintins', 'Itacoatiara', 'Manacapuru', 'Coari'],
    'Bahia': ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Ilhéus'],
    'Ceará': ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Sobral', 'Crato'],
    'Distrito Federal': ['Brasília'],
    'Espírito Santo': ['Vitória', 'Vila Velha', 'Serra', 'Cariacica', 'Guarapari'],
    'Goiás': ['Goiânia', 'Anápolis', 'Rio Verde', 'Jataí', 'Catalão'],
    'Maranhão': ['São Luís', 'Imperatriz', 'Caxias', 'Timon', 'Bacabal'],
    'Mato Grosso': ['Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Sinop', 'Cáceres'],
    'Mato Grosso do Sul': ['Campo Grande', 'Dourados', 'Três Lagoas', 'Corumbá', 'Ponta Porã'],
    'Minas Gerais': ['Belo Horizonte', 'Uberlândia', 'Juiz de Fora', 'Betim', 'Contagem'],
    'Pará': ['Belém', 'Ananindeua', 'Santarém', 'Marabá', 'Parauapebas'],
    'Paraíba': ['João Pessoa', 'Campina Grande', 'Santa Rita', 'Patos', 'Bayeux'],
    'Paraná': ['Curitiba', 'Londrina', 'Maringá', 'Cascavel', 'Ponta Grossa', 'Cambé'],
    'Pernambuco': ['Recife', 'Olinda', 'Jaboatão dos Guararapes', 'Caruaru', 'Petrolina'],
    'Piauí': ['Teresina', 'Parnaíba', 'Picos', 'Floriano', 'Campo Maior'],
    'Rio de Janeiro': ['Rio de Janeiro', 'Niterói', 'Duque de Caxias', 'Campos dos Goytacazes', 'Nova Iguaçu'],
    'Rio Grande do Norte': ['Natal', 'Mossoró', 'Parnamirim', 'Caicó', 'São Gonçalo do Amarante'],
    'Rio Grande do Sul': ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Santa Maria', 'Viamão'],
    'Rondônia': ['Porto Velho', 'Ji-Paraná', 'Vilhena', 'Ariquemes', 'Cacoal'],
    'Roraima': ['Boa Vista', 'Rorainópolis', 'Caracaraí', 'Mucajaí', 'Alto Alegre'],
    'Santa Catarina': ['Florianópolis', 'Joinville', 'Blumenau', 'Criciúma', 'São José'],
    'São Paulo': ['São Paulo', 'Campinas', 'Guarulhos', 'Santo André', 'São Bernardo do Campo'],
    'Sergipe': ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto', 'Itabaiana', 'Estância'],
    'Tocantins': ['Palmas', 'Araguaína', 'Gurupi', 'Paraíso do Tocantins', 'Miracema do Tocantins']
  };

  // Lista de cidades que será exibida com base no estado selecionado
  cidadesEstadoSelecionado: string[] = [];

  constructor(private supplierService: SupplierService, private router: Router) {}

  ngOnInit(): void {}

  // Método acionado quando o usuário seleciona um estado
  onEstadoChange(estado: string): void {
    // Atualiza a lista de cidades com base no estado selecionado
    this.cidadesEstadoSelecionado = this.cidadesPorEstado[estado] || [];
  }

  // Método para criar um novo fornecedor
  createSupplier(): void {
    console.log('DEBUG => Dados do formulário:');
    console.log(this.supplier);

    const s = this.supplier;
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    if (
      !this.supplier.forRazaoSocial.trim() ||
      !this.supplier.forNomeFantasia.trim() ||
      !s.forCnpj?.trim() ||
      !this.isCnpjValid(s.forCnpj) ||
      !cnpjRegex.test(s.forCnpj) ||
      !s.conCelular.trim() ||
      !s.conEmail.trim() ||
      !s.endRua.trim() ||
      !s.endNumero.trim() ||
      !s.endCidade.trim() ||
      !s.endCep.trim() ||
      !s.endEstado.trim()) {
      this.supplierService.showMessage('Por favor, preencha todos os campos obrigatórios corretamente!');
      return;
    }

    this.supplierService.create(this.supplier).subscribe(() => {
      this.supplierService.showMessage('Fornecedor criado!');
      this.router.navigate(['/suppliers']);
    });
  }

  // Método para cancelar a criação do fornecedor
  cancel(): void {
    this.router.navigate(['/suppliers']);
  }

  // Método para validar o CNPJ
  private isCnpjValid(cnpj: string): boolean {
    cnpj = cnpj.replace(/[^\d]+/g, ''); // remove tudo que não for número

    if (cnpj.length !== 14) return false;

    // Elimina CNPJs com todos os dígitos iguais
    if (/^(\d)\1+$/.test(cnpj)) return false;

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(1))) return false;

    return true;
  }
}
