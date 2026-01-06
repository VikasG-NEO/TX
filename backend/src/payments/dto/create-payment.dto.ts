import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentOrderDto {
    @IsNotEmpty()
    eventId: string;

    @IsNotEmpty()
    amount: number; // In smallest currency unit (paise for INR)
}

export class VerifyPaymentDto {
    @IsString()
    @IsNotEmpty()
    razorpayOrderId: string;

    @IsString()
    @IsNotEmpty()
    razorpayPaymentId: string;

    @IsString()
    @IsNotEmpty()
    razorpaySignature: string;

    @IsNotEmpty()
    eventId: string;
}
