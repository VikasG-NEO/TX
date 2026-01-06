import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    category: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    duration: string;

    @Prop({ required: true })
    difficulty: string;

    @Prop()
    fee: number;

    @Prop()
    icon: string;

    @Prop()
    date: Date;

    @Prop()
    location: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
