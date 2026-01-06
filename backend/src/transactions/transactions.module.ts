import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsService } from './transactions.service';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';
import { TransactionsController } from './transactions.controller';

@Global() // Make it global so we can audit from anywhere without importing module everywhere
@Module({
    imports: [MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }])],
    controllers: [TransactionsController],
    providers: [TransactionsService],
    exports: [TransactionsService],
})
export class TransactionsModule { }
