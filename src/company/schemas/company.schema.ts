import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Company extends Document {
  @Prop({ required: true })
  nome: string;

  @Prop()
  endereco?: string;

  @Prop()
  telefone?: string;

  @Prop({ default: true })
  ativo: boolean;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
