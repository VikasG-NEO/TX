import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrationsController } from './registrations.controller';
import { RegistrationsService } from './registrations.service';
import { Registration, RegistrationSchema } from './schemas/registration.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Registration.name, schema: RegistrationSchema }]),
    ],
    controllers: [RegistrationsController],
    providers: [RegistrationsService],
})
export class RegistrationsModule { }
