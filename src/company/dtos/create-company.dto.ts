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
}
