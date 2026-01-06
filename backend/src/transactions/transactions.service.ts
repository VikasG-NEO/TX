import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
    ) { }

    async create(userId: string | null, type: string, action: string, metadata: any = {}, status: string = 'SUCCESS') {
        const newTransaction = new this.transactionModel({
            userId,
            type,
            action,
            metadata,
            status,
        });
        return newTransaction.save();
    }

    async findAll() {
        return this.transactionModel.find().populate('userId', 'username email').exec();
    }

    async findByUser(userId: string) {
        return this.transactionModel.find({ userId }).exec();
    }
}
