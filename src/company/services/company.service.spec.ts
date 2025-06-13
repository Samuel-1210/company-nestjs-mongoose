import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { getModelToken } from '@nestjs/mongoose';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Company } from '../schemas/company.schema';

const mockCompany = {
    _id: '1',
    nome: 'Empresa Teste',
    cnpj: '12345678900001',
    ativo: true,
};

describe('CompanyService', () => {
    let service: CompanyService;
    let model: Model<Company>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CompanyService,
                {
                    provide: getModelToken('Company'),
                    useValue: {
                        findOne: jest.fn().mockReturnThis(),
                        create: jest.fn().mockResolvedValue(mockCompany),
                        find: jest.fn().mockReturnThis(),
                        findById: jest.fn().mockReturnThis(),
                        findByIdAndUpdate: jest.fn().mockReturnThis(),
                        findByIdAndDelete: jest.fn().mockReturnThis(),
                        exec: jest.fn(),
                        save: jest.fn(),
                        constructor: jest.fn().mockImplementation(() => ({
                            save: jest.fn().mockResolvedValue(mockCompany),
                        })),
                    },
                },
            ],
        }).compile();

        service = module.get<CompanyService>(CompanyService);
        model = module.get<Model<Company>>(getModelToken('Company'));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('1 - deve cadastrar uma nova empresa', async () => {
            jest.spyOn(model, 'findOne').mockReturnValue({
                exec: jest.fn().mockResolvedValue(null),
            } as any);

            const result = await service.create(mockCompany);
            expect(result).toEqual(mockCompany);
            expect(model.findOne).toHaveBeenCalledWith({ cnpj: mockCompany.cnpj });
        });

        it('2 - não deve cadastrar empresa com CNPJ duplicado', async () => {
            jest.spyOn(model, 'findOne').mockReturnValue({
                exec: jest.fn().mockResolvedValue(mockCompany),
            } as any);

            await expect(service.create(mockCompany)).rejects.toThrow(
                ConflictException,
            );
        });
    });

    describe('findAll', () => {
        it('3 - deve listar todas as empresas', async () => {
            jest.spyOn(model, 'find').mockReturnValue({
                exec: jest.fn().mockResolvedValue([mockCompany]),
            } as any);

            const result = await service.findAll();
            expect(result).toEqual([mockCompany]);
            expect(model.find).toHaveBeenCalled();
        });
    });

    describe('update', () => {
        it('4 - deve atualizar uma empresa', async () => {
            const updated = { ...mockCompany, nome: 'Nova Razão Social' };
            jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
                exec: jest.fn().mockResolvedValue(updated),
            } as any);

            const result = await service.update('1', updated);
            expect(result).toEqual(updated);
            expect(model.findByIdAndUpdate).toHaveBeenCalledWith('1', updated, {
                new: true,
            });
        });
    });

    describe('findOne', () => {
        it('6 - deve buscar empresa por ID', async () => {
            jest.spyOn(model, 'findById').mockReturnValue({
                exec: jest.fn().mockResolvedValue(mockCompany),
            } as any);

            const result = await service.findOne('1');
            expect(result).toEqual(mockCompany);
            expect(model.findById).toHaveBeenCalledWith('1');
        });
    });

    describe('delete', () => {
        it('8 - deve deletar uma empresa', async () => {
            jest.spyOn(model, 'findByIdAndDelete').mockReturnValue({
                exec: jest.fn().mockResolvedValue(mockCompany),
            } as any);

            const result = await service.delete('1');
            expect(result).toEqual(mockCompany);
            expect(model.findByIdAndDelete).toHaveBeenCalledWith('1');
        });
    });
});
