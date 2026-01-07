import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RegistrationDocument = Registration & Document;

@Schema({ timestamps: true })
export class Registration {
    @Prop({ required: true })
    eventId: string;

    @Prop({ required: true })
    eventName: string;

    @Prop({ required: true, enum: ['INDIVIDUAL', 'TEAM'] })
    type: string;

    @Prop()
    teamName: string; // Required if type is TEAM

    @Prop({ required: true })
    leaderName: string; // Used as 'name' for INDIVIDUAL

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: true })
    college: string;

    @Prop({ required: true })
    courseYear: string;

    @Prop({ required: false })
    department: string;

    @Prop({
        type: [{
            name: String,
            email: String,
            phone: String,
            college: String,
            department: String,
            courseYear: String
        }]
    })
    members: {
        name: string;
        email: string;
        phone?: string;
        college?: string;
        department?: string;
        courseYear?: string;
    }[];

    @Prop({ required: false })
    userId: string;

    @Prop({ required: true })
    transactionId: string;
}

export const RegistrationSchema = SchemaFactory.createForClass(Registration);
