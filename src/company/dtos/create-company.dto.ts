import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({
    example: 'Empresa XYZ',
    description: 'Nome oficial da empresa',
  })
  nome: string;

  @ApiProperty({
    example: 'Rua Principal, 123',
    required: false,
    description: 'Endereço da empresa',
  })
  endereco?: string;

  @ApiProperty({
    example: '(11) 1234-5678',
    required: false,
    description: 'Telefone de contato da empresa',
  })
  telefone?: string;

  @ApiProperty({
    example: '12.345.678/0001-90',    
    required: true,
    description: 'CNPJ da empresa, deve ser único',
  })
  cnpj: string;

}
