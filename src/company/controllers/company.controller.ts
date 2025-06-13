import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import { UpdateCompanyDto } from '../dtos/update-company.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('Companies')
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova empresa' })
  @ApiResponse({ status: 201, description: 'Empresa criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return await this.companyService.create(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as empresas' })
  async findAll() {
    return await this.companyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma empresa por ID' })
  @ApiParam({ name: 'id', description: 'ID da empresa' })
  async findOne(@Param('id') id: string) {
    return await this.companyService.findOne(id);
  }

  @Get('cnpj/:cnpj')
  @ApiOperation({ summary: 'Buscar uma empresa pelo CNPJ' })
  @ApiParam({ name: 'cnpj', description: 'CNPJ da empresa' })
  async findByCnpj(@Param('cnpj') cnpj: string) {
    return await this.companyService.findByCnpj(cnpj);
  }

  @Get('ativas')
  @ApiOperation({ summary: 'Listar empresas ativas' })
  async findActive() {
    return await this.companyService.findActiveCompanies();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma empresa por ID' })
  @ApiParam({ name: 'id', description: 'ID da empresa' })
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return await this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar uma empresa por ID' })
  @ApiParam({ name: 'id', description: 'ID da empresa' })
  async remove(@Param('id') id: string) {
    return await this.companyService.delete(id);
  }
}
