import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { Registration } from './schemas/registration.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('registrations')
export class RegistrationsController {
    constructor(private readonly registrationsService: RegistrationsService) { }

    @Post()
    create(@Body() createRegistrationDto: CreateRegistrationDto): Promise<Registration> {
        return this.registrationsService.create(createRegistrationDto);
    }

    @Get()
    findAll(): Promise<Registration[]> {
        return this.registrationsService.findAll();
    }

    @Get('count')
    async count(): Promise<{ count: number }> {
        const count = await this.registrationsService.count();
        return { count };
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('my-registrations')
    async findMyRegistrations(@Request() req): Promise<Registration[]> {
        return this.registrationsService.findByUser(req.user.userId);
    }
}
