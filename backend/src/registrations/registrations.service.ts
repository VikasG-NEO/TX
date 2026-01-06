import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Registration, RegistrationDocument } from './schemas/registration.schema';
import { CreateRegistrationDto } from './dto/create-registration.dto';

@Injectable()
export class RegistrationsService {
    constructor(
        @InjectModel(Registration.name)
        private registrationModel: Model<RegistrationDocument>,
    ) { }

    async create(createRegistrationDto: CreateRegistrationDto): Promise<Registration> {
        if (createRegistrationDto.type === 'TEAM') {
            if (!createRegistrationDto.teamName) {
                throw new BadRequestException('Team name is required for team registration');
            }
            if (!createRegistrationDto.members || createRegistrationDto.members.length === 0) {
                throw new BadRequestException('At least one team member is required for team registration');
            }
        }
        const createdRegistration = new this.registrationModel(createRegistrationDto);
        return createdRegistration.save();
    }

    async findAll(): Promise<Registration[]> {
        return this.registrationModel.find().exec();
    }

    async count(): Promise<number> {
        return this.registrationModel.countDocuments().exec();
    }

    async findByUser(userId: string): Promise<Registration[]> {
        return this.registrationModel.find({ userId }).exec();
    }
}
