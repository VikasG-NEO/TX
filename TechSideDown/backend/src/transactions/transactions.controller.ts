import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) { }

    // @UseGuards(AuthGuard('jwt')) // Uncomment if needed
    @Get()
    async findAll() {
        return this.transactionsService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('my-transactions')
    async findMyTransactions(@Request() req) {
        return this.transactionsService.findByUser(req.user.userId);
    }
}
