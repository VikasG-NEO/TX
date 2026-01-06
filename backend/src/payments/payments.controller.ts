import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePaymentOrderDto, VerifyPaymentDto } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('create-order')
    async createOrder(@Request() req, @Body() createPaymentDto: CreatePaymentOrderDto) {
        return this.paymentsService.createOrder(req.user.userId, createPaymentDto.eventId, createPaymentDto.amount);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('verify')
    async verifyPayment(@Request() req, @Body() verifyPaymentDto: VerifyPaymentDto) {
        return this.paymentsService.verifyPayment(req.user.userId, verifyPaymentDto);
    }
}
