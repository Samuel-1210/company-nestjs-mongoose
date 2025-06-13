import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from '../schemas/company.schema';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import { UpdateCompanyDto } from '../dtos/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('Company') private readonly companyModel: Model<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const existingCompany = await this.companyModel
      .findOne({ cnpj: createCompanyDto.cnpj })
      .exec();

    if (existingCompany) {
      throw new ConflictException('Já existe uma empresa com este CNPJ');
    }

    return await this.companyModel.create(createCompanyDto);
  }

  async findAll() {
    const companies = await this.companyModel.find().exec();
    if (companies.length === 0) {
      throw new NotFoundException('Nenhuma empresa encontrada');
    }
    return companies;
  }

  async findOne(id: string) {
    const company = await this.companyModel.findById(id).exec();
    if (!company) {
      throw new NotFoundException('Empresa não encontrada');
    }
    return company;
  }

  async findByCnpj(cnpj: string) {
    const company = await this.companyModel.findOne({ cnpj }).exec();
    if (!company) {
      throw new NotFoundException('Nenhuma empresa encontrada com este CNPJ');
    }
    return company;
  }

  async findActiveCompanies() {
    const activeCompanies = await this.companyModel
      .find({ ativo: true })
      .exec();
    if (!activeCompanies.length) {
      throw new NotFoundException('Nenhuma empresa ativa encontrada');
    }

    return activeCompanies;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const updatedCompany = await this.companyModel
      .findByIdAndUpdate(id, updateCompanyDto, { new: true })
      .exec();

    if (!updatedCompany) {
      throw new NotFoundException('Empresa não encontrada para atualização');
    }
    return updatedCompany;
  }

  async delete(id: string) {
    const deletedCompany = await this.companyModel.findByIdAndDelete(id).exec();
    if (!deletedCompany) {
      throw new NotFoundException('Empresa não encontrada para exclusão');
    }
    return deletedCompany;
  }
}
