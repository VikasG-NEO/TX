import { IsString, IsEmail, IsEnum, IsOptional, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

class TeamMemberDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    college?: string;

    @IsString()
    @IsOptional()
    department?: string;

    @IsString()
    @IsOptional()
    courseYear?: string;
}

export class CreateRegistrationDto {
    @IsString()
    eventId: string;

    @IsString()
    eventName: string;

    @IsEnum(['INDIVIDUAL', 'TEAM'])
    type: 'INDIVIDUAL' | 'TEAM';

    @IsString()
    @IsOptional()
    teamName?: string;

    @IsString()
    leaderName: string;

    @IsEmail()
    email: string;

    @IsString()
    phone: string;

    @IsString()
    college: string;

    @IsString()
    @IsOptional()
    department?: string;

    @IsString()
    courseYear: string;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => TeamMemberDto)
    members?: TeamMemberDto[];

    @IsString()
    @IsOptional()
    userId?: string;

    @IsString()
    @IsNotEmpty()
    transactionId: string;
}
