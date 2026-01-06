import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ timestamps: true })
export class Transaction {
    @Prop({ type: Types.ObjectId, ref: 'User', required: false })
    userId: Types.ObjectId;

    @Prop({ required: true })
    type: string; // 'PAYMENT', 'EVENT', 'USER'

    @Prop({ required: true })
    action: string; // e.g., 'REGISTER_EVENT', 'PAYMENT_SUCCESS', 'USER_LOGIN'

    @Prop({ type: Object })
    metadata: Record<string, any>; // Flexible field for details

    @Prop({ default: 'SUCCESS' })
    status: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
